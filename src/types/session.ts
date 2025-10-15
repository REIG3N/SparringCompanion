export type Session = {
  id: number,
  date: string;
  duration: string;
  environment: 0 | 1; // 0: Solo, 1: Group
  type: 0 | 1; // 0: Practice, 1: Sparring
  fatigue: number | null;
  fun: number | null;
  successType: number | null;
  successDomain: number | null;
  successDescription: string;
  difficultyType: number | null;
  difficultyDomain: number | null;
  difficultyDescription: string;
  notes: string;
  executionSuccess: number | null;
  oppositionLevel: number | null;
  consistency: number | null;
  confidence: number | null;
};
