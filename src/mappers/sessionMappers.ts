import { Session } from '@/src/types/session';

export function getEnvironmentLabel(environment: number | null): string {
  if (environment === null) return '';
  return environment === 0 ? 'Solo' : 'Group';
}

export function getTypeLabel(type: number | null): string {
  if (type === null) return '';
  return type === 0 ? 'Practice' : 'Sparring';
}

export function toListItem(session: Session) {
  const environmentLabel = getEnvironmentLabel(session.environment);
  const typeLabel = getTypeLabel(session.type);

  return {
    id: session.id,
    title: session.date,
    subtitle: `${environmentLabel} - ${typeLabel}`,
    duration: `${session.duration} min`,
  };
}