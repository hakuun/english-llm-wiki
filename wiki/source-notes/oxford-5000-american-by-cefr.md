# Oxford 5000 by CEFR Level (American English)

## Source

- Source file: `raw/inbox/American_Oxford_5000_by_CEFR_level.pdf`
- Reusable extracted file: `wiki/vocabulary/oxford-5000-american-by-cefr.tsv`
- Source type: A-level vocabulary reference / learner word list
- Approximate level: B2-C1

## Extracted TSV format

The TSV is the preferred working format for future processing, so the PDF does not need to be reprocessed each time.

Columns:

- `cefr` — B2 or C1
- `headword` — dictionary headword
- `part_of_speech` — source part-of-speech label, such as `n.`, `v.`, `adj.`, `adv.`
- `page` — source PDF page number
- `source` — source title

Extraction check:

- Method: PyMuPDF word-coordinate extraction, grouped by PDF text blocks and lines.
- Not used: `pdftotext`.
- Current row count: 1,704 entries = 623 B2 + 1,081 C1.
- Validation: no empty required fields and no duplicate `(cefr, headword, part_of_speech)` keys in the generated TSV.

## Usefulness

这份 PDF 是高级核心词表，不适合一次性背完。当前学习阶段应把它作为 B2 词汇路线图：优先识别 B2 高频词、词族、搭配和阅读中反复出现的词。

## Quality note

普通整页文本抽取会出现多栏粘连，不应直接导入为词表。已保存的 TSV 是后续处理入口；如果未来要重建它，应继续使用坐标/栏目抽取并做抽样校验。

## Recommended study action

1. 使用 `wiki/vocabulary/oxford-5000-american-by-cefr.tsv` 查询词汇等级。
2. 每次阅读或听力遇到 B2 词时，用 TSV 校准 CEFR 等级。
3. 每周只选 10-15 个 B2 词进入主动复习，必须带例句和搭配。
4. C1 词只做识别，不作为当前一年 B2 目标的主动背诵重点。

## Example B2 priority patterns

优先关注这些类型：

- 动词：`accomplish`, `adjust`, `distinguish`, `consult`, `devote`
- 形容词：`adequate`, `affordable`, `considerable`, `distinct`, `diverse`
- 名词：`accuracy`, `conservation`, `determination`, `disability`, `diversity`
- 副词：`accurately`, `additionally`, `consequently`, `considerably`

这些词更适合放入 `[[vocabulary/high-frequency-words]]`、`[[vocabulary/collocations]]` 和 `[[vocabulary/word-family-notes]]`，而不是孤立中文释义列表。
