import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '../../../src/styles';
import { styles } from './DashboardStyle';
import StatCard from '../../../src/components/dashboard/StatCard';
import SessionItem from '../../../src/components/dashboard/SessionItem';
import CalendarWeek from '../../../src/components/dashboard/CalendarWeek';

const mockCalendarDays = [
  { label: 'M', hasSession: false, selected: false },
  { label: 'T', hasSession: true, selected: false },
  { label: 'W', hasSession: false, selected: false },
  { label: 'T', hasSession: true, selected: false },
  { label: 'F', hasSession: false, selected: false },
  { label: 'S', hasSession: true, selected: true },
  { label: 'S', hasSession: false, selected: false },
];

type ChangeType = 'positive' | 'negative';

type Stat = { title: string; value: string; change?: string; changeType?: ChangeType };
const mockStats: Stat[] = [
  { title: 'Weekly Avg', value: '3.2', change: '+0.5', changeType: 'positive' },
  { title: 'Fun Score', value: '4.5', change: '+0.3', changeType: 'positive' },
  { title: 'Progression', value: '78%', change: '+12%', changeType: 'positive' },
  { title: 'Readiness', value: '85%', change: '-5%', changeType: 'negative' },
];

type Session = { title: string; subtitle: string; duration: string };
const mockSessions: Session[] = [
  { title: 'Today', subtitle: 'Head movement & defense', duration: '45 min' },
  { title: '2 days ago', subtitle: 'Combinations practice', duration: '60 min' },
  { title: '4 days ago', subtitle: 'Sparring session', duration: '30 min' },
];

// using extracted components above

type UIState = 'normal' | 'loading' | 'empty' | 'error';

function deriveStateFromData(
  stats: Stat[] | null | undefined,
  sessions: Session[] | null | undefined,
  days: typeof mockCalendarDays | null | undefined,
  isLoading: boolean,
): UIState {
  if (isLoading) return 'loading';

  const statsInvalid = !Array.isArray(stats) || stats.some(s => typeof s.title !== 'string' || typeof s.value !== 'string');
  const sessionsInvalid = !Array.isArray(sessions) || sessions.some(s => typeof s.title !== 'string' || typeof s.subtitle !== 'string');
  const daysInvalid = !Array.isArray(days) || days.some(d => typeof d.label !== 'string');
  if (statsInvalid || sessionsInvalid || daysInvalid) return 'error';

  const isAllEmpty = (stats.length === 0 || stats.every(s => !s.value))
    && (sessions.length === 0)
    && (days.length === 0 || days.every(d => !d.hasSession));
  if (isAllEmpty) return 'empty';
  return 'normal';
}

export default function DashboardScreen() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [stats, setStats] = React.useState<Stat[] | null>(mockStats);
  const [sessions, setSessions] = React.useState<Session[] | null>(mockSessions);
  const [days, setDays] = React.useState<typeof mockCalendarDays | null>(mockCalendarDays);

  const mode: UIState = deriveStateFromData(stats, sessions, days, isLoading);
  const statsToRender = mode === 'empty' && stats ? stats.map(s => ({ ...s, value: '--', change: undefined })) : (stats ?? []);
  const daysToRender = mode === 'empty' && days ? days.map(d => ({ ...d, hasSession: false })) : (days ?? []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xl }} style={globalStyles.appScreen}>

      <CalendarWeek days={daysToRender} mode={mode} />


      <View style={[styles.statsGrid, { marginTop: SPACING.lg }]}>
        {(statsToRender || mockStats).map((s, i) => (
          <View key={i} style={styles.statsGridItem}>
            <StatCard title={s.title} value={s.value} change={s.change} changeType={s.changeType} mode={mode} />
          </View>
        ))}
      </View>

      <Pressable style={globalStyles.buttonPrimary} onPress={() => { }}>
        <Text style={globalStyles.buttonPrimaryText}>Nouvelle Session</Text>
      </Pressable>

      <View style={[globalStyles.card, { marginTop: SPACING.lg }]}>
        <View style={styles.cardHeaderRow}>
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>Recent Sessions</Text>
          <Text style={{ color: COLORS.secondary, fontSize: 18 }}>☰</Text>
        </View>
        {mode === 'error' && (
          <View style={[styles.errorBox, { marginTop: SPACING.sm }]}>
            <Text style={styles.errorText}>Échec de chargement des sessions. Vérifiez votre connexion.</Text>
          </View>
        )}
        {mode === 'loading' && (
          <>
            <SessionItem mode="loading" />
            <SessionItem mode="loading" />
          </>
        )}
        {mode === 'empty' && (
          <View style={{ paddingVertical: SPACING.xl, alignItems: 'center' }}>
            <Text style={TEXT_STYLES.caption}>Aucune session enregistrée. Commencez votre premier entraînement pour voir votre progression.</Text>
          </View>
        )}
        {mode === 'normal' && (
          (sessions ?? []).map((s, i) => (
            <SessionItem key={i} title={s.title} subtitle={s.subtitle} duration={s.duration} />
          ))
        )}
      </View>

      <View style={{ flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.md }}>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1000);
        }}>
          <Text style={globalStyles.buttonOutlineText}>Loading</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => {
          setStats(stats => stats ? stats.map(s => ({ ...s, value: '' })) : []);
          setSessions([]);
          setDays(days => days ? days.map(d => ({ ...d, hasSession: false })) : []);
        }}>
          <Text style={globalStyles.buttonOutlineText}>Empty</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => {
          setStats([{ title: null as unknown as string, value: 'x' } as unknown as Stat]);
        }}>
          <Text style={globalStyles.buttonOutlineText}>Error</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonSecondary, { flex: 1 }]} onPress={() => {
          setStats(mockStats);
          setSessions(mockSessions);
          setDays(mockCalendarDays);
          setIsLoading(false);
        }}>
          <Text style={globalStyles.buttonSecondaryText}>Normal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}


