export type ClaudeJobType = 'generate-today' | 'correct-daily';
export type ClaudeJobStatus = 'queued' | 'running' | 'succeeded' | 'failed';

export type ClaudeJob = {
  id: string;
  type: ClaudeJobType;
  date?: string;
  status: ClaudeJobStatus;
  startedAt?: string;
  finishedAt?: string;
  stdout: string;
  stderr: string;
  error?: string;
};
