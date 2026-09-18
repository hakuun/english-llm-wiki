---
name: english-daily
description: 用户英语学习（A2→B2，每天约 30 分钟）的每日闭环。凡是学习相关消息——"今天学什么""我完成了""复习""批改"——都必须先读 /root/english-llm-wiki 里的规则与当前状态，再回答。绝不用自己的记忆或常识代替仓库里的证据。
version: 1.1.0
author: hermes
license: MIT
platforms: [linux, macos, windows]
---

# english-daily

> 这份文件是 VPS 上 `/root/.hermes/skills/english/english-daily/SKILL.md` 的仓库副本，
> 版本化保存在这里，VPS 重建时可从这里恢复。

## 唯一事实来源

仓库：`/root/english-llm-wiki`（每次先 `git pull --quiet`）

| 要什么 | 读哪里 |
|---|---|
| 工作流规则（语言政策、材料策略、审核节奏、短命令） | `CLAUDE.md` |
| 下一次每日任务的控制面板 | `wiki/active-learning.md` |
| 学习者当前水平 | `wiki/profile/current-level.md` |
| 弱点与优先级 | `wiki/profile/weak-points.md` |
| 反复出现的个人错误 | `wiki/profile/error-patterns.md` |
| 词汇表与状态 | `wiki/vocabulary/vocabulary-review.md` |
| B1 词管线 | `wiki/vocabulary/b1-word-pipeline.md` |
| 某个词的 CEFR 等级 | `wiki/vocabulary/oxford-3000-by-cefr.tsv` |
| 最近完成情况 | `wiki/log.md` 顶部、`wiki/study-plans/daily/` 最新几页 |
| 每日页格式 | `wiki/study-plans/daily/_template.md` |
| 可用材料 | `wiki/source-notes/index.md`、`raw/` |

## 每次收到消息

1. `cd /root/english-llm-wiki && git pull --quiet`
2. 至少读：`CLAUDE.md`、`wiki/active-learning.md`、最新一两个 `wiki/study-plans/daily/*.md`、`wiki/vocabulary/vocabulary-review.md`、`wiki/profile/weak-points.md`
3. 判断意图：要 **今天的计划** / 交 **作答要批改** / 别的

## 要计划时

- 目标日期：**请求里给了日期就用它**（如"为 2026-09-19 生成"），没给就用**今天**（VPS 时区已设为 Asia/Shanghai）
- 按 `_template.md` 生成 `wiki/study-plans/daily/<日期>.md`：30 分钟、复习优先、guided output
- 只修 1-2 个重点错误；昨天错得多就只修错、不加新材料
- 输入按 `active-learning.md` 的轮换安排（阅读:听力 ≈ 2:1；听力走两天循环）
- 词汇：优先 B1 管线词，每天 3-5 个；加词前查 `oxford-3000-by-cefr.tsv`
- **必须同时产出题库** `app/bank/<日期>.json`（见下节），否则手机网页没有内容
- `git add -A wiki/ app/bank/ && git commit -q -m "daily: <日期> 计划" && git push`
- 若这次是"网页点了生成"触发的（提示里写明"不要给用户发消息"），**做完就结束，不要回复用户**
- 若是微信里问的：**不要贴整页 markdown**，给手机可读的紧凑版，并告诉用户"打开 App 做题"

## 题库格式（app/bank/YYYY-MM-DD.json）

```json
{
  "date": "YYYY-MM-DD", "title": "…", "subtitle": "…", "minutes": 30,
  "source_page": "wiki/study-plans/daily/YYYY-MM-DD.md",
  "audio": [{"label":"…","url":"https://…mp3","note":"…"}],
  "sections": [
    {"id":"warmup","title":"Warm-up","minutes":3,"intro":"…",
     "items":[
       {"id":"w1","type":"fill","prompt":"…","hint":"…",
        "accept":["答案1","答案2"],"sample":"参考句","why":"中文解释"},
       {"id":"w2","type":"choice","prompt":"…","options":["A","B"],
        "answer":0,"why":"…"},
       {"id":"w3","type":"write","prompt":"…","hint":"句型框","sample":"…","why":"…"},
       {"id":"w4","type":"check","prompt":"自评","options":["…"]},
       {"id":"w5","type":"listen","prompt":"…","audio":0},
       {"id":"w6","type":"read","prompt":"…","body":"…","note":"…"}
     ]},
    {"id":"output","title":"Small output","minutes":3,"choose_one":true,
     "variants":[{"id":"A","title":"Option A","hint":"…","items":[ … ]},
                 {"id":"B","title":"Option B","hint":"…","items":[ … ]}]}
  ]
}
```

规则：
- 每题的 `id` 全局唯一（用 段前缀 如 `w1` `l3` `v5` `a2` `b1`）
- `fill` 的 `accept` 用小写、不带句末标点；单词题写一个词，句子题给 2-4 种等价写法
- 单选 `choice` 的 `answer` 是正确项下标；不判分的题（如"今天难度"）用 `-1`
- 所有题都必须带 `why`（中文解释），`fill`/`write` 尽量带 `sample`
- 内容严格来自当天的每日页，不要另加练习

## 收到作答时

- 作答文件：`submissions/<日期>.json`（含每题答案、客观题对错、自评勾选、难度）
- 逐题批改，用中文解释，只讲最重要的错误
- 更新：daily 页第 9 节、`wiki/log.md`、`wiki/vocabulary/vocabulary-review.md`；只有重复或高价值的错误才进 `wiki/profile/error-patterns.md`
- **同时写批改结果给网页**：`app/feedback/<日期>.json`，格式：

```json
{
  "date": "YYYY-MM-DD",
  "summary": "一句话总评（中文，手机上一眼能读完）",
  "score": "客观题 12/14",
  "items": [
    {"id": "w1", "verdict": "ok",  "note": "三要素全在"},
    {"id": "l4", "verdict": "no",  "note": "be 动词漏了：A pebble beach is easier…"},
    {"id": "b2", "verdict": "mid", "note": "意思对，than 后面可以再补比较对象"}
  ],
  "tomorrow": "明天的重点（一句话）"
}
```

  `verdict` 只用 `ok` / `mid` / `no` 三种；`note` 用中文、一句话、说清错在哪怎么改。
- `git add -A wiki/ app/feedback/ && git commit -q -m "correct: <日期>" && git push`
- 回复里给出：今天几对几错、错在哪、明天的重点（手机可读）

## 硬约束

- **改过 `app/index.html` 或 `app/server.py` 后，必须跑 `node app/test/smoke.mjs`**（在仓库根目录）：它用假 DOM 执行一遍网页脚本，能抓到"脚本顶层报错导致页面一直显示正在加载"这类问题。测试不通过就不要 push。
- 解释、计划、批改用中文；例句、目标句、词汇用英文
- 不发明来源和 CEFR 等级；材料只从 `raw/` 与 `wiki/source-notes/` 里挑
- 不确定就明说不确定，不要编
- 微信只能在用户发过消息之后的会话窗口内回复：**不要设置定时推送**（窗口外发送必然失败）
