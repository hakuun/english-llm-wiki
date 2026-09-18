// 冒烟测试：用假 DOM 跑一遍 app/index.html 里的内联脚本，捕获顶层异常。
// 用法: node app/test/smoke.mjs  （在仓库根目录跑）
import fs from 'fs';

let APP = decodeURIComponent(new URL('..', import.meta.url).pathname);
if (/^\/[A-Za-z]:/.test(APP)) APP = APP.slice(1);   // Windows: "/E:/…" -> "E:/…"
const html = fs.readFileSync(`${APP}/index.html`, 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const banks = fs.readdirSync(`${APP}/bank`).filter(f => f.endsWith('.json')).sort();
if (!banks.length) { console.log('没有题库可测'); process.exit(0); }
const bank = JSON.parse(fs.readFileSync(`${APP}/bank/${banks[banks.length - 1]}`, 'utf8'));
console.log('测试题库:', banks[banks.length - 1]);

function makeEl(id) {
  const o = {
    id, value: '', textContent: '', disabled: false, dataset: {},
    style: {}, onclick: null, oninput: null, onblur: null, onchange: null,
    classList: { toggle() {}, add() {}, remove() {}, contains: () => false },
    appendChild(c) { o._html = (o._html || '') + ((c && c._html) || ''); return c; },
    insertAdjacentHTML(_pos, h) { o._html = (o._html || '') + h; }, remove() {},
    querySelector: sel => { if (!o._kids) o._kids = new Map();
      if (!o._kids.has(sel)) o._kids.set(sel, makeEl(sel)); return o._kids.get(sel); },
    querySelectorAll: () => [],
  };
  Object.defineProperty(o, 'innerHTML', {
    get: () => o._html || '', set: v => { o._html = String(v); },
  });
  return o;
}

const els = new Map();
globalThis.window = globalThis;
globalThis.document = {
  title: '',
  querySelector(sel) { if (!els.has(sel)) els.set(sel, makeEl(sel)); return els.get(sel); },
  createElement(tag) { return makeEl(tag); },
};
const store = new Map();
globalThis.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, v),
  removeItem: k => store.delete(k),
};
globalThis.alert = () => {};
globalThis.confirm = () => true;
Object.defineProperty(globalThis, 'navigator', {
  value: { clipboard: { writeText: async () => {} } }, configurable: true,
});
const fetched = [];
globalThis.fetch = async url => {
  fetched.push(String(url));
  if (String(url).startsWith('bank/')) return { ok: true, json: async () => bank };
  return { ok: false, status: 404, json: async () => ({}) };
};

const questions = (bank.sections || []).reduce((n, s) =>
  n + (s.items || []).length + (s.variants || []).reduce((m, v) => m + v.items.length, 0), 0);

async function runPass(label, storage) {
  store.clear();
  for (const [k, v] of Object.entries(storage || {})) store.set(k, v);
  fetched.length = 0;
  new Function(code)();
  await new Promise(r => setTimeout(r, 400));
  const main = document.querySelector('#main');
  const score = document.querySelector('#score').textContent;
  const btn = document.querySelector('#btnSubmit').textContent;
  const meta = document.querySelector('#meta').textContent;
  const len = main.innerHTML.length;
  console.log(`\n[${label}]`);
  console.log('  渲染长度:', len, len > 2000 ? '(整页已渲染)' : '(偏短!)');
  console.log('  底部状态:', JSON.stringify(score));
  console.log('  主按钮  :', JSON.stringify(btn));
  console.log('  顶部信息:', JSON.stringify(meta));
  return { len, score, btn, meta };
}

try {
  const fresh = await runPass('未提交', {});
  const done = await runPass('已提交、批改未回', {
    [`ew_${bank.date}`]: JSON.stringify({
      date: bank.date, submitted: true, submittedAt: new Date().toISOString(),
      answers: {}, results: {}, checks: {}, variant: null,
    }),
  });
  console.log('\n题目数:', questions);
  let bad = 0;
  if (fresh.len < 2000) { console.log('✗ 首次渲染太短'); bad = 1; }
  if (fresh.btn !== '提交') { console.log('✗ 未提交时主按钮应显示「提交」，实际', fresh.btn); bad = 1; }
  if (!done.score.includes('已提交')) { console.log('✗ 已提交时底部未显示「已提交」'); bad = 1; }
  if (done.btn !== '重新提交') { console.log('✗ 已提交时主按钮应显示「重新提交」，实际', done.btn); bad = 1; }
  if (!done.meta.includes('已提交')) { console.log('✗ 已提交时顶部未标记'); bad = 1; }
  console.log(bad ? '\n结果: 失败' : '\n结果: 全部通过');
  process.exit(bad ? 1 : 0);
} catch (e) {
  console.log('顶层异常:', e.constructor.name, '-', e.message);
  process.exit(1);
}
