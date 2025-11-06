import { Session } from '@/src/types/session';

export type DbSessionRow = {
  id: string; // UUID
  user_id: string; // UUID
  date: string; // ISO date string (YYYY-MM-DD)
  duration: number; // integer minutes
  environment: number; // 0 or 1
  fatigue: number | null;
  fun: number | null;
  confidence: number | null;
  opposition_level: number | null;
  notes: string | null;
  success: {
    successType: number | null;
    successDomain: number | null;
    successDescription: string;
  } | null;
  difficulty: {
    difficultyType: number | null;
    difficultyDomain: number | null;
    difficultyDescription: string;
  } | null;
  created_at: string;
  updated_at: string;
};

function uuidToNumber(uuid: string): number {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function domainToDb(session: Session, userId: string): Omit<DbSessionRow, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  const success = (session.successType !== null || session.successDomain !== null || session.successDescription) 
    ? {
        successType: session.successType,
        successDomain: session.successDomain,
        successDescription: session.successDescription || '',
      }
    : null;

  const difficulty = (session.difficultyType !== null || session.difficultyDomain !== null || session.difficultyDescription)
    ? {
        difficultyType: session.difficultyType,
        difficultyDomain: session.difficultyDomain,
        difficultyDescription: session.difficultyDescription || '',
      }
    : null;

  return {
    date: session.date,
    duration: parseInt(session.duration, 10) || 0,
    environment: session.environment,
    fatigue: session.fatigue,
    fun: session.fun,
    confidence: session.confidence,
    opposition_level: session.oppositionLevel,
    notes: session.notes || null,
    success,
    difficulty,
  };
}

export function dbToDomain(row: DbSessionRow): Session {
  return {
    id: uuidToNumber(row.id),
    date: row.date,
    duration: row.duration.toString(),
    environment: row.environment as 0 | 1,
    fatigue: row.fatigue,
    fun: row.fun,
    confidence: row.confidence,
    successType: row.success?.successType ?? null,
    successDomain: row.success?.successDomain ?? null,
    successDescription: row.success?.successDescription ?? '',
    difficultyType: row.difficulty?.difficultyType ?? null,
    difficultyDomain: row.difficulty?.difficultyDomain ?? null,
    difficultyDescription: row.difficulty?.difficultyDescription ?? '',
    notes: row.notes || '',
    oppositionLevel: row.opposition_level,
  };
}

const uuidToNumericIdMap = new Map<number, string>();

export function storeIdMapping(numericId: number, uuid: string): void {
  uuidToNumericIdMap.set(numericId, uuid);
}

export function getUuidFromNumericId(numericId: number): string | null {
  return uuidToNumericIdMap.get(numericId) || null;
}

export function clearIdMappings(): void {
  uuidToNumericIdMap.clear();
}

