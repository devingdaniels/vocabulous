export interface Word {
  id: string;
  term: string;
  definition: string;
  examples: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  lastPracticed?: Date;
  mastery: number; // 0-100
  tags: string[];
  createdAt: Date;
  userId: string;
}

export interface PracticeSession {
  id: string;
  userId: string;
  date: Date;
  wordsStudied: string[]; // Word IDs
  score: number;
  duration: number; // in seconds
}

export interface UserProgress {
  totalWords: number;
  masteredWords: number;
  practiceStreak: number;
  lastPracticeDate?: Date;
  averageScore: number;
}
