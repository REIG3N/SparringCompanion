import { useEffect } from 'react';
import { getEmptySession } from '@/src/repositories/sessionsRepository';

type SessionFormData = Record<string, any>;

type SessionFormDataProps = {
  initialData: any;
  formData: SessionFormData;
  setFormData: (updater: any) => void;
  setHadSparring: (value: boolean) => void;
  onCompletionChange?: (isComplete: boolean) => void;
  onFormDataChange?: (data: SessionFormData) => void;
  isAllTabsComplete: boolean;
};

export function usePostSessionEffects({
  initialData,
  formData,
  setFormData,
  setHadSparring,
  onCompletionChange,
  onFormDataChange,
  isAllTabsComplete,
}: SessionFormDataProps) {
  useEffect(() => {
    if (!initialData || Object.keys(initialData).length === 0) return;

    const emptySession = getEmptySession();
    const next = {
      date: initialData.date || emptySession.date,
      duration: initialData.duration || emptySession.duration,
      environment: initialData.environment ?? emptySession.environment,
      fatigue: initialData.fatigue ?? emptySession.fatigue,
      fun: initialData.fun ?? emptySession.fun,
      successType: initialData.successType ?? emptySession.successType,
      successDomain: initialData.successDomain ?? emptySession.successDomain,
      successDescription: initialData.successDescription || emptySession.successDescription,
      difficultyType: initialData.difficultyType ?? emptySession.difficultyType,
      difficultyDomain: initialData.difficultyDomain ?? emptySession.difficultyDomain,
      difficultyDescription: initialData.difficultyDescription || emptySession.difficultyDescription,
      notes: initialData.notes || emptySession.notes,
      oppositionLevel: initialData.oppositionLevel ?? emptySession.oppositionLevel,
      confidence: initialData.confidence ?? emptySession.confidence,
    };
    setFormData(next);
    if (typeof initialData?.environment === 'number') {
      setHadSparring(initialData.environment === 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id, initialData?.date]);

  useEffect(() => {
    onCompletionChange?.(isAllTabsComplete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllTabsComplete]);

  useEffect(() => {
    onFormDataChange?.(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
}


