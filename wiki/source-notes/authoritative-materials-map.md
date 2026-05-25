# Authoritative Materials Map

This page defines how to find, judge, and use authoritative and effective English learning materials for the learner's one-year CEFR B2 goal.

Current learner profile:

- Native language: Chinese.
- Current vocabulary: about 1,000 basic English words.
- Estimated current writing level: A2 to early B1 on familiar topics.
- Daily study time: about 30 minutes.
- Goal: general CEFR B2 in about one year.

## Core rule

Do not collect materials just because they look advanced or famous. Choose materials that are reliable, level-appropriate, and useful for the current stage.

For the first 3 months, prioritize A2-B1 comprehensible input. Difficult B2 authentic materials can be saved for later, but should not become the daily core yet.

## Source quality levels

### A-level: standards and authoritative references

Purpose: define the target, calibrate level, verify vocabulary/grammar, and support assessment.

Use these for:

- CEFR B2 target description.
- B1/B2 skill checklists.
- Exam-level comparison.
- Reliable word meaning, example sentences, collocations, and usage.

Examples of source types:

- CEFR official descriptors and companion materials.
- Cambridge English level resources and B2 First sample materials.
- British Council level descriptions and learning resources.
- Cambridge, Oxford, Longman, Collins learner dictionaries.
- Reputable grammar references for English learners.

Search keywords:

```text
CEFR B2 descriptors English
CEFR Companion Volume B2 English
Cambridge English B2 First sample papers
British Council CEFR B2 English
Cambridge Dictionary learner English
Oxford Learner's Dictionaries English
Longman Dictionary of Contemporary English learner
```

Where to store:

- `raw/sources/standards/`
- `raw/sources/dictionaries/`
- `wiki/standards/`
- `wiki/assessments/`

How to use:

- Extract practical can-do statements.
- Build assessment checklists.
- Verify word meanings, collocations, and common usage.
- Do not use these as daily reading material unless they are learner-friendly.

## B-level: structured learning materials

Purpose: daily learning input and controlled practice.

Use these for:

- Reading.
- Listening with transcripts.
- Vocabulary in context.
- Grammar in context.
- Short writing or retelling tasks.

Examples of source types:

- A2-B1 graded reading materials.
- ESL/EFL reading and listening lessons.
- Listening materials with transcripts.
- B1 Preliminary-style materials.
- Lower-intermediate and intermediate learner articles.

Search keywords:

```text
A2 English reading practice
B1 English reading practice
A2 English listening with transcript
B1 English listening with transcript
British Council LearnEnglish A2 reading
British Council LearnEnglish B1 listening
BBC Learning English lower intermediate
English graded reader A2 B1
```

Where to store:

- `raw/sources/reading/`
- `raw/sources/listening/`
- `wiki/reading/`
- `wiki/listening/`
- `wiki/source-notes/`

How to use:

- Select short materials that can fit a 30-minute session.
- Extract 5-10 useful words or collocations, not every unknown word.
- Extract 1-2 useful sentence patterns.
- Add a short output task: summary, retelling, or opinion.

## C-level: real-world English materials

Purpose: gradual transition toward B2 authentic English.

Use these after stronger B1 foundations are built.

Examples of source types:

- News explainers.
- Simple opinion articles.
- Accessible nonfiction blog posts.
- Product documentation.
- Podcast or video transcripts.
- Front-end development articles.
- Education technology articles.

Search keywords:

```text
simple English news explanation
technology article for beginners English
front-end development article beginner English
education technology article English
podcast transcript intermediate English
```

Where to store:

- `raw/sources/reading/`
- `raw/sources/listening/`
- `wiki/source-notes/`

How to use:

- Use selectively.
- If too difficult, mark as `later`.
- Prefer materials where the learner already understands the topic, such as front-end development or education technology.

Recommended ratio:

- Months 1-3: about 80% general English, 20% technical/work-related English.
- After stable B1: about 70% general English, 30% technical/work-related English.

## D-level: LLM-generated practice

Purpose: supplementary exercises, controlled examples, rewrites, quizzes, and review tasks.

Use these for:

- Sentence imitation.
- Grammar drills.
- Vocabulary review.
- Simplified explanations.
- Short writing prompts.
- Error correction practice.

Rules:

- Clearly label generated practice when it is not based on an external source.
- Do not treat LLM-generated material as an authoritative source.
- Verify important vocabulary, grammar, and level claims against A-level sources when needed.

## Material selection checklist

Before adding a material to the active study path, check:

```text
Source quality: A / B / C / D
Approximate level: A1 / A2 / B1 / B2 / above B2
Current usefulness: now / later / skip
Primary skill: vocabulary / grammar / reading / listening / writing / assessment
Transcript available: yes / no / not relevant
Can fit 30 minutes: yes / no
Unknown-word load: low / medium / high
Recommended action: study / extract / review / archive
```

## Difficulty rule

A material is probably suitable now if:

- The learner can understand about 70-85% before detailed study.
- The main idea is understandable without translating every sentence.
- It can produce a small output task after study.

A material is probably too difficult now if:

- More than about 20-30% of the words are unknown.
- The learner cannot summarize the main idea in Chinese after reading/listening.
- It requires too much dictionary use for a 30-minute session.

If too difficult, save it as future material instead of forcing it.

## Recommended first source batch

Start with a small batch, not a large collection:

1. One CEFR/B2 standard source for target calibration.
2. One learner dictionary source for vocabulary checking.
3. Two A2-B1 reading sources.
4. Two A2-B1 listening sources with transcripts.
5. One B1-style writing prompt or sample.
6. Optional: one beginner-friendly front-end or education-technology article as motivation.

## How to ask the agent to process a material

Use this prompt:

```text
请判断这个材料是否适合我当前 A2-B1 到 B2 的路线：
1. 难度是多少？
2. 来源质量是 A/B/C/D 哪一类？
3. 我现在该不该学？
4. 如果该学，请提取词汇、搭配、句型，并设计一个 30 分钟学习任务。
5. 请把有长期价值的内容写入 wiki。
```

## Current next action

Find or provide the first A2-B1 reading/listening material. Process only one source first, then check whether the workflow is useful before expanding the source collection.
