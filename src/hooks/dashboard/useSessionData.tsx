import { useState } from 'react';

export type Session = { title: string; subtitle: string; duration: string };

export default function useSessionData() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { sessions, setSessions, isLoading, error };
}


