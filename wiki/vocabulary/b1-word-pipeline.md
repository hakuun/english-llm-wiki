---
tags:
  - english
  - vocabulary
  - b1
  - pipeline
---

# B1 Word Pipeline

本页定义了从 Oxford 3000 B1 词库中系统化提取词汇进入主动学习的管线。

## 为什么需要 B1 管线

Oxford 3000 中包含 **805 个 B1 词汇**。它们是 A2 到 B2 的关键桥梁——没有足够的 B1 词汇，阅读和听力会在 B1 水平卡住，写作会停留在 A2 句式。

当前主动词汇表只有 16 个词，其中 B1 词仅 4 个（weigh, dirt, security, stuck*）。按当前速度（~2 周新增 5-8 个 B1 词），一年只能覆盖 ~200 个 B1 词——远不够 B2 所需的词汇量。

## 管线规则

1. **只在真实语境中遇到后才添加**。不从 TSV 顺序背词——必须来自阅读或听力的实际接触。
2. **遇到后查 CEFR 等级**：在 `wiki/vocabulary/oxford-3000-by-cefr.tsv` 中查询。
3. **B1 词优先进入 active**。A1-A2 词若已掌握（level 3+）快速确认即可；B1 词一律进入 active review。
4. **每周新增 10-15 个 B1 词**进入 active vocabulary table。每日 3-5 个新 B1 词。
5. **每个 B1 词必须带**：短语/搭配、一个来自真实语境的例句、CEFR 等级。
6. **每周检查**：哪些 B1 词从 `weak` → `active` → `review`，哪些需要额外练习。

## B1 候选词（预选高频词）

以下 20 个 B1 词是从 Oxford 3000 B1 列表中预选的高频/高实用词，等待在阅读或听力中遇到后激活：

| # | headword | pos | 中文 | 可能出现的语境 |
|---|----------|-----|------|-------------|
| 1 | experience | n. | 经验，经历 | 工作、旅行、学习话题 |
| 2 | opinion | n. | 观点，意见 | 讨论、写作论证 |
| 3 | expect | v. | 期望，预计 | 日常对话、计划描述 |
| 4 | offer | v., n. | 提供，提议 | 工作、服务、帮助 |
| 5 | avoid | v. | 避免 | 建议、规则、健康话题 |
| 6 | communicate | v. | 交流 | 工作、人际关系 |
| 7 | deal with | phr. | 处理，应对 | 问题解决、工作场景 |
| 8 | environment | n. | 环境 | 自然、城市、工作 |
| 9 | explain | v. | 解释 | 任何需要说明的场景 |
| 10 | familiar | adj. | 熟悉的 | 描述知识/经验水平 |
| 11 | imagine | v. | 想象 | 假设、创意话题 |
| 12 | manage | v. | 管理，设法做到 | 工作、时间管理 |
| 13 | necessary | adj. | 必要的 | 规则、要求、建议 |
| 14 | opportunity | n. | 机会 | 工作、学习、生活选择 |
| 15 | organize | v. | 组织 | 活动、工作、时间 |
| 16 | prepare | v. | 准备 | 日常、工作、考试 |
| 17 | realize | v. | 意识到 | 故事叙述、反思 |
| 18 | recommend | v. | 推荐 | 建议、评价 |
| 19 | suggest | v. | 建议 | 讨论、写作 |
| 20 | support | v., n. | 支持 | 观点论证、帮助 |

**这些词目前的状态**：全部为"等待语境触发"。当学习者在阅读或听力中遇到它们时，立即从本表勾选，加入 `[[vocabulary/vocabulary-review]]` 的 active 表。

## BBC 听力中已识别的 B1 词

以下是从已摄入的 BBC 转录稿词汇表中识别到的 B1 词（对照 Oxford 3000 TSV）：

| B1 word | 来源 | BBC 例句 |
|---------|------|---------|
| strain | 6 Min: Living with debt | "emotional stress caused by a lack of money" → financial strain |
| financial | 6 Min: Living with debt | "financial strain" — B1 形容词 |
| argue | 6 Min: Animals (implicit via argument) | B1 动词，在 "arguments and discussions" 语境中 |
| confuse | 6 Min: Animals | "Is it somehow visually confusing?" — B1 动词 |
| effective | 6 Min: Animals | "every pattern was really effective" — B1 形容词 |

## 本周 B1 目标（2026-06-05 ~ 2026-06-11）

从候选词中预选 3-5 个最容易在近期材料中触发的 B1 词：

1. **experience** — 几乎必然出现在工作/旅行/学习话题中
2. **explain** — 每日对话高频词
3. **familiar** — 在描述"是否了解某话题"时高频出现
4. **realize** — 在故事叙述和反思中反复出现

## 管线工作流

```text
阅读/听力中遇到新词
    ↓
查 Oxford 3000 TSV 确认 CEFR 等级
    ↓
如果是 B1 → 加入 [[vocabulary/vocabulary-review]] active 表
    ↓
标记 cefr: B1, level: 1, status: active
    ↓
在 daily page 中练习 1-2 次
    ↓
根据学习者的 hard/okay/easy 反馈升级 level/status
```

## CEFR 等级标注说明

- A1, A2, B1, B2: 来自 Oxford 3000 by CEFR level (A-level source)
- `B1*`: 词根在 Oxford 3000 中，但该词形不在（如 `stuck` 来自 `stick` B2）
- `B1/−`: 复合词不在 TSV 中，但核心词在 B1（如 `hand-luggage` 中 `hand` 是 B1，`luggage` 不在表中）
- `A1/A2`: 短语中不同组成部分有不同等级

## 关联页面

- [[vocabulary/vocabulary-review]] — 主动词汇追踪表
- [[vocabulary/index]] — 词汇系统总览
- [[source-notes/oxford-3000-by-cefr]] — Oxford 3000 词表 source note
- [[standards/cefr-b2-target]] — B2 词汇目标
