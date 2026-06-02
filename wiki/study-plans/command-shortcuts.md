---
title: Command Shortcuts
tags:
  - english
  - study-system
  - workflow
---

# Command Shortcuts

Use these short Chinese commands to trigger recurring English-learning workflows. The learner should not need to type long prompts for routine study operations.

## 制定今天的学习计划 / 今天学习

Create or update today's guided daily page under `wiki/study-plans/daily/YYYY-MM-DD.md`.

Before writing the page, review recent evidence from:

- [[active-learning]]
- [[log]]
- [[study-plans/daily/README]]
- [[profile/current-level]]
- [[profile/weak-points]]
- [[profile/error-patterns]]
- [[vocabulary/vocabulary-review]]
- [[source-notes/index]]

Default behavior:

- 30 minutes unless the learner says otherwise.
- Review-first: repair yesterday's errors before adding new material.
- Guided output first; blank free writing only as an optional challenge.
- Repair only 1-2 priority errors per day.

## 我完成了今天的计划

Run daily correction and wiki update.

Expected actions:

1. Find today's daily page.
2. Correct the learner's answers clearly in Chinese, keeping target English examples in English.
3. Update the daily page correction section.
4. Update [[vocabulary/vocabulary-review]] for active vocabulary status.
5. Update [[profile/error-patterns]] only for repeated or high-value errors.
6. Update [[profile/weak-points]] when evidence is strong.
7. Append a short entry to [[log]].
8. State tomorrow's likely review focus.

If the daily page contains `## UI completion submission`, use that section as the learner's completion evidence.

If the learner's answers are only in chat, use the chat answers as the completion evidence.

## 我新添加了一些资料

Run the source ingest workflow.

Expected actions:

1. Check `raw/inbox/` and relevant `raw/sources/` folders.
2. Identify source type, topic, approximate CEFR level, and source quality A/B/C/D.
3. Decide whether the material is useful now, later, or should be skipped.
4. Create or update a concise source note under `wiki/source-notes/` when useful.
5. Update related reading, listening, vocabulary, grammar, writing, or assessment indexes.
6. If useful for near-term study, add it to [[active-learning]].
7. Append a short entry to [[log]].

## 开始周学习复盘

Run the weekly review workflow.

Expected actions:

1. Review recent daily pages, [[log]], [[vocabulary/vocabulary-review]], [[profile/error-patterns]], and [[profile/weak-points]].
2. Summarize completed work, skipped work, repeated errors, weak vocabulary, and difficulty fit.
3. Update [[study-plans/weekly-plan]].
4. Update [[profile/weak-points]] when useful.
5. Append a short entry to [[log]].

## 开始月学习评估

Run the monthly assessment workflow.

Expected actions:

1. Review this month's daily pages, weekly plan, log, current level, vocabulary, and error evidence.
2. Assess reading, listening, vocabulary, grammar, writing, and speaking support.
3. Compare current evidence against practical A2/B1/B2 can-do targets.
4. Update [[assessments/monthly-checkpoints]].
5. Update [[profile/current-level]].
6. Update [[study-plans/monthly-plan]].
7. Append a short entry to [[log]].

## Design rule

Keep this page as the detailed shortcut map. Keep `CLAUDE.md` concise: it should only define that these short commands are valid project-level triggers and point here for details.