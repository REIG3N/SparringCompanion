import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '../../../src/styles';
import { styles } from '../../../src/screens/dashboard/DashboardStyle';
import { StatGrid, SessionItem, CalendarWeek, SessionHistory } from '../../../src/components/dashboard';
import useDashboardData from '../../../src/hooks/dashboard/useDashboardData'

export default function DashboardScreen() {
  const { mode, stats, sessions, days, isLoading, setIsLoading, toNormal, toEmpty, toError } = useDashboardData();

  // const mode: UIState = deriveStateFromData(stats, sessions, days, isLoading);
  const statsToRender = mode === 'empty' && stats ? stats.map(s => ({ ...s, value: '--', change: undefined })) : (stats ?? []);
  const daysToRender = mode === 'empty' && days ? days.map(d => ({ ...d, hasSession: false })) : (days ?? []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xl }} style={globalStyles.appScreen}>

      <CalendarWeek days={daysToRender} mode={mode} />
      <StatGrid stats={statsToRender} mode={mode} />

      <Pressable style={globalStyles.buttonPrimary} onPress={() => { }}>
        <Text style={globalStyles.buttonPrimaryText}>Live Session</Text>
      </Pressable>

      <SessionHistory mode={mode} sessions={sessions} />

      {/* 
      // Debug panel: Use these buttons to manually set the dashboard UI state for development/testing.
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
      </View> */}

    </ScrollView>
  );
}


