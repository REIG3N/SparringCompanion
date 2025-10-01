import { useState, useMemo } from 'react';

// Types for dashboard data
export type ChangeType = 'positive' | 'negative';

export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };
export type Session = { title: string; subtitle: string; duration: string };
export type Day = { label: string; hasSession?: boolean; selected?: boolean };
export type UIState = 'normal' | 'loading' | 'empty' | 'error';

// Default/mock data (could be replaced by API data in the future)
const DEFAULT_DAYS:  Day[] = [
  { label: 'M', hasSession: false, selected: false },
  { label: 'T', hasSession: true, selected: false },
  { label: 'W', hasSession: false, selected: false },
  { label: 'T', hasSession: true, selected: false },
  { label: 'F', hasSession: false, selected: false },
  { label: 'S', hasSession: true, selected: true },
  { label: 'S', hasSession: false, selected: false },
];

const DEFAULT_STATS: Stat[] = [
  { title: 'Weekly Avg', value: '3.2', change: '+0.5', changeType: 'positive' },
  { title: 'Fun Score', value: '4.5', change: '+0.3', changeType: 'positive' },
  { title: 'Progression', value: '78%', change: '+12%', changeType: 'positive' },
  { title: 'Readiness', value: '85%', change: '-5%', changeType: 'negative' },
];

const DEFAULT_SESSIONS: Session[] = [
  { title: 'Today', subtitle: 'Head movement & defense', duration: '45 min' },
  { title: '2 days ago', subtitle: 'Combinations practice', duration: '60 min' },
  { title: '4 days ago', subtitle: 'Sparring session', duration: '30 min' },
];

// Helper to derive UI state from data
// Note: After testing, you can remove "| null | undefined" from the types to activate different UI states for the user.
function deriveStateFromData(
  stats: Stat[] | null | undefined,
  sessions: Session[] | null | undefined,
  days: Day[] | null | undefined,
  isLoading: boolean,
): UIState {
  if (isLoading) return 'loading';

  const statsInvalid = !Array.isArray(stats) || stats.some(s => typeof s.title !== 'string' || typeof s.value !== 'string');
  const sessionsInvalid = !Array.isArray(sessions) || sessions.some(s => typeof s.title !== 'string' || typeof s.subtitle !== 'string');
  const daysInvalid = !Array.isArray(days) || days.some(d => typeof d.label !== 'string');
  if (statsInvalid || sessionsInvalid || daysInvalid) return 'error';

  const isAllEmpty = (stats.length === 0 || stats.every(s => !s.value))
    && (sessions.length === 0)
    && (days.length === 0 || days.every(d => !d.hasSession));
  if (isAllEmpty) return 'empty';
  return 'normal';
}

// Main dashboard hook - Orchestrator
export default function useDashboardData() {
  // In a real app, these would be fetched from an API or sub-hooks
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<Stat[] | null>([...DEFAULT_STATS]);
  const [sessions, setSessions] = useState<Session[] | null>([...DEFAULT_SESSIONS]);
  const [days, setDays] = useState<Day[] | null>([...DEFAULT_DAYS]);

  // Derive UI state based on data and loading
  const mode: UIState = useMemo(
    () => deriveStateFromData(stats, sessions, days, isLoading),
    [stats, sessions, days, isLoading]
  );

  // Transition helpers for testing/demo
  const toNormal = () => {
    setIsLoading(false);
    setStats([...DEFAULT_STATS]);
    setSessions([...DEFAULT_SESSIONS]);
    setDays([...DEFAULT_DAYS]);
  };

  const toEmpty = () => {
    setIsLoading(false);
    setStats(prev => (prev ? prev.map(s => ({ ...s, value: '', change: undefined })) : []));
    setSessions([]);
    setDays(prev => (prev ? prev.map(d => ({ ...d, hasSession: false })) : []));
  };

  const toError = () => {
    setIsLoading(false);
    // Intentionally set invalid data shape to trigger 'error'
    setStats([{ title: null as unknown as string, value: 'x' } as unknown as Stat]);
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

