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

try {
  new Function(code)();
  await new Promise(r => setTimeout(r, 400));
  const main = document.querySelector('#main');
  const title = document.querySelector('#title').textContent;
  const rendered = main.innerHTML.length;
  console.log('脚本执行: 无异常');
  console.log('fetch 调用:', fetched.slice(0, 2));
  console.log('主区渲染长度:', rendered, rendered > 2000 ? '(整页已渲染)' : '(偏短，可能没渲染成功)');
  console.log('标题:', title);
  console.log('题目数:', (bank.sections || []).reduce((n, s) =>
    n + (s.items || []).length + (s.variants || []).reduce((m, v) => m + v.items.length, 0), 0));
  if (rendered < 2000) process.exit(2);
} catch (e) {
  console.log('顶层异常:', e.constructor.name, '-', e.message);
  process.exit(1);
}
