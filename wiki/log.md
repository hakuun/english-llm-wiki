# English LLM Wiki Log

## [2026-06-05] maintenance | Updated CLAUDE.md with automatic workflow rules

Updated `CLAUDE.md` Workflow principles section to make the four new systems automatic when creating daily plans. Added four subsections: (1) **Input rotation** — reading:listening ≈ 2:1 per week, 2-day listening cycle, start with "Talking about books"; (2) **CEFR vocabulary tracking and B1 pipeline** — check CEFR level in Oxford 3000 TSV before adding words, prefer B1 pipeline words, add 3-5 B1 words per daily page; (3) **Reactive + proactive grammar** — reactive repair as default, proactive introduction when errors are light (0-1 items), first proactive lesson = present perfect vs past simple; (4) **Review cadence** — weekly review trigger at ~7 pages, monthly assessment trigger at ~30 days. Also added explicit instruction to read `wiki/active-learning.md` before creating any daily plan. This ensures future agents will automatically incorporate listening, B1 vocabulary, proactive grammar, and review triggers without needing the user to remember to ask.

Completed a comprehensive four-gap fix addressing the most critical structural weaknesses in the wiki for the one-year B2 goal. **Gap 2 (CEFR B2 target)**: rewrote `wiki/standards/cefr-b2-target.md` from placeholder to full CEFR-grounded target page using the official CEFR Companion Volume (2020); rewrote `wiki/assessments/b2-can-do-checklist.md` with ~40 CEFR-aligned items; created CEFR source note. **Gap 1 (listening)**: built complete listening system from scratch — ingested 5 BBC Learning English transcripts (1 A2-B1 + 4 B1-B2) with audio URLs; created individual source notes with vocabulary, comprehension, shadowing, and retelling guidance; populated all three listening wiki pages with materials table, 2-day study cycle, shadowing techniques, Chinese-speaker pronunciation tips, and retelling templates. **Gap 4 (vocabulary)**: added CEFR level column to active vocabulary table (all 16 words now show Oxford 3000 level A1-B1); created B1 word pipeline with 20 pre-selected high-frequency B1 candidates, pipeline rules, BBC transcript cross-referencing, and weekly targets. **Gap 5 (grammar)**: established proactive grammar mechanism in the priority grammar map (reactive:proactive ≈ 70:30); created present-perfect plan as the first proactive unit with 7-step learning sequence, Oxford source file references, lesson templates, and progress tracking. All changes logged, indexed, and cross-referenced. 8 new files created, 14 existing files modified. Raw sources remain untouched per source policy.

## [2026-06-05] grammar | Proactive grammar mechanism and present perfect plan

Added proactive grammar mechanism to `wiki/grammar/priority-grammar-map.md`: defines the distinction between reactive (error-driven) and proactive (systematic introduction) grammar teaching, triggers (when daily errors are ≤1), frequency (~every 3-5 days), and template for proactive grammar daily pages. Created `wiki/grammar/present-perfect-plan.md` as the first proactive grammar unit — 7 sub-topics in logical sequence from form introduction to contrast with past simple, with Oxford source file references, lesson design principles, a concrete first-lesson framework (present perfect vs past simple — the most critical B1 bridge lesson), and progress tracking table. Updated `wiki/grammar/index.md` to reflect the dual reactive+proactive approach. Updated `wiki/active-learning.md` grammar candidates to include proactive trigger condition. Updated `wiki/source-notes/oxford-grammar-core-a1-b2.md` to mark present perfect files as "in proactive track". This closes Gap 5 (grammar was purely reactive).

## [2026-06-05] vocabulary | CEFR level tracking and B1 word pipeline

