import { Session } from '@/src/types/session';

/**
 * Database row type from Supabase sessions table
 */
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

/**
 * Convert a UUID string to a numeric hash for domain ID
 * This allows us to keep the domain Session.id as number
 */
function uuidToNumber(uuid: string): number {
  // Simple hash: sum of character codes modulo a large number
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Return positive number
  return Math.abs(hash);
}

/**
 * Convert domain Session to database payload
 */
export function domainToDb(session: Session, userId: string): Omit<DbSessionRow, 'id' | 'user_id' | 'created_at' | 'updated_at'> {
  // Build success JSONB object
  const success = (session.successType !== null || session.successDomain !== null || session.successDescription) 
    ? {
        successType: session.successType,
        successDomain: session.successDomain,
        successDescription: session.successDescription || '',
      }
    : null;

  // Build difficulty JSONB object
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

/**
 * Convert database row to domain Session
 */
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

/**
 * Store UUID to numeric ID mapping for reverse lookup
 * This is needed for UPDATE and DELETE operations
 */
const uuidToNumericIdMap = new Map<number, string>();

/**
 * Store a mapping from numeric ID to UUID
 */
export function storeIdMapping(numericId: number, uuid: string): void {
  uuidToNumericIdMap.set(numericId, uuid);
}

/**
 * Get UUID from numeric ID
 */
export function getUuidFromNumericId(numericId: number): string | null {
  return uuidToNumericIdMap.get(numericId) || null;
}

/**
 * Clear all ID mappings (useful on logout)
 */
export function clearIdMappings(): void {
  uuidToNumericIdMap.clear();
}

