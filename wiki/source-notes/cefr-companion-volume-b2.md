# CEFR Companion Volume — B2 Descriptors

## Source

- Source file: `raw/inbox/CEFR Companion Volume_eng.pdf`
- Source type: A-level standard / authoritative reference
- Title: Common European Framework of Reference for Languages: Learning, Teaching, Assessment — Companion Volume (2020)
- Publisher: Council of Europe
- Approximate level: A1-C2 reference

## Why it is useful

这是 CEFR 的官方权威文件。对本项目最关键的价值是：

1. **B2 全球总表**（p. 175）——一句总结 B2 是什么。
2. **B2 突出特征**（pp. 173-174）——B2 相比 B1 的三大突破：有效论证、社交话语、语言意识。
3. **自评量表 B2 行**（pp. 177-179）——覆盖听力、阅读、口语产出、写作产出、口语交互、在线交互。
4. **Chapter 3 详细描述语量表**——每个技能维度更细粒度的 B2 描述。

## Key extracted content

以下内容已写入 `[[standards/cefr-b2-target]]` 和 `[[assessments/b2-can-do-checklist]]`：

| 内容 | 来源页码 | 用途 |
|------|---------|------|
| B2 Global Scale | p. 175 | 定义总体 B2 目标 |
| B2 Salient Features | pp. 173-174 | 理解 B2 的三大突破和核心心态 |
| Self-Assessment Grid B2 rows | pp. 177-179 | 月评估逐项检查 |
| Detailed listening descriptors | p. 52-53 | 听力目标的具体化 |
| Detailed reading descriptors | pp. 54, 57 | 阅读目标的具体化 |
| Detailed writing descriptors | pp. 68-70 | 写作目标的具体化 |

## Processing notes

- Method: PyMuPDF (fitz) 直接读取指定页面，不是 pdftotext 批量转换。
- PDF 共 278 页，无嵌入目录。通过打印版目录（pp. 6-9）定位 B2 相关内容。
- 提取范围：仅 B2 描述语，A1-B1 和 C1-C2 级描述语作为上下文参考但未全部提取。
- 所有引用页面号均为 PDF 印刷页码（非 PDF index）。

## Recommended study action

- 不作为日常学习材料。
- 每月评估时打开 `[[standards/cefr-b2-target]]` 和 `[[assessments/b2-can-do-checklist]]` 对照证据。
- 当学习方向不确定时，回到 Global Scale 的三句话验证。
- PDF 本身保存在 `raw/inbox/`，遵循 raw/ 只读原则。
