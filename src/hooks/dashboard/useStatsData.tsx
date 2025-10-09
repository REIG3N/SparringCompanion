import { useState } from 'react';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };

export function getDefaultStats(): Stat[] {
  return [
    { title: 'Weekly Avg', value: '3.2', change: '+0.5', changeType: 'positive' },
    { title: 'Fun Score', value: '4.5', change: '+0.3', changeType: 'positive' },
    { title: 'Progression', value: '78%', change: '+12%', changeType: 'positive' },
    { title: 'Readiness', value: '85%', change: '-5%', changeType: 'negative' },
  ];
}

export default function useStatsData() {
  const [stats, setStats] = useState<Stat[]>(getDefaultStats());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { stats, setStats, isLoading, error };
}