Added CEFR level column to `wiki/vocabulary/vocabulary-review.md` — all 16 existing active words now show their Oxford 3000 CEFR level (A1-B1). Created `wiki/vocabulary/b1-word-pipeline.md` as the systematic mechanism for pulling B1 words into active study: defines pipeline rules, pre-selects 20 high-frequency B1 candidates waiting for context trigger, identifies B1 words already found in BBC listening transcripts, sets weekly B1 targets (experience, explain, familiar, realize), and documents the pipeline workflow. Updated `wiki/vocabulary/index.md` and `wiki/active-learning.md` to prioritize B1 pipeline words. This closes Gap 4 (vocabulary had no CEFR tracking and no systematic B1 progression).

## [2026-06-05] listening | BBC listening system built with 5 episodes

Ingested 5 BBC Learning English transcripts from `raw/inbox/` and built the complete listening system. Created individual source notes for each episode: (1) Real Easy English "Talking about books" (A2-B1), (2) 6 Minute English "Why are some animals black and white?" (B1-B2), (3) "Making cities feel quieter" (B1-B2), (4) "The future of food" (B1-B2), (5) "Living with debt" (B1-B2). All episodes have audio download URLs and built-in vocabulary lists. Populated `wiki/listening/index.md`, `wiki/listening/transcript-notes.md` (with 2-day study cycle), and `wiki/listening/shadowing-and-retelling.md` (with Chinese-speaker pronunciation tips and retelling templates). Updated `wiki/active-learning.md` to add listening as input candidate. Recommended learning order: start with "Talking about books" (easiest). Updated `wiki/index.md` and `wiki/source-notes/index.md`. This closes Gap 1 (listening was completely blank).

## [2026-06-05] standards | CEFR B2 target page rewritten with official CEFR source

Rewrote `wiki/standards/cefr-b2-target.md` from placeholder to full CEFR-grounded B2 target page using descriptors extracted from `raw/inbox/CEFR Companion Volume_eng.pdf` (Council of Europe, 2020). Content includes: B2 Global Scale (p.175), B2 Salient Features (pp.173-174), Self-Assessment Grid B2 rows (pp.177-179), detailed listening/reading/writing B2 descriptors from Chapter 3, gap analysis against the learner's current level, and a feasible 12-month decomposition. Also rewrote `wiki/assessments/b2-can-do-checklist.md` replacing generic items with ~40 CEFR-aligned can-do items across listening, reading, speaking, writing, and language competence. Created `wiki/source-notes/cefr-companion-volume-b2.md` as the A-level source note. Updated `wiki/index.md` with new Standards section and updated entries. This closes Gap 2 (B2 target page was empty).

## [2026-06-05] daily-study | Completed third-person singular -s repair page

Corrected `wiki/study-plans/daily/2026-06-05.md` after completion. Key findings: (1) **三单 -s is largely mastered** — 16/16 on all -s exercises (weigh/weighs 6/6, work/live/speak 5/5, like/want/need 5/5), output 4 sentences all correct on 三单-s. The learner asked a sharp question ("My suitcases 不也是 it 吗？") showing genuine understanding rather than memorization. Status upgraded to improving. (2) **traffic and get around method change worked** — after two consecutive days of wrong fill-in-the-blank answers, the scene-recognition approach (Chinese→English) produced 6/6 correct. Both upgraded from level 0 to level 2, status weak→active. (3) **Confusable pairs** quiet/quit and clean/clear both 3/3, no further practice needed. (4) **Output** was on-topic and 三单-s perfect, with 3 minor issues: adjective vs adverb (nice→well, first occurrence), missing article (a medical company, existing pattern), and Chinglish hope structure (hope everyone stays healthy, first occurrence). None are urgent. (5) **cannot vs must** spot check passed, confirmed resolved. Tomorrow's focus: consolidate 三单-s in real reading material rather than grammar drills.

## [2026-06-05] study-plan | Daily third-person singular -s agreement repair page

