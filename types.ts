export interface Sutra {
  id: string;
  sanskritName: string;
  englishTranslation: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  colorClass: string;
}

export interface PuzzleData {
  question: string;
  answer: number;
  sutraUsed: string;
  explanation: string;
  steps: string[];
  hint: string;
}

export interface AppState {
  view: 'MENU' | 'PUZZLE';
  selectedSutra: Sutra | null;
  score: number;
  streak: number;
}