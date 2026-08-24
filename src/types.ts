export interface TopikFileItem {
  title: string;
  type: 'question' | 'answer' | 'audio' | 'transcript' | 'writing';
  url: string;
}

export interface TopikPaper {
  id: string;
  session: string;
  level: 'TOPIK I' | 'TOPIK II' | 'Both';
  year: string;
  date: string;
  downloadsCount: number;
  questionPdfUrl: string;
  answerPdfUrl: string;
  audioUrl?: string;
  files?: TopikFileItem[];
  isComingSoon?: boolean;
}

export interface Textbook {
  id: string;
  title: string;
  level: 'Level 1 (Beginner)' | 'Level 2 (Elementary)' | 'Level 3 (Intermediate)' | 'Level 4 (Advanced)' | 'All Levels';
  category: string;
  description: string;
  pages: string;
  downloadsCount: number;
  downloadUrl: string;
  coverImageUrl?: string;
  coverStyle: 'rose' | 'lavender' | 'sage' | 'amber' | 'sky' | 'yellow' | 'routledge' | 'billygo' | 'billygo2' | 'billygo3';
}

export type ActiveTab = 'topik' | 'textbooks';
export type TextbookFilter = 'All' | 'Level 1 (Beginner)' | 'Level 2 (Elementary)' | 'Level 3 (Intermediate)' | 'Level 4 (Advanced)';
export type TopikFilter = 'All' | 'TOPIK I' | 'TOPIK II';
