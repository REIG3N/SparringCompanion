import { useEffect, useState } from 'react';

export type CalendarDay = { label: string; hasSession?: boolean; selected?: boolean };

export default function useCalendarData() {
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initialize with mock data for now. Replace with API call later.
    const mockCalendarDays: CalendarDay[] = [
      { label: 'M', hasSession: false, selected: false },
      { label: 'T', hasSession: true, selected: false },
      { label: 'W', hasSession: false, selected: false },
      { label: 'T', hasSession: true, selected: false },
      { label: 'F', hasSession: false, selected: false },
      { label: 'S', hasSession: true, selected: true },
      { label: 'S', hasSession: false, selected: false },
    ];
    setDays(mockCalendarDays);
  }, []);

  return { days, setDays, isLoading, error };
}


