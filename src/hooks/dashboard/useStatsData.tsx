import { useState } from 'react';

export type ChangeType = 'positive' | 'negative';
export type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };

export default function useStatsData() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { stats, setStats, isLoading, error };
}


