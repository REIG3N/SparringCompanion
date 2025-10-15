import { Session } from '@/src/types/session';
import { mockSessions, createEmptySession } from '@/src/mockdata/sessions.mock';

export async function fetchSessions(): Promise<Session[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...mockSessions];
}

export async function fetchSessionById(id: number): Promise<Session | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const found = mockSessions.find(s => s.id === id);
  return found ?? null;
}

export async function createSession(session: Session): Promise<Session> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  const nextId = mockSessions.length ? Math.max(...mockSessions.map(s => s.id)) + 1 : 0;
  const newSession: Session = { ...session, id: nextId };
  mockSessions.push(newSession);
  return session;
}

export async function updateSession(id: number, session: Session): Promise<Session> {
  await new Promise(resolve => setTimeout(resolve, 200));
  const idx = mockSessions.findIndex(s => s.id === id);
  if (idx >= 0) {
    mockSessions[idx] = { ...session, id };
    return mockSessions[idx];
  }
  return session;
}
export async function deleteSession(id: number): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  const idx = Number(id);
  if (!Number.isNaN(idx) && idx >= 0 && idx < mockSessions.length) {
    mockSessions.splice(idx, 1);
    return true;
  }
  return false;
}
export function getEmptySession(): Session {
  return createEmptySession();
}
