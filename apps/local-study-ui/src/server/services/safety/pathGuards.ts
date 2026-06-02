import path from 'node:path';
import { config, dailyRoot } from '../../config.js';

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function assertValidDate(date: string): void {
  if (!datePattern.test(date)) {
    throw new Error('Invalid date. Expected YYYY-MM-DD.');
  }
}

export function resolveDailyPath(date: string): string {
  assertValidDate(date);
  const resolved = path.resolve(dailyRoot, `${date}.md`);
  assertInside(resolved, dailyRoot);
  return resolved;
}

export function assertInside(targetPath: string, rootPath = config.repoRoot): void {
  const relative = path.relative(path.resolve(rootPath), path.resolve(targetPath));
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Path is outside the allowed root.');
  }
}

export function toRepoRelative(targetPath: string): string {
  assertInside(targetPath, config.repoRoot);
  return path.relative(config.repoRoot, targetPath).replace(/\\/g, '/');
}
