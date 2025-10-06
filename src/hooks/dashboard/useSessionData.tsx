import { useState } from 'react';

export type Session = { title: string; subtitle: string; duration: string };

export function getDefaultSessions(): Session[] {
  return [
    { title: 'Today', subtitle: 'Head movement & defense', duration: '45 min' },
    { title: '2 days ago', subtitle: 'Combinations practice', duration: '60 min' },
    { title: '4 days ago', subtitle: 'Sparring session', duration: '30 min' },
];

}

export default function useSessionData() {
  const [sessions, setSessions] = useState<Session[]>(getDefaultSessions());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { sessions, setSessions, isLoading, error };
}


