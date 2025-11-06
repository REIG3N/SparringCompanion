import { useEffect, useState } from 'react';
import i18n from '@/src/i18n';

export type CalendarDay = {
    label: string;
    hasSession?: boolean; 
    selected?: boolean 
  };

export function getDefaultCalendarDays(): CalendarDay[] {
  const days = i18n.t('dashboard.days', { defaultValue: ['M','T','W','T','F','S','S'] }) as unknown as string[];
  const labels = Array.isArray(days) ? days : ['M','T','W','T','F','S','S'];
  return labels.map((label, idx) => ({ label, hasSession: idx % 2 === 1, selected: idx === 6 }));
}

export default function useCalendarData() {
  const [days, setDays] = useState<CalendarDay[]>(getDefaultCalendarDays());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { days, setDays, isLoading, error };
}


