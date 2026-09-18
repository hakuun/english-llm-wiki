#!/usr/bin/env python3
"""Serves the daily-study web app and accepts submissions.

- GET  /            -> app/index.html (with the submit token injected at serve time)
- GET  /bank/*.json -> question banks
- POST /submit      -> writes submissions/<date>.json into the wiki repo,
                       commits + pushes it, then triggers the grader agent.

Run:  python3 server.py [--port 80] [--root /root/english-llm-wiki/app]

The submit token is generated on first run into ~/.wiki-app-token (0600) and is
never written into the repo (which is public).
"""

import argparse
import json
import pathlib
import secrets
import subprocess
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

REPO = pathlib.Path("/root/english-llm-wiki")
TOKEN_FILE = pathlib.Path.home() / ".wiki-app-token"
LOG = pathlib.Path("/root/submissions.log")


def token() -> str:
    if not TOKEN_FILE.exists():
        TOKEN_FILE.write_text(secrets.token_hex(16), encoding="utf-8")
        TOKEN_FILE.chmod(0o600)
    return TOKEN_FILE.read_text(encoding="utf-8").strip()


def git(*args: str) -> str:
    r = subprocess.run(["git", "-C", str(REPO), *args], capture_output=True, text=True, timeout=120)
    return (r.stdout + r.stderr).strip()


def log(msg: str) -> None:
    with LOG.open("a", encoding="utf-8") as f:
        f.write(msg.rstrip() + "\n")


GENERATE_LOG = pathlib.Path("/root/generate.log")
INFLIGHT: set = set()
LOCK = threading.Lock()


def spawn_agent(prompt: str, logfile: pathlib.Path, on_done=None) -> None:
    """Run one Hermes agent turn detached; optionally run a callback when it exits."""
    fh = logfile.open("a", encoding="utf-8")
    proc = subprocess.Popen(
        ["/usr/local/bin/hermes", "chat", "-q", prompt],
        stdout=fh, stderr=subprocess.STDOUT, stdin=subprocess.DEVNULL,
        start_new_session=True, cwd=str(REPO),
    )
    def _wait():
        proc.wait()
        fh.close()
        if on_done:
            on_done()
    threading.Thread(target=_wait, daemon=True).start()


def generate_async(date: str) -> dict:
    """Ask the agent to produce that date's daily page + question bank."""
    with LOCK:
        if date in INFLIGHT:
            return {"ok": True, "already": True}
        INFLIGHT.add(date)
    prompt = (
        f"请为 {date} 生成英语学习计划。按 english-daily 技能："
        f"先 cd {REPO} && git pull，然后读 CLAUDE.md、wiki/active-learning.md、"
        "最近的 wiki/study-plans/daily/ 页面与 submissions/、wiki/vocabulary/vocabulary-review.md、"
        "wiki/profile/weak-points.md 与 error-patterns.md，再按 wiki/study-plans/daily/_template.md 产出"
        f"wiki/study-plans/daily/{date}.md，并**同时产出题库 app/bank/{date}.json**（格式见技能）。"
        f"最后 git add -A wiki/ app/bank/ && git commit -m 'daily: {date} 计划' && git push。"
        "不要给用户发消息，做完即可。"
    )
    try:
        spawn_agent(prompt, GENERATE_LOG, on_done=lambda: INFLIGHT.discard(date))
    except Exception as exc:
        INFLIGHT.discard(date)
        log(f"[{date}] failed to start generation: {exc}")
        return {"ok": False, "error": f"failed to start: {exc}"}
    log(f"[{date}] generation started")
    return {"ok": True, "started": True}


