import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { globalStyles, SPACING, TEXT_STYLES, COLORS } from '@/src/styles';
import { styles } from '@/src/screens/dashboard/DashboardStyle';
import { StatGrid, SessionItem, CalendarWeek, SessionHistory } from '@/src/components/dashboard';
import useDashboardData from '@/src/hooks/dashboard/useDashboardData'
import DashboardDebugPanel from '@/src/components/debug/DashboardDebugPanel';
import { Link } from 'expo-router'
import i18n from '@/src/i18n'
import { Icon } from 'lucide-react-native';
import { Icons } from '@/constants/icons';

export default function DashboardScreen() {
  const { mode, stats, sessions, days, isLoading, setIsLoading, toNormal, toEmpty, toError } = useDashboardData();

  const statsToRender = mode === 'empty' && stats ? stats.map(s => ({ ...s, value: '--', change: undefined })) : (stats ?? []);
  const daysToRender = mode === 'empty' && days ? days.map(d => ({ ...d, hasSession: false })) : (days ?? []);

  return (
    <View style={[globalStyles.appScreen, { paddingBottom: SPACING.xl }]}>

      <CalendarWeek days={daysToRender} mode={mode} />

      <StatGrid stats={statsToRender} mode={mode} />
      <SessionHistory mode={mode} sessions={sessions} />

      <Link href={{ pathname: "/modals/modal", params: { mode: "empty" } }} asChild>
        <Pressable style={globalStyles.buttonPrimary}>
          <Text style={globalStyles.buttonPrimaryText}>
            {i18n.t('dashboard.add_session') as string}
          </Text>
        </Pressable>
      </Link>


      <Link href={{ pathname: "/(tabs)/Settings/settings" }} asChild>
        <Pressable style={globalStyles.buttonOutline}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={globalStyles.buttonOutlineText}>
              {i18n.t('settings.title') as string}
            </Text>
            <Icons.Settings size={24} color={COLORS.text} style={{ marginLeft: 8 }} />
          </View>
        </Pressable>
      </Link>


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

    </View>
  );
}
