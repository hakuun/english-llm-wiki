# English LLM Wiki Log

## [2026-05-25] vocabulary | Reusable Oxford 5000 TSV extraction

Converted `raw/inbox/American_Oxford_5000_by_CEFR_level.pdf` into `wiki/vocabulary/oxford-5000-american-by-cefr.tsv` using PyMuPDF coordinate-based extraction, not `pdftotext`. The TSV contains 1,704 validated entries: 623 B2 and 1,081 C1, with no empty required fields or duplicate `(cefr, headword, part_of_speech)` keys. Updated the Oxford source note and vocabulary index to use the TSV as the future processing entry point.

## [2026-05-25] ingest | Oxford vocabulary, grammar bundle, and email reading

Processed current `raw/` materials without modifying raw sources. Created source notes for the Oxford 5000 PDF, Oxford A1-B2 grammar files, and the A1-A2 email reading text. Updated vocabulary, grammar, reading, source-note, and main indexes.

PDF note: `raw/inbox/American_Oxford_5000_by_CEFR_level.pdf` was sampled with PyMuPDF and verified as multi-column text; direct whole-page extraction causes column merging, so the wiki records it as a calibrated reference rather than importing a full word list.

## [2026-05-25] sources | Authoritative materials map

Created `wiki/source-notes/authoritative-materials-map.md` to define how to find, judge, and use authoritative English learning materials for the one-year B2 goal.

## [2026-05-25] writing | Initial self-introduction diagnosis

Processed the learner's first English self-introduction. Updated corrected writing, current level, and personal error patterns.

## [2026-05-25] setup | Minimal wiki skeleton

Created the first minimal structure for the English learning LLM wiki, including learner profile, current level, roadmap, daily routine, and B2 assessment checklist.
