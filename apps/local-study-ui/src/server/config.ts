import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const defaultRepoRoot = path.resolve(appRoot, '../..');

export const config = {
  host: process.env.STUDY_UI_HOST ?? '127.0.0.1',
  port: Number(process.env.STUDY_UI_PORT ?? 8787),
  repoRoot: path.resolve(process.env.STUDY_UI_REPO_ROOT ?? defaultRepoRoot),
  claudeBin: process.env.STUDY_UI_CLAUDE_BIN ?? 'claude',
  claudeTimeoutMs: Number(process.env.STUDY_UI_CLAUDE_TIMEOUT_MS ?? 8 * 60 * 1000),
  todayOverride: process.env.STUDY_UI_TODAY,
};

export const wikiRoot = path.join(config.repoRoot, 'wiki');
export const dailyRoot = path.join(wikiRoot, 'study-plans', 'daily');

export function todayIsoDate(): string {
  if (config.todayOverride) {
    return config.todayOverride;
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
