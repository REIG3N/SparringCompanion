import { Session } from '@/src/types/session';

export function getEnvironmentLabel(environment: number | null): string {
  if (environment === null) return '';
  return environment === 0 ? 'Solo Practice' : 'Group with Sparring';
}


export function toListItem(session: Session) {
  const environmentLabel = getEnvironmentLabel(session.environment);

  return {
    id: session.id,
    title: session.date,
    subtitle: `${environmentLabel}`,
    duration: `${session.duration} min`,
  };
}