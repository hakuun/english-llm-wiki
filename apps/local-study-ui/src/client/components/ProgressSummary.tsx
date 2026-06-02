import type { ProgressSummaryData } from '../types.js';

export function ProgressSummary({ progress }: { progress: ProgressSummaryData }) {
  return (
    <div className="progress-layout">
      <section className="panel metric-panel">
        <h2>学习进度</h2>
        <div className="metric-grid">
          <Metric label="Daily pages" value={progress.daily.total} />
          <Metric label="待学习" value={progress.daily.planned} />
          <Metric label="已提交" value={progress.daily.submitted} />
          <Metric label="已批改" value={progress.daily.corrected} />
        </div>
        <div className="recent-list">
          {progress.daily.recent.map((item) => (
            <div key={item.date} className="recent-item">
              <strong>{item.date}</strong>
              <span>{item.status}</span>
              <p>{item.focus ?? item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>弱词复习</h2>
        <p className="muted">weak: {progress.vocabulary.weak} · active: {progress.vocabulary.active}</p>
        <div className="tag-list">
          {progress.vocabulary.weakItems.map((item) => (
            <span className="word-chip" key={item.word}>{item.word}<small>{item.phrase}</small></span>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>活跃错误</h2>
        {progress.errors.active.map((item) => (
          <article className="compact-card" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.correction}</p>
            {item.lastSeen ? <small>Last seen: {item.lastSeen}</small> : null}
          </article>
        ))}
      </section>

      <section className="panel">
        <h2>当前弱点</h2>
        {progress.weakPoints.map((item) => (
          <article className="compact-card" key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.nextAction ?? item.evidence}</p>
          </article>
        ))}
      </section>

      <section className="panel log-panel">
        <h2>最近日志</h2>
        {progress.log.recent.map((item) => (
          <article className="compact-card" key={`${item.date}-${item.category}-${item.title}`}>
            <strong>{item.date} · {item.category}</strong>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
