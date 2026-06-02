import { Router } from 'express';
import { todayIsoDate } from '../config.js';
import { readDailyPlan } from '../services/markdown/dailyPlanParser.js';
import { submissionSchema, writeSubmission } from '../services/markdown/dailyPlanWriter.js';
import { listDailyPlans } from '../services/wiki/dailyPlans.js';
import { runCorrectDaily } from '../services/claude/claudeRunner.js';

export const dailyRouter = Router();

dailyRouter.get('/', async (_request, response, next) => {
  try {
    response.json({ items: await listDailyPlans() });
  } catch (error) {
    next(error);
  }
});

dailyRouter.get('/today', async (_request, response, next) => {
  try {
    response.json(await readDailyPlan(todayIsoDate()));
  } catch (error) {
    next(error);
  }
});

dailyRouter.get('/:date', async (request, response, next) => {
  try {
    response.json(await readDailyPlan(request.params.date));
  } catch (error) {
    next(error);
  }
});

dailyRouter.post('/:date/submission', async (request, response, next) => {
  try {
    const payload = submissionSchema.parse(request.body);
    await writeSubmission(request.params.date, payload);
    response.json({ ok: true, date: request.params.date, status: 'submitted' });
  } catch (error) {
    next(error);
  }
});

dailyRouter.post('/:date/submit-and-correct', async (request, response, next) => {
  try {
    const payload = submissionSchema.parse(request.body);
    await writeSubmission(request.params.date, payload);
    const job = runCorrectDaily(request.params.date);
    response.json({ ok: true, jobId: job.id });
  } catch (error) {
    next(error);
  }
});