Created `wiki/study-plans/daily/2026-06-05.md` as a 30-minute review-first page with no new reading material. Main focus: (1) **third-person singular -s agreement** — the newly exposed deep grammar issue from yesterday's weigh/weight practice, explained with a clear "noun -s = plural, verb -s = singular" contrast, practiced with weigh/weighs first then extended to work/live/speak/like/want/need; (2) **traffic and get around** — switched from fill-in-the-blank to Chinese→English scene recognition after two consecutive days of wrong answers; (3) **confusable pairs** quick review of quiet/quit and clean/clear exposed in yesterday's output; (4) spot checks for cannot/must (now resolved) and does + base form. Output is 4 guided third-person singular sentences with Chinese pre-writing. Sources: D-level grammar drills.

## [2026-06-05] daily-study | Corrected 2026-06-04 daily repair page

Corrected `wiki/study-plans/daily/2026-06-04.md` after completion. Key findings: (1) **weigh/weight word-class confusion is improving** — learner correctly chose verb forms for all 4 verb slots, the "check word class first" habit is forming. Part B high/height and long/length were 4/4 perfect. (2) **New issue exposed: third-person singular -s agreement** — 4 errors all from weigh vs weighs (missing -s on 3rd-person subjects, adding -s after `does`). Added as a separate error pattern. (3) **cannot vs must is resolved** — Part B 6/6 correct after the two-column contrast exercise, downgraded to weekly spot check. (4) **`traffic` and `get around` remain unmastered** (0/4 across two days), need a method change. (5) **Output was on-topic** (classroom/library rules) with correct must/cannot + base form in all 5 sentences, but 5 vocabulary errors clustered around confusable pairs (quit/quiet, clear/clean, run away/run around). (6) **`spend + doing` upgraded to mastered** (5/5 across 3 consecutive days). Tomorrow's focus: third-person singular -s agreement, traffic/get_around with new method, and light review of 2 confusable word pairs.

## [2026-06-04] study-plan | Daily repair page — weigh/weight pair practice and cannot/must contrast

Created `wiki/study-plans/daily/2026-06-04.md` as a 30-minute error-repair page with no new reading material. Main focus: (1) weigh/weight word-class confusion — redesigned explanation from a "every sentence needs a verb" angle with a "look left" rule, extended to high/height and long/length pairs; (2) cannot vs must two-column contrast with classroom/library rules. Includes quick vocabulary consolidation for traffic/get_around and a spend+doing check question. Output is guided 5 classroom rules with Chinese pre-writing step to prevent off-topic responses.

## [2026-06-04] daily-study | Corrected 2026-06-03 daily page

Corrected `wiki/study-plans/daily/2026-06-03.md` after completion. Good progress on the modal-verb + base form error — 7/7 correct, now resolved. However two new error patterns emerged as consecutive-day repeats: (1) `weigh` (v.) vs `weight` (n.) confusion — 5 mistakes across 2 days, added as formal error pattern with related pairs (high/height, long/length); (2) `cannot` vs `must` meaning reversal — learner wrote "must" for prohibition rules on both days. Output task was off-topic (wrote daily commands instead of travel tips) and showed the `If you ____, you will have to ____.` pattern isn't mastered yet. Added 5 new vocabulary items (traffic, get around, stuck, catch a boat, public transport) and promoted `fit` to review after 2 consecutive correct days. Tomorrow's review focus: weigh/weight pair practice and cannot/must two-column contrast.

## [2026-06-03] study-plan | Daily guided modal-verb + base form repair page

Created `wiki/study-plans/daily/2026-06-03.md` as a 30-minute review-first page. Main focus: repairing yesterday's new modal verb + base form error (`can only taking` → `can only take`), plus `weigh` vs `weight` confusion and `cannot` vs `must` distinction. Uses a short B1 British Council travel guide extract ("How to get around Bangkok") as reading input, with D-level modal-verb grammar drills. Quick check on `spend + doing` to confirm improvement.

## [2026-06-02] daily-study | Completed A2 airport notice reading

