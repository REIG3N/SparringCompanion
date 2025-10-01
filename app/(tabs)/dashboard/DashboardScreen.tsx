import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '../../../src/styles';
import { styles } from '../../../src/screens/dashboard/DashboardStyle';
import { StatCard, SessionItem, CalendarWeek } from '../../../src/components/dashboard';
import useDashboardData from '../../../src/hooks/dashboard/useDashboardData'

export default function DashboardScreen() {
  const { mode, stats, sessions, days, isLoading, setIsLoading, toNormal, toEmpty, toError } = useDashboardData();

  // const mode: UIState = deriveStateFromData(stats, sessions, days, isLoading);
  const statsToRender = mode === 'empty' && stats ? stats.map(s => ({ ...s, value: '--', change: undefined })) : (stats ?? []);
  const daysToRender = mode === 'empty' && days ? days.map(d => ({ ...d, hasSession: false })) : (days ?? []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xl }} style={globalStyles.appScreen}>

      <CalendarWeek days={daysToRender} mode={mode} />


      <View style={[styles.statsGrid, { marginTop: SPACING.lg }]}>
        {(statsToRender || stats).map((s, i) => (
          <View key={i} style={styles.statsGridItem}>
            <StatCard title={s.title} value={s.value} change={s.change} changeType={s.changeType} mode={mode} />
          </View>
        ))}
      </View>

      <Pressable style={globalStyles.buttonPrimary} onPress={() => { }}>
        <Text style={globalStyles.buttonPrimaryText}>Live Session</Text>
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
          (sessions ?? []).slice(0, 2).map((s, i) => (
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
          toEmpty();
        }}>
          <Text style={globalStyles.buttonOutlineText}>Empty</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => {
          toError();
        }}>
          <Text style={globalStyles.buttonOutlineText}>Error</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonSecondary, { flex: 1 }]} onPress={() => {
          toNormal();
        }}>
          <Text style={globalStyles.buttonSecondaryText}>Normal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}


