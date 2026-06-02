import type { ClaudeJob, ClaudeJobType } from '../../types/claude.js';

const jobs = new Map<string, ClaudeJob>();
let runningJobId: string | null = null;

export function createJob(type: ClaudeJobType, date?: string): ClaudeJob {
  const id = `job_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const job: ClaudeJob = {
    id,
    type,
    date,
    status: 'queued',
    stdout: '',
    stderr: '',
  };
  jobs.set(id, job);
  return job;
}

export function getJob(id: string): ClaudeJob | undefined {
  return jobs.get(id);
}

export function listJobs(): ClaudeJob[] {
  return [...jobs.values()].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 20);
}

export function startJob(id: string): void {
  const job = requireJob(id);
  runningJobId = id;
  job.status = 'running';
  job.startedAt = new Date().toISOString();
}

export function appendJobOutput(id: string, stream: 'stdout' | 'stderr', chunk: string): void {
  const job = requireJob(id);
  job[stream] += chunk;
}

export function finishJob(id: string, success: boolean, error?: string): void {
  const job = requireJob(id);
  job.status = success ? 'succeeded' : 'failed';
  job.finishedAt = new Date().toISOString();
  job.error = error;
  if (runningJobId === id) {
    runningJobId = null;
  }
}

export function assertNoRunningJob(): void {
  if (runningJobId) {
    throw new Error('A Claude Code job is already running.');
  }
}

export function isClaudeJobRunning(): boolean {
  return Boolean(runningJobId);
}

function requireJob(id: string): ClaudeJob {
  const job = jobs.get(id);
  if (!job) {
    throw new Error(`Unknown job: ${id}`);
  }
  return job;
}
