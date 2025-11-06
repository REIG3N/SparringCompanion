import { useMemo } from 'react';
import type { Session } from '@/src/types/session';
import i18n from '@/src/i18n';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };

type Options = {
  weekStartsOn?: 0 | 1; // 0=dimanche, 1=lundi
};

function startOfWeek(d: Date, weekStartsOn: 0 | 1) {
  const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = date.getUTCDay();
  const diff = (day - weekStartsOn + 7) % 7;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

function toUTCDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function getDefaultStats(): Stat[] {
  return [
    { title: i18n.t('dashboard.stats.weekly_avg') as string, value: '0.0', change: '+0.0', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.enjoyment') as string, value: '0.0', change: '+0.0', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.confidence') as string, value: '0%', change: '+0%', changeType: 'positive' },
    { title: i18n.t('dashboard.stats.readiness') as string, value: '0%', change: '+0%', changeType: 'positive' },
  ];
}

export default function useStatsData(rawSessions: Session[] | undefined, opts: Options = { weekStartsOn: 1 }) {
  const stats = useMemo<Stat[]>(() => {
    if (!rawSessions || rawSessions.length === 0) return getDefaultStats();

    const weekStartsOn = opts.weekStartsOn ?? 1;
    const now = new Date();
    const thisWeekStart = startOfWeek(now, weekStartsOn);

    // 4 semaines: 0..1 = dernières 2 semaines, 2..3 = 2 semaines précédentes
    const weeksCount = 4;
    const buckets: Session[][] = Array.from({ length: weeksCount }, () => []);
    for (const s of rawSessions) {
      if (!s.date) continue;
      const d = toUTCDate(s.date);
      const dStart = startOfWeek(d, weekStartsOn);
      const deltaWeeks = Math.floor((thisWeekStart.getTime() - dStart.getTime()) / 604800000);
      if (deltaWeeks >= 0 && deltaWeeks < weeksCount) buckets[deltaWeeks].push(s);
    }

    const safeAvg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
    const pct = (n: number) => `${Math.round(n)}%`;
    const signed = (x: number, digits = 1) => `${x >= 0 ? '+' : ''}${x.toFixed(digits)}`;
    const signedPct = (x: number) => `${x >= 0 ? '+' : ''}${Math.round(x)}%`;

    const last2 = buckets.slice(0, 2).flat();
    const prev2 = buckets.slice(2, 4).flat();

    const avgLast2Weekly = (last2.length) / 2;
    const avgPrev2Weekly = (prev2.length) / 2;
    const dWeekly = avgLast2Weekly - avgPrev2Weekly;

    const avgFunLast2 = safeAvg(last2.map(s => s.fun ?? 0));
    const avgFunPrev2 = safeAvg(prev2.map(s => s.fun ?? 0));
    const dFun = avgFunLast2 - avgFunPrev2;

    const confPctLast2 = (safeAvg(last2.map(s => s.confidence ?? 0)) / 5) * 100;
    const confPctPrev2 = (safeAvg(prev2.map(s => s.confidence ?? 0)) / 5) * 100;
    const dConf = confPctLast2 - confPctPrev2;

    const fatigueLast2 = safeAvg(last2.map(s => s.fatigue ?? 0));
    const fatiguePrev2 = safeAvg(prev2.map(s => s.fatigue ?? 0));
    const readinessLast2 = Math.max(0, 100 - (fatigueLast2 / 5) * 100);
    const readinessPrev2 = Math.max(0, 100 - (fatiguePrev2 / 5) * 100);
    const dReadiness = readinessLast2 - readinessPrev2;

    return [
      { title: i18n.t('dashboard.stats.weekly_avg') as string, value: avgLast2Weekly.toFixed(1), change: signed(dWeekly), changeType: dWeekly >= 0 ? 'positive' : 'negative' },
      { title: i18n.t('dashboard.stats.enjoyment') as string, value: avgFunLast2.toFixed(1), change: signed(dFun), changeType: dFun >= 0 ? 'positive' : 'negative' },
      { title: i18n.t('dashboard.stats.confidence') as string, value: pct(confPctLast2), change: signedPct(dConf), changeType: dConf >= 0 ? 'positive' : 'negative' },
      { title: i18n.t('dashboard.stats.readiness') as string, value: pct(readinessLast2), change: signedPct(dReadiness), changeType: dReadiness >= 0 ? 'positive' : 'negative' },
    ];
  }, [rawSessions, opts.weekStartsOn]);

  return { stats, isLoading: false, error: null as Error | null };
}