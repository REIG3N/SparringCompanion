import { Session } from '@/src/types/session';
import { createEmptySession } from '@/src/mockdata/sessions.mock';
import { supabase } from '@/utils/supabase';
import { domainToDb, dbToDomain, storeIdMapping, getUuidFromNumericId } from './sessionDbMapper';

/**
 * Fetch all sessions for the current user from Supabase
 */
export async function fetchSessions(): Promise<Session[]> {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Convert DB rows to domain sessions and store ID mappings
    const sessions = data.map((row) => {
      const domainSession = dbToDomain(row);
      storeIdMapping(domainSession.id, row.id);
      return domainSession;
    });

    return sessions;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    // Return empty array on error to prevent UI breakage
    return [];
  }
}

/**
 * Fetch a single session by numeric ID
 */
export async function fetchSessionById(id: number): Promise<Session | null> {
  try {
    const uuid = getUuidFromNumericId(id);
    if (!uuid) {
      // If UUID not found in cache, try to fetch all and find it
      const allSessions = await fetchSessions();
      const found = allSessions.find(s => s.id === id);
      return found ?? null;
    }

    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', uuid)
      .single();

    if (error) {
      console.error('Error fetching session by id:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    const domainSession = dbToDomain(data);
    storeIdMapping(domainSession.id, data.id);
    return domainSession;
  } catch (error) {
    console.error('Failed to fetch session by id:', error);
    return null;
  }
}

/**
 * Create a new session in Supabase
 */
export async function createSession(session: Session): Promise<Session> {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Convert domain session to DB payload
    const dbPayload = domainToDb(session, user.id);

    // Include user_id in the insert payload (required for RLS policy)
    const insertPayload = {
      ...dbPayload,
      user_id: user.id,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from('sessions')
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from insert');
    }

    // Convert back to domain and store ID mapping
    const createdSession = dbToDomain(data);
    storeIdMapping(createdSession.id, data.id);
    return createdSession;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

/**
 * Update an existing session in Supabase
 */
export async function updateSession(id: number, session: Session): Promise<Session> {
  try {
    const uuid = getUuidFromNumericId(id);
    if (!uuid) {
      throw new Error(`Session with id ${id} not found in cache`);
    }

    // Get current user to ensure ownership
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Convert domain session to DB payload (only changed fields)
    const dbPayload = domainToDb(session, user.id);

    // Update in Supabase
    const { data, error } = await supabase
      .from('sessions')
      .update(dbPayload)
      .eq('id', uuid)
      .select()
      .single();

    if (error) {
      console.error('Error updating session:', error);
      throw error;
    }

    if (!data) {
      throw new Error('No data returned from update');
    }

    // Convert back to domain
    const updatedSession = dbToDomain(data);
    storeIdMapping(updatedSession.id, data.id);
    return updatedSession;
  } catch (error) {
    console.error('Failed to update session:', error);
    throw error;
  }
}

/**
 * Delete a session from Supabase
 */
export async function deleteSession(id: number): Promise<boolean> {
  try {
    const uuid = getUuidFromNumericId(id);
    if (!uuid) {
      console.error(`Session with id ${id} not found in cache`);
      return false;
    }

    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', uuid);

    if (error) {
      console.error('Error deleting session:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to delete session:', error);
    return false;
  }
}

/**
 * Get an empty session template
 */
export function getEmptySession(): Session {
  return createEmptySession();
}
