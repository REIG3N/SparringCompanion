import { useMemo } from 'react';

export default function useGoalProgress(goals: Array<{ completed?: boolean }>) {
  const progressPercent = useMemo(() => {
    if (!goals || goals.length === 0) return 0;
    const completed = goals.filter(g => g.completed).length;
    return Math.round((completed / goals.length) * 100);
  }, [goals]);

  return { progressPercent };
}


