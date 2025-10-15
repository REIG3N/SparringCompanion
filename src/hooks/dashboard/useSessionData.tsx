import { useState, useEffect } from 'react';
import { fetchSessions } from '@/src/repositories/sessionsRepository';
import { toListItem } from '@/src/mappers/sessionMappers';

export type Session = { id? :number; title: string; subtitle: string; duration: string };


export default function useSessionData() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const rawSessions = await fetchSessions();
        const mappedSessions = rawSessions.map(toListItem);
        setSessions(mappedSessions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, []);

  return { sessions, setSessions, isLoading, error };
}


