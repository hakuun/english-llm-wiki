export type SectionKind =
  | 'focus'
  | 'review'
  | 'warmup'
  | 'input'
  | 'comprehension'
  | 'vocabulary'
  | 'grammar'
  | 'output'
  | 'speaking'
  | 'stuck'
  | 'completion'
  | 'submission'
  | 'correction'
  | 'unknown';

export type DailySection = {
  id: string;
  title: string;
  kind: SectionKind;
  markdown: string;
};

export type DailyPlan = {
  exists: true;
  date: string;
  path: string;
  frontmatter: Record<string, unknown>;
  title: string;
  status: 'planned' | 'submitted' | 'corrected' | 'unknown';
  sections: DailySection[];
  submission: string | null;
  correction: {
    exists: boolean;
    isCorrected: boolean;
    markdown: string | null;
  };
  focusSummary: string | null;
};

export type MissingDailyPlan = {
  exists: false;
  date: string;
  path: string;
};

export type DailyResponse = DailyPlan | MissingDailyPlan;
