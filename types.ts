
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  tags: string[];
  createdAt: number;
  aiSummary?: string;
  aiChapters?: string[];
}

export type ViewMode = 'grid' | 'list';

export interface AIAnalysis {
  summary: string;
  suggestedTags: string[];
  potentialChapters: string[];
  sentiment: string;
}
