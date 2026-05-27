# English LLM Wiki Log

## [2026-05-27] maintenance | Unified daily study pages under study-plans

Integrated the previous `wiki/daily/` guided-page system and `wiki/study-plans/daily-plan-*` files into `wiki/study-plans/daily/`. The new daily directory now holds the template, README, and dated pages for 2026-05-25 through 2026-05-27. Updated the main index, workflow pages, reading article index, source-notes index, and Oxford grammar source note processing table so daily study has one official entry point.

## [2026-05-27] study-system | Knowledge-base-driven guided daily workflow

Created a guided daily-study workflow so the wiki drives learning instead of storing disconnected daily plans. Added `wiki/active-learning.md`, `wiki/daily/_template.md`, `wiki/daily/README.md`, `wiki/daily/2026-05-27.md`, `wiki/vocabulary/vocabulary-review.md`, `wiki/profile/weak-points.md`, and `wiki/study-plans/knowledge-base-study-workflow.md`. Updated the main and vocabulary indexes. Daily output now uses choices, blanks, sentence imitation, small output options, stuck-point checkboxes, and LLM-updated vocabulary/error tracking.

## [2026-05-27] study-plan | Daily plan document

Created `wiki/study-plans/daily-plan-2026-05-27.md` as a review-first 30-minute plan. The plan starts from the learner's 2026-05-26 completion evidence, repairs the `books` plural omission and `on the desk` place-preposition error, then adds A2 listen-read input, vocabulary, `on / in / at` practice, required 4-sentence output, and a learner-fillable completion record.

## [2026-05-26] study-plan | Daily plan document

Created and revised `wiki/study-plans/daily-plan-2026-05-26.md` into a review-first 30-minute plan. The updated version starts with the learner's 2026-05-25 completion review, directly repairs the `five` vs `three` reading-detail error and `There are` vs `They are` sentence error, then adds A2 reading, vocabulary, `have been ... since ...` practice, output, and a learner-fillable completion record.

## [2026-05-25] study-plan | Daily plan document

Created `wiki/study-plans/daily-plan-2026-05-25.md` with a 30-minute reading-first plan, A1-A2 LLM-generated reading material, vocabulary, be-verb practice, output task, and learner-fillable completion record.

## [2026-05-25] study-plan | Daily routine template and review triggers

Updated `wiki/study-plans/daily-routine.md` with a fixed 30-minute daily template, daily completion record, weekly adjustment trigger, and monthly assessment trigger for the one-year B2 goal.

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
