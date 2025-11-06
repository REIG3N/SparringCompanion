import { Session } from '@/src/types/session';
import { createEmptySession } from '@/src/mockdata/sessions.mock';
import { supabase } from '@/utils/supabase';
import { domainToDb, dbToDomain, storeIdMapping, getUuidFromNumericId } from './sessionDbMapper';

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

    const sessions = data.map((row) => {
      const domainSession = dbToDomain(row);
      storeIdMapping(domainSession.id, row.id);
      return domainSession;
    });

    return sessions;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return [];
  }
}

export async function fetchSessionById(id: number): Promise<Session | null> {
  try {
    const uuid = getUuidFromNumericId(id);
    if (!uuid) {
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

export async function createSession(session: Session): Promise<Session> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const dbPayload = domainToDb(session, user.id);

    const insertPayload = {
      ...dbPayload,
      user_id: user.id,
    };

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

    const createdSession = dbToDomain(data);
    storeIdMapping(createdSession.id, data.id);
    return createdSession;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

export async function updateSession(id: number, session: Session): Promise<Session> {
  try {
    const uuid = getUuidFromNumericId(id);
    if (!uuid) {
      throw new Error(`Session with id ${id} not found in cache`);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    const dbPayload = domainToDb(session, user.id);

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

    const updatedSession = dbToDomain(data);
    storeIdMapping(updatedSession.id, data.id);
    return updatedSession;
  } catch (error) {
    console.error('Failed to update session:', error);
    throw error;
  }
}

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

export function getEmptySession(): Session {
  return createEmptySession();
}