Corrected `wiki/study-plans/daily/2026-06-02.md` after completion. Reading comprehension was mostly accurate (5/6) with one detail omission. `spend + time + doing` improved significantly — 3/3 correct, upgraded from weak to review. Two priority errors to address tomorrow: (1) new pattern — modal verb + gerund (`can only taking` → `can only take`), and (2) `weigh` (verb) vs `weight` (noun) confusion. `Cannot` vs `must` meaning distinction also needs practice. Updated vocabulary-review with 7 new/reviewed words and added modal-verb error pattern to profile.

## [2026-06-02] study-plan | Daily guided A2 airport notice page

Created `wiki/study-plans/daily/2026-06-02.md` as a 30-minute review-first page after a short break. It repairs `spend/spent + time + doing`, `a lot of + uncountable noun`, and `looking forward to seeing you`, then uses the British Council A2 `An airport notice` material to practice travel rules with `must / can / cannot`.

## [2026-05-28] daily-study | Completed A2 email reading practice

Corrected `wiki/study-plans/daily/2026-05-28.md` after completion. Reading comprehension was mostly accurate and `by + doing` improved, but `spend + time + doing` still needs review. Added `looking forward to`, `dirt`, `because`, and `get lost` to active vocabulary tracking; tomorrow should review `spend/spent + time + doing`, `a lot of + uncountable noun`, and `looking forward to seeing you`.

## [2026-05-28] study-plan | Daily guided A2 email page

Created `wiki/study-plans/daily/2026-05-28.md` as a 30-minute review-first page. It repairs `spend/by + doing` and `on / in / at`, uses the British Council A2 `An email from a friend` material for short input, and keeps output guided with optional challenge writing.

## [2026-05-27] daily-study | Completed guided A2 work-page

Corrected `wiki/study-plans/daily/2026-05-27.md` after completion. Reading comprehension was accurate, and the learner completed warm-up, listen-read, vocabulary, grammar imitation, and 4-sentence output. Updated active vocabulary and error tracking; tomorrow should review `spend/spent + time + doing`, `by + doing`, and `on / in` surface/container prepositions before adding much new input.

## [2026-05-27] ingest | British Council reading pack and Oxford 3000

Processed newly added `raw/inbox/` materials. Created `wiki/source-notes/british-council-a2-b1-reading-pack.md` for six British Council A2-B1 short reading texts and extracted `raw/inbox/The_Oxford_3000_by_CEFR_level.pdf` into `wiki/vocabulary/oxford-3000-by-cefr.tsv` using PyMuPDF, not `pdftotext`. Created `wiki/source-notes/oxford-3000-by-cefr.md` and updated reading, vocabulary, source-note, and main indexes.

## [2026-05-27] maintenance | Simplified CLAUDE workflow ownership

Compressed the detailed daily, error-tracking, weekly-review, and monthly-assessment sections in `CLAUDE.md` into stable workflow principles. The detailed recurring-command procedures now live in `wiki/study-plans/command-shortcuts.md`, reducing duplicated workflow rules while keeping short commands reliable across agents and computers.

## [2026-05-27] study-system | Added short command workflow triggers

Added concise project-level short command triggers to `CLAUDE.md` and created `wiki/study-plans/command-shortcuts.md` as the detailed workflow map. Linked the shortcut page from `wiki/index.md` and `wiki/active-learning.md` so routine commands like `制定今天的学习计划`, `我完成了今天的计划`, `我新添加了一些资料`, `开始周学习复盘`, and `开始月学习评估` work across agents and computers without long prompts.

## [2026-05-27] maintenance | Clarified monthly, weekly, and active-learning roles

Updated `wiki/study-plans/monthly-plan.md` and `wiki/study-plans/weekly-plan.md` from placeholders into current 2026-05 planning pages. Clarified `wiki/active-learning.md` as the execution control panel for the next daily page, aligned `wiki/study-plans/daily-routine.md` with review-first guided A2/A2-B1 study, and updated the main index.

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
