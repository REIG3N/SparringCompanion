import { Session } from '@/src/types/session';
import i18n from '@/src/i18n';

export function getEnvironmentLabel(environment: number | null): string {
  if (environment === null || typeof environment !== 'number') return '';
  return environment === 0
    ? (i18n.t('session.env.solo', { defaultValue: 'Solo Practice' }) as string)
    : (i18n.t('session.env.group', { defaultValue: 'Group with Sparring' }) as string);
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