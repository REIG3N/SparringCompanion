import { useState, useEffect } from 'react';
import { fetchSessions } from '@/src/repositories/sessionsRepository';
import { toListItem } from '@/src/mappers/sessionMappers';
import type { Session as DomainSession } from '@/src/types/session';

export type Session = { id? :number; title: string; subtitle: string; duration: string };


export default function useSessionData() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [rawSessions, setRawSessions] = useState<DomainSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetched = await fetchSessions();
        setRawSessions(fetched)
        setSessions(fetched.map(toListItem));
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSessions();
  }, []);

  return { sessions, setSessions,rawSessions, isLoading, error };
}


