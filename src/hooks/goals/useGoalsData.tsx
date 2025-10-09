import { useState } from 'react';

export default function useGoalsData() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return { goals, setGoals, isLoading, error };
}


