import { useState } from 'react';

export type Session = { title: string; subtitle: string; duration: string };

export function getDefaultSessions(): Session[] {
  return [
    { title: 'Today', subtitle: 'Head movement & defense', duration: '45 min' },
    { title: '2 days ago', subtitle: 'Combinations practice', duration: '60 min' },
    { title: '4 days ago', subtitle: 'Sparring session', duration: '30 min' },
    { title: '6 days ago', subtitle: 'Guard passing drills', duration: '35 min' },
    { title: '1 week ago', subtitle: 'Open mat rolls', duration: '75 min' },
    { title: '8 days ago', subtitle: 'Leg lock entries', duration: '50 min' },
    { title: '10 days ago', subtitle: 'Grip fighting focus', duration: '55 min' },
    { title: '12 days ago', subtitle: 'Back control escapes', duration: '40 min' },
    { title: '13 days ago', subtitle: 'Takedown practice', duration: '60 min' },
    { title: '15 days ago', subtitle: 'Kimura setups', duration: '30 min' },
    { title: '18 days ago', subtitle: 'No-gi transitions', duration: '40 min' },
    { title: '20 days ago', subtitle: 'Mount retention', duration: '35 min' },
];

}

export default function useSessionData() {
  const [sessions, setSessions] = useState<Session[]>(getDefaultSessions());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { sessions, setSessions, isLoading, error };
}


