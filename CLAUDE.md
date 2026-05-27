# English LLM Wiki Instructions

This project is an LLM-maintained personal English-learning wiki for a Chinese native speaker with roughly 1,000 basic English words. The learner's goal is to reach general CEFR B2 in about one year using spare time, with a default daily study budget of about 30 minutes.

The wiki follows the LLM Wiki pattern described in `llm-wiki.md`: raw sources are immutable, the wiki is maintained by the LLM, and this file defines the operating rules and workflows.

## Primary goal

Help the learner steadily approach CEFR B2 by building and maintaining a practical, source-grounded English learning system.

Prioritize:

1. Vocabulary growth from basic words toward high-frequency B1/B2 vocabulary.
2. Reading comprehension through graded and progressively harder materials.
3. Listening comprehension using materials with transcripts where possible.
4. Practical grammar for reading, writing, and self-correction.
5. Writing and expression through sentence imitation, summaries, short answers, and paragraph writing.
6. Speaking only as a lighter supporting skill through reading aloud, shadowing, retelling, and short spoken-style responses.

Do not optimize the wiki for collecting large amounts of material. Optimize it for measurable learning progress.

## Language policy

Use Chinese for explanations, planning, diagnosis, and learner-facing guidance by default.

Keep English examples, target sentences, collocations, prompts, vocabulary items, and corrected writing in English.

As the learner approaches B1 and above, gradually increase the proportion of simple English explanations, but do not sacrifice clarity.

## Source policy

The wiki must be grounded in high-quality sources. The LLM may organize, explain, simplify, compare, and generate practice, but should not invent authoritative claims.

Classify sources as follows:

### A-level sources: standards and authoritative references

Use for CEFR targets, level calibration, vocabulary/grammar confirmation, and assessment.

Examples include CEFR documents, Cambridge/Oxford/Longman/Collins learner dictionaries, British Council, BBC Learning English, Cambridge English materials, and reputable grammar references.

### B-level sources: high-quality learning materials

Use for daily study input and structured practice.

Examples include graded readers, ESL/EFL articles, listening materials with transcripts, B1/B2 course materials, and exam-style reading/listening/writing samples.

### C-level sources: real-world English materials

Use increasingly after the learner reaches stronger B1 foundations.

Examples include news explainers, simple opinion pieces, blog posts, product documentation, podcast transcripts, and accessible nonfiction articles.

### D-level sources: LLM-generated practice

Use only for supplementary drills, examples, rewrites, quizzes, and practice tasks.

Label LLM-generated learning material clearly when it is not derived from an external source. Do not treat it as a factual authority.

## Recommended material strategy

For months 1-3, focus mainly on A2-B1 comprehensible input. Avoid making difficult authentic English the daily core.

For months 4-8, gradually add authentic but accessible materials while continuing structured vocabulary, listening, and writing practice.

For months 9-12, increase B2-level reading, listening, summarizing, opinion writing, and error correction.

If a source is too difficult for the current level, preserve it as a future source instead of forcing it into the daily plan.

## Directory structure

Prefer this structure as the wiki grows:

```text
raw/
  sources/
    standards/
    dictionaries/
    grammar/
    reading/
    listening/
    writing/
  inbox/

wiki/
  index.md
  log.md
  roadmap.md

  profile/
    learner-profile.md
    current-level.md
    error-patterns.md

  standards/
    cefr-b2-target.md

  vocabulary/
    index.md
    high-frequency-words.md
    confusing-words.md
    collocations.md
    word-family-notes.md

  grammar/
    index.md
    priority-grammar-map.md
    common-errors.md

  reading/
    index.md
    graded-reading-path.md
    article-notes.md

  listening/
    index.md
    transcript-notes.md
    shadowing-and-retelling.md

  writing/
    index.md
    writing-prompts.md
    corrected-writing.md
    sentence-patterns.md

  study-plans/
    yearly-roadmap.md
    monthly-plan.md
    weekly-plan.md
    daily-routine.md

  assessments/
    monthly-checkpoints.md
    b2-can-do-checklist.md

  source-notes/
```

Create directories and files only when they are useful for the current workflow. Do not create empty bureaucracy for its own sake.

## Wiki maintenance rules

- `raw/` contains source materials and should be treated as immutable unless the user explicitly asks otherwise.
- `wiki/` contains LLM-maintained synthesis, notes, plans, indexes, and assessments.
- `wiki/index.md` is the main content index. Update it whenever meaningful pages are created or substantially changed.
- `wiki/log.md` is chronological and append-only. Log ingests, major learning-plan updates, assessments, and maintenance passes.
- Use Obsidian-style internal links where helpful, for example `[[vocabulary/index]]`.
- Prefer concise, useful pages over long exhaustive notes.
- When a conversation produces durable learning value, offer to file it into the wiki.

## Ingest workflow

When the user asks to process a source:

1. Read the source from `raw/inbox/` or `raw/sources/`.
2. Identify source type, topic, approximate CEFR level, and usefulness for the learner's current stage.
3. Extract only high-value vocabulary, collocations, grammar patterns, expressions, and comprehension points.
4. Create or update a page under `wiki/source-notes/` or the relevant skill area.
5. Update related vocabulary, grammar, reading, listening, writing, or assessment pages when useful.
6. Update `wiki/index.md`.
7. Append an entry to `wiki/log.md`.
8. If the source is too difficult, mark it as future material and recommend a simpler next action.

Do not turn every source into a long summary. Extract what helps the B2 goal.

## Short command workflows

The learner should not need to type long prompts for recurring study operations. Treat these short Chinese commands as project-level workflow triggers and follow `wiki/study-plans/command-shortcuts.md` for details:

- `制定今天的学习计划` / `今天学习` — create or update today's guided daily page.
- `我完成了今天的计划` — correct today's work and update the learning wiki.
- `我新添加了一些资料` — ingest newly added materials from `raw/inbox/` or `raw/sources/`.
- `开始周学习复盘` — review recent daily evidence and update the weekly plan.
- `开始月学习评估` — run the monthly evidence-based assessment.

## Workflow principles

Use `wiki/study-plans/command-shortcuts.md` as the operational map for recurring daily study, completion correction, source ingest, weekly review, and monthly assessment commands.

Stable rules:

- Daily study defaults to 30 minutes unless the learner says otherwise.
- Daily plans must be review-first and based on recent completion, mistakes, and difficulty feedback.
- Guided output is preferred; blank free writing should only be optional or very small.
- Each daily page should repair only 1-2 priority errors and keep the task small enough to finish.
- English corrections should be clear, explained in Chinese, and focused on the most important errors.
- Track only repeated, high-value, or blocking personal errors in `wiki/profile/error-patterns.md`.
- Weekly and monthly reviews must be evidence-based, not motivational summaries.
- Update `wiki/log.md` after major study, ingest, review, assessment, or maintenance events.

## Agent behavior

- Be direct, practical, and learner-focused.
- Prefer gradual improvement over ambitious but unsustainable plans.
- When sources conflict, flag the contradiction instead of hiding it.
- When information is uncertain, say so and recommend how to verify it.
- Do not overbuild tooling before the wiki has enough content to need it.
- Do not create large batches of pages without a clear learning purpose.
- Keep the learner's B2 goal and 30-minute daily constraint visible in planning decisions.
