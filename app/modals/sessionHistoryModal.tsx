import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from "@/src/styles";
import i18n from "@/src/i18n";
import { Icons } from "@/constants/icons";
import { SessionItem } from "@/src/components/dashboard";
import SessionList from "@/src/components/dashboard/SessionList";
import ErrorBox from "@/src/components/ui/ErrorBox";
import useSessionData from "@/src/hooks/dashboard/useSessionData";

export default function SessionHistoryModal() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const routeMode = typeof params.mode === 'string' ? params.mode : undefined;
  const { sessions, isLoading, error } = useSessionData();

  const displayMode: 'normal' | 'loading' | 'empty' | 'error' =
    routeMode === 'loading' ? 'loading' :
      routeMode === 'error' ? 'error' :
        routeMode === 'empty' ? 'empty' :
          (error ? 'error' : (isLoading ? 'loading' : ((sessions?.length ?? 0) === 0 ? 'empty' : 'normal')));

  return (
    <View style={[globalStyles.appScreen, styles.container]}>
      <View style={globalStyles.cardHeaderRow}>
        <Text style={TEXT_STYLES.headerLG}>{i18n.t('dashboard.recent_sessions') as string}</Text>
        <Pressable style={globalStyles.buttonOutline} onPress={() => router.back()}>
          <Icons.X size={16} color={COLORS.text} />
        </Pressable>
      </View>
      {displayMode === 'error' && (
        <ErrorBox style={{ marginTop: SPACING.sm }} message={i18n.t('common.errors.network') as string} />
      )}
      <SessionList mode={displayMode} sessions={sessions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  backButton: {
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    // backgroundColor: COLORS.surface,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold"
  },
  
});
