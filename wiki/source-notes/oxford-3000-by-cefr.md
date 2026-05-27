# Oxford 3000 by CEFR Level

## Source

- Source file: `raw/inbox/The_Oxford_3000_by_CEFR_level.pdf`
- Reusable extracted file: `wiki/vocabulary/oxford-3000-by-cefr.tsv`
- Source type: A-level vocabulary reference / learner word list
- Approximate level: A1-B2

## Extracted TSV format

The TSV is the preferred working format for future processing, so the PDF does not need to be reprocessed each time.

Columns:

- `cefr` — A1, A2, B1, or B2
- `headword` — dictionary headword
- `part_of_speech` — source part-of-speech label, such as `n.`, `v.`, `adj.`, `adv.`
- `page` — source PDF page number
- `source` — source title

Extraction check:

- Method: PyMuPDF word-coordinate/text-block extraction.
- Not used: `pdftotext`.
- Current row count: 3,102 entries = 844 A1 + 866 A2 + 805 B1 + 587 B2.
- Validation: duplicate `(cefr, headword, part_of_speech)` rows were removed while preserving first occurrence.

## Usefulness

这份 PDF 是当前阶段最重要的词汇校准表：它覆盖 A1 到 B2，比 Oxford 5000 更适合判断“现在该不该主动学这个词”。

## How to use it

1. A1-A2 词：优先保证会认、会拼常用形式、会放进简单句。
2. B1 词：作为接下来 3-6 个月的主动扩展重点，必须结合阅读或听力上下文。
3. B2 词：遇到时记录词族和搭配；不要孤立背长表。
4. 每周主动复习 10-15 个词或 chunks，优先来自当天真实材料。

## Recommended study action

- 用 `wiki/vocabulary/oxford-3000-by-cefr.tsv` 给阅读中遇到的词标注等级。
- 当前阶段不要从 TSV 顺序背词；从短阅读材料中反复遇到的词开始。
- 与 `[[source-notes/oxford-5000-american-by-cefr]]` 配合：Oxford 3000 负责 A1-B2 基础，Oxford 5000 负责 B2-C1 扩展。
