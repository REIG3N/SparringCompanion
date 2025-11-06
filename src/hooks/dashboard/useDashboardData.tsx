import { useState, useMemo } from 'react';
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

function getDayLabelFromISO(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const day = dt.getUTCDay(); // 0=Sun ... 6=Sat
  const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return labels[day] ?? '';
}

function formatDateUTC(date: Date): string {
  const y = date.getUTCFullYear();
  const m = `${date.getUTCMonth() + 1}`.padStart(2, '0');
  const d = `${date.getUTCDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function useDashboardData() {
  const [isLoading, setIsLoading] = useState(false);
  const { sessions, setSessions, rawSessions, isLoading: sessionsLoading } = useSessionData();

  const { stats } = useStatsData(rawSessions, { weekStartsOn: 1 });

  const days: Day[] = useMemo(() => {
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const dates: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayUTC);
      d.setUTCDate(todayUTC.getUTCDate() - i);
      dates.push(formatDateUTC(d));
    }

    const sessionDates = new Set((rawSessions ?? []).map(s => s.date));

    return dates.map((dateStr, idx) => {
      const isToday = dateStr === formatDateUTC(todayUTC);
      return {
        label: getDayLabelFromISO(dateStr),
        hasSession: sessionDates.has(dateStr),
        selected: isToday,
      } as Day;
    });
  }, [rawSessions?.length]);

  const mode: UIState = useMemo(
    () => deriveStateFromData(stats, sessions, days, isLoading || sessionsLoading),
    [stats, sessions, days, isLoading, sessionsLoading]
  );

  const toNormal = () => {
    setIsLoading(false);
  };

  const toEmpty = () => {
    setIsLoading(false);
    setSessions([]);
  };

  const toError = () => {
    setIsLoading(false);
  };

  return {
    mode,
    stats,
    sessions,
    days,
    isLoading,
    setIsLoading,
    setSessions,
    toNormal,
    toEmpty,
    toError,
  };
}
