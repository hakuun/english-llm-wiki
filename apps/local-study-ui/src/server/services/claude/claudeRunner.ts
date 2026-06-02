import { spawn } from 'node:child_process';
import { config } from '../../config.js';
import type { ClaudeJob } from '../../types/claude.js';
import { appendJobOutput, assertNoRunningJob, createJob, finishJob, startJob } from './jobStore.js';
import { buildCorrectDailyPrompt, buildGenerateTodayPrompt } from './promptBuilder.js';

export function runGenerateToday(date: string): ClaudeJob {
  assertNoRunningJob();
  const job = createJob('generate-today', date);
  void runClaudeJob(job.id, buildGenerateTodayPrompt(date));
  return job;
}

export function runCorrectDaily(date: string): ClaudeJob {
  assertNoRunningJob();
  const job = createJob('correct-daily', date);
  void runClaudeJob(job.id, buildCorrectDailyPrompt(date));
  return job;
}

async function runClaudeJob(jobId: string, prompt: string): Promise<void> {
  startJob(jobId);

  const args = [
    '--print',
    '--output-format',
    'json',
    '--max-turns',
    '8',
    '--permission-mode',
    'acceptEdits',
    '--allowedTools',
    'Read,Glob,Grep,Edit,Write',
    prompt,
  ];

  const child = spawn(config.claudeBin, args, {
    cwd: config.repoRoot,
    env: process.env,
    shell: false,
  });

  const timeout = setTimeout(() => {
    child.kill('SIGTERM');
  }, config.claudeTimeoutMs);

  child.stdout.on('data', (chunk: Buffer) => appendJobOutput(jobId, 'stdout', chunk.toString()));
  child.stderr.on('data', (chunk: Buffer) => appendJobOutput(jobId, 'stderr', chunk.toString()));

  child.on('error', (error) => {
    clearTimeout(timeout);
    finishJob(jobId, false, error.message);
  });

  child.on('close', (code) => {
    clearTimeout(timeout);
    finishJob(jobId, code === 0, code === 0 ? undefined : `Claude exited with code ${code}`);
  });
}
