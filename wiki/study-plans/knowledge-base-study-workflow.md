---
title: Knowledge-Base Study Workflow
tags:
  - english
  - study-system
  - workflow
---

# Knowledge-Base Study Workflow

This workflow makes the wiki drive daily English learning instead of storing disconnected LLM-generated plans.

## Core loop

```text
wiki evidence -> guided daily page -> learner output -> correction -> wiki update -> next daily page
```

## Start of day

When the learner says `今天学习`, create or update a daily page under `wiki/daily/YYYY-MM-DD.md`.

Use:

- [[active-learning]]
- [[log]]
- [[profile/current-level]]
- [[profile/weak-points]]
- [[profile/error-patterns]]
- [[vocabulary/vocabulary-review]]
- [[source-notes/index]]

## Learner work

The learner should complete guided tasks rather than blank free writing:

- Warm-up choices.
- Fill-in-the-blank vocabulary practice.
- Sentence imitation.
- One small output option: very easy, normal, or challenge.
- Stuck-point checkboxes.
- Difficulty checkboxes.

## After completion

When the learner says `我完成了，帮我批改并更新知识库`, read the daily page or the learner's chat answer and update:

1. Daily page correction section.
2. [[log]] with completion, findings, and next action.
3. [[vocabulary/vocabulary-review]] for active vocabulary level/status.
4. [[profile/error-patterns]] only for repeated or high-value errors.
5. [[profile/weak-points]] weekly or when evidence is strong.
6. [[active-learning]] if tomorrow's task queue should change.

## Vocabulary judgment

The learner marks only `hard / okay / easy`. The LLM updates level 0-4 based on both feeling and answer accuracy.

## Error recording rule

Do not record every small mistake. Add an error pattern only if it is repeated, high-value, or blocks basic A2-B1 expression.
