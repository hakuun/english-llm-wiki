import { promises as fs } from 'node:fs';
import { z } from 'zod';
import { resolveDailyPath } from '../safety/pathGuards.js';
import { withFileLock } from '../safety/fileLock.js';

export const submissionSchema = z.object({
  warmupAnswers: z.string().optional().default(''),
  inputCompletion: z.array(z.string()).optional().default([]),
  comprehensionAnswers: z.string().optional().default(''),
  vocabularyAnswers: z.string().optional().default(''),
  grammarAnswers: z.string().optional().default(''),
  smallOutput: z.string().optional().default(''),
  stuckPoints: z.array(z.string()).optional().default([]),
  optionalNote: z.string().optional().default(''),
  completionRecord: z.object({
    review: z.string().optional().default(''),
    input: z.string().optional().default(''),
    newWordsRemembered: z.string().optional().default(''),
    outputSentences: z.string().optional().default(''),
    errorsToday: z.string().optional().default(''),
    difficulty: z.string().optional().default(''),
    tomorrowReview: z.string().optional().default(''),
  }).optional().default({
    review: '',
    input: '',
    newWordsRemembered: '',
    outputSentences: '',
    errorsToday: '',
    difficulty: '',
    tomorrowReview: '',
  }),
});

export type SubmissionPayload = z.infer<typeof submissionSchema>;

const submissionHeading = '## UI completion submission';
const submissionBlockPattern = /^##\s+UI completion submission[\s\S]*?(?=^##\s+|\s*$)/m;
const correctionHeadingPattern = /^##\s+.*LLM correction and update.*$/m;

export async function writeSubmission(date: string, payload: SubmissionPayload): Promise<void> {
  const filePath = resolveDailyPath(date);
  const parsedPayload = submissionSchema.parse(payload);

  await withFileLock(async () => {
    const raw = await fs.readFile(filePath, 'utf8');
    const submissionMarkdown = renderSubmissionMarkdown(parsedPayload);
    const updated = insertOrReplaceSubmission(raw, submissionMarkdown);
    await fs.writeFile(filePath, updated, 'utf8');
  });
}

export function insertOrReplaceSubmission(raw: string, submissionMarkdown: string): string {
  const normalizedSubmission = `${submissionHeading}\n\n${submissionMarkdown.trim()}\n\n---\n\n`;

  if (submissionBlockPattern.test(raw)) {
    return raw.replace(submissionBlockPattern, normalizedSubmission.trimEnd() + '\n\n');
  }

  const correctionMatch = raw.match(correctionHeadingPattern);
  if (!correctionMatch || correctionMatch.index === undefined) {
    return raw.trimEnd() + '\n\n---\n\n' + normalizedSubmission;
  }

  const insertAt = correctionMatch.index;
  return raw.slice(0, insertAt).trimEnd() + '\n\n' + normalizedSubmission + raw.slice(insertAt);
}

function renderSubmissionMarkdown(payload: SubmissionPayload): string {
  return [
    `Submitted at: ${formatLocalDateTime(new Date())}`,
    renderTextSection('Warm-up answers', payload.warmupAnswers),
    renderListSection('Input completion', payload.inputCompletion),
    renderTextSection('Comprehension answers', payload.comprehensionAnswers),
    renderTextSection('Vocabulary answers', payload.vocabularyAnswers),
    renderTextSection('Grammar answers', payload.grammarAnswers),
    renderTextSection('Small output', payload.smallOutput),
    renderListSection('Stuck points', payload.stuckPoints),
    renderTextSection('Optional note', payload.optionalNote),
    renderTextSection('Completion record', renderCompletionRecord(payload.completionRecord)),
  ].filter(Boolean).join('\n\n');
}

function renderTextSection(title: string, value: string): string {
  return `### ${title}\n\n\`\`\`text\n${fence(value.trim() || '(empty)')}\n\`\`\``;
}

function renderListSection(title: string, values: string[]): string {
  if (!values.length) {
    return `### ${title}\n\n- (none)`;
  }

  return `### ${title}\n\n${values.map((value) => `- [x] ${value}`).join('\n')}`;
}

function renderCompletionRecord(record: SubmissionPayload['completionRecord']): string {
  return [
    '今日完成：',
    `1. 复习/错误修复：${record.review || '未填写'}`,
    `2. 阅读材料：${record.input || '未填写'}`,
    `3. 新词：记住了 ${record.newWordsRemembered || '未填写'} 个`,
    `4. 输出：写了 ${record.outputSentences || '未填写'} 句`,
    `5. 今天还错在哪里：${record.errorsToday || '未填写'}`,
    `6. 今天难度：${record.difficulty || '未填写'}`,
    `7. 明天需要继续复习：${record.tomorrowReview || '未填写'}`,
  ].join('\n');
}

function fence(value: string): string {
  return value.replace(/```/g, '`​``');
}

function formatLocalDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
}
