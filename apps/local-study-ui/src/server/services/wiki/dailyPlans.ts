import { promises as fs } from 'node:fs';
import path from 'node:path';
import { dailyRoot } from '../../config.js';
import { readDailyPlan } from '../markdown/dailyPlanParser.js';
import { toRepoRelative } from '../safety/pathGuards.js';

export async function listDailyPlans(): Promise<Array<{
  date: string;
  title: string;
  status: string;
  focus: string | null;
  path: string;
}>> {
  const entries = await fs.readdir(dailyRoot, { withFileTypes: true });
  const dates = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => /^\d{4}-\d{2}-\d{2}\.md$/.test(name))
    .map((name) => name.slice(0, -3))
    .sort()
    .reverse();

  const plans = await Promise.all(dates.map(async (date) => {
    const daily = await readDailyPlan(date);
    if (!daily.exists) {
      return null;
    }

    return {
      date,
      title: daily.title,
      status: daily.status,
      focus: daily.focusSummary,
      path: daily.path,
    };
  }));

  return plans.filter((plan): plan is NonNullable<typeof plan> => Boolean(plan));
}

export function dailyPathForList(date: string): string {
  return toRepoRelative(path.join(dailyRoot, `${date}.md`));
}
