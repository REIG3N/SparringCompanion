import { useEffect, useState } from 'react';

export type CalendarDay = {
    label: string;
    hasSession?: boolean; 
    selected?: boolean 
  };

// Expose a single source of truth for default days
export function getDefaultCalendarDays(): CalendarDay[] {
  return [
    { label: 'M', hasSession: false, selected: false },
    { label: 'T', hasSession: true, selected: false },
    { label: 'W', hasSession: false, selected: false },
    { label: 'T', hasSession: true, selected: false },
    { label: 'F', hasSession: false, selected: false },
    { label: 'S', hasSession: true, selected: true },
    { label: 'S', hasSession: false, selected: false },
  ];
}

export default function useCalendarData() {
  const [days, setDays] = useState<CalendarDay[]>(getDefaultCalendarDays());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // In case we later fetch from an API, we'll control loading here.

  return { days, setDays, isLoading, error };
}


