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


def grade_async(date: str, path: pathlib.Path) -> None:
    """Let the Hermes agent grade this submission and update the wiki."""
    prompt = (
        f"学习者刚提交了 {date} 的作答，文件在 {path}（仓库 {REPO} 内）。"
        f"请按 english-daily 技能：读该文件与 {REPO}/wiki/study-plans/daily/{date}.md，"
        "逐题批改（中文解释，只讲最重要的错误），更新每日页第 9 节、wiki/log.md、"
        "wiki/vocabulary/vocabulary-review.md，必要时更新 wiki/profile/error-patterns.md 与 weak-points.md，"
        f"然后 git add -A wiki/ && git commit 并 push。"
        "最后用手机可读的短格式总结：今天几对几错、错在哪、明天的重点。"
    )
    try:
        subprocess.Popen(
            ["/usr/local/bin/hermes", "chat", "-q", prompt],
            stdout=LOG.open("a", encoding="utf-8"), stderr=subprocess.STDOUT,
            stdin=subprocess.DEVNULL, start_new_session=True, cwd=str(REPO),
        )
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
        if self.path.rstrip("/") != "/submit":
            return self._send(404, b'{"ok":false,"error":"unknown path"}')
        if self.headers.get("X-Wiki-Token", "") != token():
            return self._send(403, b'{"ok":false,"error":"bad token"}')
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
