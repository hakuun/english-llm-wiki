import { useEffect, useMemo, useState } from 'react';
import { AnswerForm } from './components/AnswerForm.js';
import { CorrectionPanel } from './components/CorrectionPanel.js';
import { DailyPlanCard } from './components/DailyPlanCard.js';
import { ProgressSummary } from './components/ProgressSummary.js';
import { SectionCard } from './components/SectionCard.js';
import type { ClaudeJob, DailyResponse, ProgressSummaryData, SubmissionPayload } from './types.js';

export function App() {
  const [tab, setTab] = useState<'today' | 'progress'>('today');
  const [daily, setDaily] = useState<DailyResponse | null>(null);
  const [progress, setProgress] = useState<ProgressSummaryData | null>(null);
  const [job, setJob] = useState<ClaudeJob | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const jobRunning = job?.status === 'queued' || job?.status === 'running';

  async function loadDaily() {
    const response = await fetch('/api/daily/today');
    setDaily(await response.json());
  }

  async function loadProgress() {
    const response = await fetch('/api/progress/summary');
    setProgress(await response.json());
  }

  async function refreshAll() {
    setLoading(true);
    try {
      await Promise.all([loadDaily(), loadProgress()]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAll();
  }, []);

  useEffect(() => {
    if (!jobRunning || !job) return;

    const id = window.setInterval(async () => {
      const response = await fetch(`/api/claude/jobs/${job.id}`);
      const nextJob = await response.json();
      setJob(nextJob);
      if (nextJob.status === 'succeeded' || nextJob.status === 'failed') {
        window.clearInterval(id);
        await refreshAll();
      }
    }, 2000);

    return () => window.clearInterval(id);
  }, [job?.id, jobRunning]);

  async function generateToday() {
    setMessage('正在启动 Claude Code 生成/更新今日计划...');
    const response = await fetch('/api/claude/generate-today', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    const result = await response.json();
    await loadJob(result.jobId);
  }

  async function saveSubmission(payload: SubmissionPayload) {
    if (!daily?.exists) return;
    setMessage('正在保存完成记录到 Markdown...');
    await postJson(`/api/daily/${daily.date}/submission`, payload);
    setMessage('已保存完成记录。');
    await refreshAll();
  }

  async function submitAndCorrect(payload: SubmissionPayload) {
    if (!daily?.exists) return;
    setMessage('正在保存并启动 Claude Code 批改...');
    const result = await postJson(`/api/daily/${daily.date}/submit-and-correct`, payload);
    await loadJob(result.jobId);
  }

  async function loadJob(jobId: string) {
    const response = await fetch(`/api/claude/jobs/${jobId}`);
    setJob(await response.json());
  }

  const visibleSections = useMemo(() => {
    if (!daily?.exists) return [];
    return daily.sections.filter((section) => !['focus', 'correction'].includes(section.kind));
  }, [daily]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="kicker">English LLM Wiki</p>
          <h1>本地学习仪表盘</h1>
        </div>
        <nav>
          <button className={tab === 'today' ? 'active' : ''} onClick={() => setTab('today')}>今日学习</button>
          <button className={tab === 'progress' ? 'active' : ''} onClick={() => setTab('progress')}>进度总览</button>
        </nav>
      </header>

      <section className="toolbar">
        <button onClick={refreshAll} disabled={loading}>刷新</button>
        <button className="primary-button" onClick={generateToday} disabled={jobRunning}>生成/更新今日计划</button>
        <span>{message}</span>
        {job ? <span className={`job-pill job-${job.status}`}>Claude: {job.status}</span> : null}
      </section>

      {tab === 'today' ? (
        <div className="today-layout">
          {!daily ? <p>正在读取今日计划...</p> : !daily.exists ? (
            <section className="empty-state">
              <h2>今日计划还不存在</h2>
              <p>{daily.path}</p>
              <button className="primary-button" onClick={generateToday} disabled={jobRunning}>生成今日计划</button>
            </section>
          ) : (
            <>
              <DailyPlanCard daily={daily} />
              <section className="content-grid">
                <div className="section-stack">
                  {visibleSections.map((section) => <SectionCard key={`${section.kind}-${section.title}`} section={section} />)}
                </div>
                <aside className="side-panel">
                  <section className="panel">
                    <h2>填写完成记录</h2>
                    <p className="muted">保存后会写入 daily page 的 `UI completion submission`，不会破坏原 Markdown。</p>
                    <AnswerForm disabled={jobRunning} onSave={saveSubmission} onSubmitAndCorrect={submitAndCorrect} />
                  </section>
                  <CorrectionPanel daily={daily} />
                </aside>
              </section>
            </>
          )}
        </div>
      ) : progress ? (
        <ProgressSummary progress={progress} />
      ) : (
        <p>正在读取进度...</p>
      )}
    </main>
  );
}

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error ?? 'Request failed');
  }
  return result;
}
