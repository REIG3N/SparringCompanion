export type Session = {
  id: number,
  date: string;
  duration: string;
  environment: 0 | 1; // 0: Solo Practice, 1: Group with Sparring
  fatigue: number | null;
  fun: number | null;
  successType: number | null;
  successDomain: number | null;
  successDescription: string;
  difficultyType: number | null;
  difficultyDomain: number | null;
  difficultyDescription: string;
  notes: string;
  oppositionLevel: number | null;
  confidence: number | null;
};
