import { Router } from 'express';
import { z } from 'zod';
import { todayIsoDate } from '../config.js';
import { assertValidDate } from '../services/safety/pathGuards.js';
import { getJob, listJobs } from '../services/claude/jobStore.js';
import { runCorrectDaily, runGenerateToday } from '../services/claude/claudeRunner.js';

export const claudeRouter = Router();

const datePayload = z.object({ date: z.string().optional() });

claudeRouter.post('/generate-today', (request, response, next) => {
  try {
    const payload = datePayload.parse(request.body ?? {});
    const date = payload.date ?? todayIsoDate();
    assertValidDate(date);
    const job = runGenerateToday(date);
    response.json({ jobId: job.id });
  } catch (error) {
    next(error);
  }
});

claudeRouter.post('/correct-daily', (request, response, next) => {
  try {
    const payload = z.object({ date: z.string() }).parse(request.body ?? {});
    assertValidDate(payload.date);
    const job = runCorrectDaily(payload.date);
    response.json({ jobId: job.id });
  } catch (error) {
    next(error);
  }
});

claudeRouter.get('/jobs', (_request, response) => {
  response.json({ items: listJobs() });
});

claudeRouter.get('/jobs/:jobId', (request, response) => {
  const job = getJob(request.params.jobId);
  if (!job) {
    response.status(404).json({ error: 'Job not found' });
    return;
  }

  response.json(job);
});
