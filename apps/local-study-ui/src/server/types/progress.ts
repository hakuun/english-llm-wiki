export type ProgressSummary = {
  daily: {
    total: number;
    planned: number;
    submitted: number;
    corrected: number;
    recent: Array<{
      date: string;
      title: string;
      status: string;
      focus: string | null;
      path: string;
    }>;
  };
  vocabulary: {
    weak: number;
    active: number;
    review: number;
    mastered: number;
    weakItems: Array<Record<string, string>>;
  };
  errors: {
    active: Array<{
      title: string;
      pattern?: string;
      correction?: string;
      lastSeen?: string;
    }>;
  };
  weakPoints: Array<{
    title: string;
    evidence?: string;
    nextAction?: string;
  }>;
  log: {
    recent: Array<{
      date: string;
      category: string;
      title: string;
      body: string;
    }>;
  };
};
