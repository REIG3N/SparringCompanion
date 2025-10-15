import { useState, useMemo } from 'react';
import useCalendarData, { getDefaultCalendarDays } from './useCalendarData';
import useStatsData, { getDefaultStats } from './useStatsData';
import useSessionData from './useSessionData';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };
export type Session = { title: string; subtitle: string; duration: string };
export type Day = { label: string; hasSession?: boolean; selected?: boolean };
export type UIState = 'normal' | 'loading' | 'empty' | 'error';

// Default/mock data (could be replaced by API data in the future)


// Helper to derive UI state from data
function deriveStateFromData(
  stats: Stat[],
  sessions: Session[],
  days: Day[],
  isLoading: boolean,
): UIState {
  if (isLoading) return 'loading';

  const statsInvalid = !Array.isArray(stats) 
    || stats.some(s => typeof s.title !== 'string' 
    || typeof s.value !== 'string');
  const sessionsInvalid = !Array.isArray(sessions) 
    || sessions.some(s => typeof s.title !== 'string' 
    || typeof s.subtitle !== 'string');
  const daysInvalid = !Array.isArray(days)
    || days.some(d => typeof d.label !== 'string')
    || days.filter(d => d.selected === true).length !== 1;
  if (statsInvalid || sessionsInvalid || daysInvalid) return 'error';

  const isAllEmpty = (stats.length === 0 || stats.every(s => !s.value))
    && (sessions.length === 0)
    && (days.length === 0 || days.every(d => !d.hasSession));
  if (isAllEmpty) return 'empty';
  return 'normal';
}

export default function useDashboardData() {
  // In a real app, these would be fetched from an API or sub-hooks
  const [isLoading, setIsLoading] = useState(false);
  const { stats, setStats } = useStatsData();
  const {sessions, setSessions} = useSessionData();
  const { days, setDays } = useCalendarData();

  const mode: UIState = useMemo(
    () => deriveStateFromData(stats, sessions, days, isLoading),
    [stats, sessions, days, isLoading]
  );

  const toNormal = () => {
    setIsLoading(false);
    setStats(getDefaultStats());
    setSessions([]);
    setDays(getDefaultCalendarDays());
  };

  const toEmpty = () => {
    setIsLoading(false);
    setStats(prev => prev.map(s => ({ ...s, value: '', change: undefined })));
    setSessions([]);
    setDays(prev => prev.map(d => ({ ...d, hasSession: false })));
  };

  const toError = () => {
    setIsLoading(false);
    setDays(prev => prev.map(d => ({ ...d, selected: false })));
  };

  // This hook returns the dashboard data, UI state, and setters so that screens/components can consume and update them.
  // Example usage in a screen:
  //   const { mode, stats, sessions, days, isLoading, setIsLoading, setStats, setSessions, setDays } = useDashboardData();
  // The screen can then render UI based on `mode` and display or update the dashboard data as needed.

  return {
    mode,         // UI state: 'normal', 'loading', 'empty', or 'error'
    stats,        // Array of Stat objects for stat cards
    sessions,     // Array of Session objects for recent sessions
    days,         // Array of Day objects for the calendar week
    isLoading,    // Loading flag
    setIsLoading, // Setter to toggle loading state
    setStats,     // Setter to update stats
    setSessions,  // Setter to update sessions
    setDays,      // Setter to update days
    toNormal,
    toEmpty,
    toError,
  };
}

/*
Explanation:

- This hook encapsulates the dashboard's data and UI state logic.
- It manages local state for stats, sessions, days, and loading, using mock data for now.
- The `deriveStateFromData` function determines the UI state ('normal', 'loading', 'empty', 'error') based on the current data and loading flag, matching the logic from the DashboardScreen.
- The hook returns the current mode, data, and setters, so the UI can both display and manipulate dashboard state.
- This structure makes it easy to later replace the mock data with real API calls or split out sub-hooks for each data type.
*/
