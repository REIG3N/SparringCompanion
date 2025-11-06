import { useMemo } from 'react';
import type { Session } from '@/src/types/session';
import i18n, { useLanguage } from '@/src/i18n';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };

type Options = {
  weekStartsOn?: 0 | 1;
};

function toUTCDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function getSessionsInDateRange(sessions: Session[], startDate: Date, endDate: Date): Session[] {
  return sessions.filter(s => {
    if (!s.date) return false;
    const sessionDate = toUTCDate(s.date);
    return sessionDate >= startDate && sessionDate <= endDate;
  });
}

function safeMedian(values: (number | null)[]): number | null {
  const validValues = values.filter((v): v is number => v !== null && !isNaN(v)).sort((a, b) => a - b);
  if (validValues.length === 0) return null;
  const mid = Math.floor(validValues.length / 2);
  if (validValues.length % 2 === 0) {
    return (validValues[mid - 1] + validValues[mid]) / 2;
  }
  return validValues[mid];
}

function safeAvg(values: (number | null)[]): number | null {
  const validValues = values.filter((v): v is number => v !== null && !isNaN(v));
  if (validValues.length === 0) return null;
  return validValues.reduce((a, b) => a + b, 0) / validValues.length;
}

function safeCentralTendency(values: (number | null)[], useMedian: boolean): number | null {
  return useMedian ? safeMedian(values) : safeAvg(values);
}

function formatStatValue(value: number | null, unit: 'count' | 'rating'): string {
  if (value === null) return '—';
  if (unit === 'count') {
    return Math.round(value).toString();
  }
  return `${value.toFixed(1)}/5`;
}

function formatChange(delta: number | null, unit: 'count' | 'rating'): string {
  if (delta === null || isNaN(delta)) return '—';
  if (unit === 'count') {
    return `${delta >= 0 ? '+' : ''}${Math.round(delta)}`;
  }
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}`;
}

export function getDefaultStats(): Stat[] {
  return [
    { title: i18n.t('dashboard.stats.sessions_7d') as string, value: '0', change: '+0', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.enjoyment') as string, value: '0.0/5', change: '+0.0', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.confidence') as string, value: '0.0/5', change: '+0.0', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.readiness') as string, value: '0.0/5', change: '+0.0', changeType: 'positive' },
  ];
}

export default function useStatsData(rawSessions: Session[] | undefined, opts: Options = { weekStartsOn: 1 }) {
  const { language } = useLanguage();
  const stats = useMemo<Stat[]>(() => {
    if (!rawSessions || rawSessions.length === 0) return getDefaultStats();

    const totalSessions = rawSessions.length;
    const useMedian = totalSessions < 10;

    const now = new Date();
    const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    
    const last7End = new Date(todayUTC);
    const last7Start = new Date(todayUTC);
    last7Start.setUTCDate(todayUTC.getUTCDate() - 6);
    last7Start.setUTCHours(0, 0, 0, 0);
    last7End.setUTCHours(23, 59, 59, 999);

    const prev7End = new Date(last7Start);
    prev7End.setUTCDate(prev7End.getUTCDate() - 1);
    prev7End.setUTCHours(23, 59, 59, 999);
    const prev7Start = new Date(prev7End);
    prev7Start.setUTCDate(prev7Start.getUTCDate() - 6);
    prev7Start.setUTCHours(0, 0, 0, 0);

    const last7Sessions = getSessionsInDateRange(rawSessions, last7Start, last7End);
    const prev7Sessions = getSessionsInDateRange(rawSessions, prev7Start, prev7End);

    const sessionsLast7 = last7Sessions.length;
    const sessionsPrev7 = prev7Sessions.length;
    const dSessions = sessionsLast7 - sessionsPrev7;
    const sessionsValue = formatStatValue(sessionsLast7, 'count');
    const sessionsChange = formatChange(dSessions, 'count');
    const sessionsChangeType: ChangeType | undefined = sessionsChange !== '—' ? (dSessions >= 0 ? 'positive' : 'negative') : undefined;

    const funLast7 = safeCentralTendency(last7Sessions.map(s => s.fun), useMedian);
    const funPrev7 = safeCentralTendency(prev7Sessions.map(s => s.fun), useMedian);
    const dFun = funLast7 !== null && funPrev7 !== null ? funLast7 - funPrev7 : null;
    const enjoymentValue = formatStatValue(funLast7, 'rating');
    const enjoymentChange = formatChange(dFun, 'rating');
    const enjoymentChangeType: ChangeType | undefined = enjoymentChange !== '—' ? (dFun !== null && dFun >= 0 ? 'positive' : 'negative') : undefined;

    const confLast7 = safeCentralTendency(last7Sessions.map(s => s.confidence), useMedian);
    const confPrev7 = safeCentralTendency(prev7Sessions.map(s => s.confidence), useMedian);
    const dConf = confLast7 !== null && confPrev7 !== null ? confLast7 - confPrev7 : null;
    const confidenceValue = formatStatValue(confLast7, 'rating');
    const confidenceChange = formatChange(dConf, 'rating');
    const confidenceChangeType: ChangeType | undefined = confidenceChange !== '—' ? (dConf !== null && dConf >= 0 ? 'positive' : 'negative') : undefined;

    const fatigueLast7 = safeCentralTendency(last7Sessions.map(s => s.fatigue), useMedian);
    const fatiguePrev7 = safeCentralTendency(prev7Sessions.map(s => s.fatigue), useMedian);
    const readinessLast7 = fatigueLast7 !== null ? Math.max(0, Math.min(5, 5 - fatigueLast7)) : null;
    const readinessPrev7 = fatiguePrev7 !== null ? Math.max(0, Math.min(5, 5 - fatiguePrev7)) : null;
    const dReadiness = readinessLast7 !== null && readinessPrev7 !== null ? readinessLast7 - readinessPrev7 : null;
    const readinessValue = formatStatValue(readinessLast7, 'rating');
    const readinessChange = formatChange(dReadiness, 'rating');
    const readinessChangeType: ChangeType | undefined = readinessChange !== '—' ? (dReadiness !== null && dReadiness >= 0 ? 'positive' : 'negative') : undefined;

    return [
      { 
        title: i18n.t('dashboard.stats.sessions_7d') as string, 
        value: sessionsValue, 
        change: sessionsChange, 
        changeType: sessionsChangeType 
      },
      { 
        title: i18n.t('dashboard.stats.enjoyment') as string, 
        value: enjoymentValue, 
        change: enjoymentChange, 
        changeType: enjoymentChangeType 
      },
      { 
        title: i18n.t('dashboard.stats.confidence') as string, 
        value: confidenceValue, 
        change: confidenceChange, 
        changeType: confidenceChangeType 
      },
      { 
        title: i18n.t('dashboard.stats.readiness') as string, 
        value: readinessValue, 
        change: readinessChange, 
        changeType: readinessChangeType 
      },
    ];
  }, [rawSessions, opts.weekStartsOn, language]);

  return { stats, isLoading: false, error: null as Error | null };
}