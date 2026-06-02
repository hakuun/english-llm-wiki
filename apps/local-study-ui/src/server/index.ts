import express from 'express';
import { config, dailyRoot, wikiRoot } from './config.js';
import { claudeRouter } from './routes/claude.js';
import { dailyRouter } from './routes/daily.js';
import { progressRouter } from './routes/progress.js';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({
    ok: true,
    repoRoot: config.repoRoot,
    wikiRoot,
    dailyRoot,
    claudeBin: config.claudeBin,
  });
});

app.use('/api/daily', dailyRouter);
app.use('/api/progress', progressRouter);
app.use('/api/claude', claudeRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  response.status(400).json({ error: message });
});

app.listen(config.port, config.host, () => {
  console.log(`Study UI API listening at http://${config.host}:${config.port}`);
});