def grade_async(date: str, path: pathlib.Path) -> None:
    """Let the Hermes agent grade this submission and update the wiki."""
    prompt = (
        f"学习者刚提交了 {date} 的作答，文件在 {path}（仓库 {REPO} 内）。"
        f"请按 english-daily 技能：读该文件与 {REPO}/wiki/study-plans/daily/{date}.md，"
        "逐题批改（中文解释，只讲最重要的错误），更新每日页第 9 节、wiki/log.md、"
        "wiki/vocabulary/vocabulary-review.md，必要时更新 wiki/profile/error-patterns.md 与 weak-points.md，"
        "并写 app/feedback/<日期>.json（batch 结果给手机网页看），"
        f"然后 git add -A wiki/ app/feedback/ && git commit 并 push。"
        "最后用手机可读的短格式总结：今天几对几错、错在哪、明天的重点。"
    )
    try:
        spawn_agent(prompt, LOG)
    except Exception as exc:  # pragma: no cover
        log(f"[{date}] failed to start grader: {exc}")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, directory=None, **kw):
        super().__init__(*a, directory=directory or ROOT, **kw)

    def log_message(self, fmt, *args):
        log("%s - %s" % (self.address_string(), fmt % args))

    def _send(self, code: int, body: bytes, ctype: str = "application/json; charset=utf-8"):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.rstrip("/").endswith("bank/index.json"):
            dates = sorted((p.stem for p in (pathlib.Path(ROOT) / "bank").glob("*.json")), reverse=True)
            return self._send(200, json.dumps({"dates": dates}).encode("utf-8"))
        if self.path in ("/", "/index.html"):
            html = (pathlib.Path(ROOT) / "index.html").read_text(encoding="utf-8")
            html = html.replace(
                "</head>", f'<script>window.__TOKEN__={json.dumps(token())};</script>\n</head>', 1)
            return self._send(200, html.encode("utf-8"), "text/html; charset=utf-8")
        return super().do_GET()

    def do_POST(self):
        path = self.path.rstrip("/")
        if path not in ("/submit", "/generate"):
            return self._send(404, b'{"ok":false,"error":"unknown path"}')
        if self.headers.get("X-Wiki-Token", "") != token():
            return self._send(403, b'{"ok":false,"error":"bad token"}')
        if path == "/generate":
            try:
                n = int(self.headers.get("Content-Length") or 0)
                payload = json.loads(self.rfile.read(n) or b"{}")
                date = str(payload.get("date") or "").strip()
                if len(date) != 10:
                    raise ValueError("bad date")
            except Exception as exc:
                return self._send(400, json.dumps({"ok": False, "error": str(exc)}).encode())
            res = generate_async(date)
            return self._send(200 if res.get("ok") else 500, json.dumps(res).encode())
        try:
            n = int(self.headers.get("Content-Length") or 0)
            payload = json.loads(self.rfile.read(n) or b"{}")
            date = str(payload.get("date") or "").strip()
            if len(date) != 10:
                raise ValueError("bad date")
            out_dir = REPO / "submissions"
            out_dir.mkdir(exist_ok=True)
            path = out_dir / f"{date}.json"
            payload["receivedAt"] = subprocess.run(
                ["date", "-u", "+%Y-%m-%dT%H:%M:%SZ"], capture_output=True, text=True).stdout.strip()
            path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
            log(f"[{date}] submission saved ({len(json.dumps(payload))} bytes)")
        except Exception as exc:
            return self._send(400, json.dumps({"ok": False, "error": str(exc)}).encode())

        def push():
            git("add", "-A", "submissions/")
            out = git("commit", "-q", "-m", f"submissions: {date} 作答")
            log(f"[{date}] git: {out or 'nothing to commit'}")
            log(f"[{date}] push: {git('push') or 'ok'}")
        threading.Thread(target=push, daemon=True).start()
        threading.Thread(target=grade_async, args=(date, path), daemon=True).start()
        return self._send(200, b'{"ok":true}')


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=80)
    ap.add_argument("--root", default="/root/english-llm-wiki/app")
    args = ap.parse_args()
    ROOT = args.root
    srv = ThreadingHTTPServer(("0.0.0.0", args.port), Handler)
    print(f"serving {ROOT} on :{args.port}", flush=True)
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        sys.exit(0)
