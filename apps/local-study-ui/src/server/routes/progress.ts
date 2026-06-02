import { Router } from 'express';
import { readProgressSummary } from '../services/wiki/progressSummary.js';

export const progressRouter = Router();

progressRouter.get('/summary', async (_request, response, next) => {
  try {
    response.json(await readProgressSummary());
  } catch (error) {
    next(error);
  }
});
