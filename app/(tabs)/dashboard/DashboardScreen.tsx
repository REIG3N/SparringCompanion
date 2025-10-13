import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '@/src/styles';
import { styles } from '@/src/screens/dashboard/DashboardStyle';
import { StatGrid, SessionItem, CalendarWeek, SessionHistory } from '@/src/components/dashboard';
import useDashboardData from '@/src/hooks/dashboard/useDashboardData'
import DashboardDebugPanel from '@/src/components/debug/DashboardDebugPanel';
import { Link } from 'expo-router'

export default function DashboardScreen() {
  const { mode, stats, sessions, days, isLoading, setIsLoading, toNormal, toEmpty, toError } = useDashboardData();

  const statsToRender = mode === 'empty' && stats ? stats.map(s => ({ ...s, value: '--', change: undefined })) : (stats ?? []);
  const daysToRender = mode === 'empty' && days ? days.map(d => ({ ...d, hasSession: false })) : (days ?? []);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: SPACING.xl }} style={globalStyles.appScreen}>

      <CalendarWeek days={daysToRender} mode={mode} />
      
      <StatGrid stats={statsToRender} mode={mode} />

      <Link href={{ pathname: "/modals/modal", params: { mode: "empty" } }} asChild>
        <Pressable style={globalStyles.buttonPrimary}>
          <Text style={globalStyles.buttonPrimaryText}>
            Add New Session
          </Text>
        </Pressable>
      </Link>
      <Link href={{ pathname: "/modals/modal", params: { mode: "edit" } }} asChild>
        <Pressable style={globalStyles.buttonPrimary}>
          <Text style={globalStyles.buttonPrimaryText}>
            Test Edit Session
          </Text>
        </Pressable>
      </Link>
      <SessionHistory mode={mode} sessions={sessions} />

      {/* Debug panel (comment out to hide) */}
      {/* <DashboardDebugPanel
        mode={mode}
        onMode={(m) => {
          if (m === 'loading') setIsLoading(true);
          else if (m === 'empty') toEmpty();
          else if (m === 'error') toError();
          else toNormal();
        }}
      /> */}
    
    </ScrollView>
  );
}
