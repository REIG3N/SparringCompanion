import { useState, useMemo } from 'react';
import useCalendarData, { getDefaultCalendarDays } from './useCalendarData';
import useStatsData from './useStatsData';
import useSessionData from './useSessionData';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };
export type Session = { title: string; subtitle: string; duration: string };
export type Day = { label: string; hasSession?: boolean; selected?: boolean };
export type UIState = 'normal' | 'loading' | 'empty' | 'error';

function deriveStateFromData(
  stats: Stat[],
  sessions: Session[],
  days: Day[],
  isLoading: boolean,
): UIState {
  if (isLoading) return 'loading';
  const daysInvalid = !Array.isArray(days)
    || days.some(d => typeof d.label !== 'string')
    || days.filter(d => d.selected === true).length !== 1;
  if (daysInvalid) return 'error';
  const isAllEmpty = (stats.length === 0 || stats.every(s => !s.value))
    && (sessions.length === 0)
    && (days.length === 0 || days.every(d => !d.hasSession));
  if (isAllEmpty) return 'empty';
  return 'normal';
}

export default function useDashboardData() {
  const [isLoading, setIsLoading] = useState(false);
  const { sessions, setSessions, rawSessions, isLoading: sessionsLoading } = useSessionData();
  const { days, setDays } = useCalendarData();

  const { stats } = useStatsData(rawSessions, { weekStartsOn: 1 });

  const mode: UIState = useMemo(
    () => deriveStateFromData(stats, sessions, days, isLoading || sessionsLoading),
    [stats, sessions, days, isLoading, sessionsLoading]
  );

  const toNormal = () => {
    setIsLoading(false);
    setDays(getDefaultCalendarDays());
  };

  const toEmpty = () => {
    setIsLoading(false);
    setSessions([]);
    setDays(prev => prev.map(d => ({ ...d, hasSession: false })));
  };

  const toError = () => {
    setIsLoading(false);
    setDays(prev => prev.map(d => ({ ...d, selected: false })));
  };

  return {
    mode,
    stats,
    sessions,
    days,
    isLoading,
    setIsLoading,
    setSessions,
    setDays,
    toNormal,
    toEmpty,
    toError,
  };
}
