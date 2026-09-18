// 批改结果校验：app/feedback/*.json 必须能被 app/index.html 的 loadFeedback() 正确消费。
// 用法: node app/test/feedback.mjs  （在仓库根目录跑）
import fs from 'fs';

let APP = decodeURIComponent(new URL('..', import.meta.url).pathname);
if (/^\/[A-Za-z]:/.test(APP)) APP = APP.slice(1);   // Windows: "/E:/…" -> "E:/…"

const html = fs.readFileSync(`${APP}/index.html`, 'utf8');
const files = fs.readdirSync(`${APP}/feedback`).filter(f => f.endsWith('.json')).sort();
if (!files.length) { console.log('没有批改文件可测'); process.exit(0); }

let bad = 0;
const ok = (c, m) => { console.log((c ? 'PASS  ' : 'FAIL  ') + m); if (!c) bad++; };

// 复刻 index.html 的判分规则：gradeFill 只对「单词填空」返回 true/false，
// 句子填空与自由写一律返回 null（页面显示「对照参考」，不计分）。
const gradable = it =>
  it.type === 'choice' ? Number.isInteger(it.answer) && it.answer >= 0
: it.type === 'fill'   ? (it.accept || []).length > 0 && it.accept.every(a => !a.includes(' '))
: false;

for (const f of files) {
  const date = f.replace(/\.json$/, '');
  console.log(`\n=== ${f} ===`);
  const fb = JSON.parse(fs.readFileSync(`${APP}/feedback/${f}`, 'utf8'));

  const keys = Object.keys(fb).sort().join(',');
  ok(keys === 'date,items,score,summary,tomorrow', `字段契约正确 (${keys})`);
  ok(fb.date === date, `date 与文件名一致 (${fb.date})`);
  ok(typeof fb.summary === 'string' && fb.summary.length > 20, 'summary 是有内容的字符串');
  ok(!!fb.tomorrow, 'tomorrow 非空');
  ok((fb.items || []).every(i => ['ok', 'mid', 'no'].includes(i.verdict)), 'verdict 只用 ok/mid/no');
  ok((fb.items || []).every(i => i.id && (i.note || '').trim()), '每题都有 id + 非空 note');

  const long = (fb.items || []).filter(i => (i.note || '').length > 160).map(i => i.id);
  ok(!long.length, `note 均为手机可读的一句话 (超长: ${long.join(',') || '无'})`);

  const bankPath = `${APP}/bank/${date}.json`;
  if (!fs.existsSync(bankPath)) { console.log(`SKIP  ${date} 无题库，跳过 id 校验`); continue; }
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = bank.sections.flatMap(s => [...(s.items || []), ...(s.variants || []).flatMap(v => v.items || [])]);
  const bankIds = new Set(pool.map(i => i.id));
  const ids = (fb.items || []).map(i => i.id);

  ok(new Set(ids).size === ids.length, 'feedback id 无重复');
  ok(ids.every(i => bankIds.has(i)), `所有 id 都能在题库里找到 (孤儿: ${ids.filter(i => !bankIds.has(i)).join(',') || '无'})`);

  // 每道被判分的题都必须有 verdict —— App 的 8/11 就是这些题
  const auto = pool.filter(gradable).map(i => i.id);
  ok(auto.every(i => ids.includes(i)), `所有自动判分题都有 verdict (缺: ${auto.filter(i => !ids.includes(i)).join(',') || '无'})`);

  // 交了答案的题（含开放反馈）都必须有 verdict，不能漏批
  const subPath = `${APP}/../submissions/${date}.json`;
  if (fs.existsSync(subPath)) {
    const ans = JSON.parse(fs.readFileSync(subPath, 'utf8')).answers || {};
    const missing = Object.entries(ans).filter(([q, a]) => String(a).trim() && !ids.includes(q)).map(([q]) => q);
    ok(!missing.length, `所有作答过的题都批了 (漏: ${missing.join(',') || '无'})`);
  }

  // score 的分子/分母必须与 App 实际判分集合一致，不能出现 11/15 这类错数
  const m = /(\d+)\s*\/\s*(\d+)/.exec(fb.score || '');
  ok(!!m, `score 形如 x/y (${fb.score})`);
  if (m) {
    const sPath = `${APP}/../submissions/${date}.json`;
    if (fs.existsSync(sPath)) {
      const res = JSON.parse(fs.readFileSync(sPath, 'utf8')).results || {};
      const graded = Object.entries(res).filter(([, v]) => typeof v === 'boolean');
      const correct = graded.filter(([, v]) => v).length;
      ok(Number(m[1]) === correct, `score 分子 == 实际答对数 (${correct})`);
      ok(Number(m[2]) === graded.length, `score 分母 == App 判分题数 (${graded.length})`);
    }
  }

  // index.html 真的读这些字段吗
  ok(html.includes('feedback/${bank.date}.json'), 'index.html 的 fetch 路径匹配');
  for (const fld of ['f.summary', 'f.score', 'f.items', 'f.tomorrow', 'it.verdict', 'it.note'])
    ok(html.includes(fld), `index.html 读取 ${fld}`);
}

console.log(`\n${bad ? `${bad} 项失败` : '全部通过'}`);
process.exit(bad ? 1 : 0);
