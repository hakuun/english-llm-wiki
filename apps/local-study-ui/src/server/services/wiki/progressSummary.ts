import type { ProgressSummary } from '../../types/progress.js';
import { listDailyPlans } from './dailyPlans.js';
import { readVocabularySummary } from './vocabularyReview.js';
import { readActiveErrorPatterns } from './errorPatterns.js';
import { readWeakPoints } from './weakPoints.js';
import { readRecentLogEntries } from './log.js';

export async function readProgressSummary(): Promise<ProgressSummary> {
  const [dailyPlans, vocabulary, activeErrors, weakPoints, recentLog] = await Promise.all([
    listDailyPlans(),
    readVocabularySummary(),
    readActiveErrorPatterns(),
    readWeakPoints(),
    readRecentLogEntries(),
  ]);

  return {
    daily: {
      total: dailyPlans.length,
      planned: dailyPlans.filter((plan) => plan.status === 'planned').length,
      submitted: dailyPlans.filter((plan) => plan.status === 'submitted').length,
      corrected: dailyPlans.filter((plan) => plan.status === 'corrected').length,
      recent: dailyPlans.slice(0, 10),
    },
    vocabulary,
    errors: {
      active: activeErrors,
    },
    weakPoints,
    log: {
      recent: recentLog,
    },
  };
}
