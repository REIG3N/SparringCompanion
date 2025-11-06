import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from "@/src/styles";
import i18n from "@/src/i18n";
import { Icons } from "@/constants/icons";
import { SessionItem } from "@/src/components/dashboard";
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
        <View style={[styles.errorBox, { marginTop: SPACING.sm }]}>
          <Text style={styles.errorText}>{i18n.t('common.errors.network') as string}</Text>
        </View>
      )}
      {displayMode === 'loading' && (
        <>
          <SessionItem mode="loading" />
          <SessionItem mode="loading" />
        </>
      )}
      {displayMode === 'empty' && (
        <View style={{ paddingVertical: SPACING.xl, alignItems: 'center' }}>
          <Text style={TEXT_STYLES.caption}>{i18n.t('dashboard.no_sessions', { defaultValue: 'No sessions yet.' }) as string}</Text>
        </View>
      )}
      {displayMode === 'normal' && (
  <FlatList
    data={sessions}
    renderItem={({ item }) => (
      <Link
        href={{ pathname: "/modals/modal", params: { mode: 'edit', id: String(item.id) } }}
        asChild
      >
        <SessionItem id={item.id} title={item.title} subtitle={item.subtitle} duration={item.duration} />
      </Link>
    )}
    keyExtractor={(item, index) => String(item.id ?? index)}
  />
)}
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
  errorBox: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
  },
  errorText: {
    color: COLORS.text,
    textAlign: 'center',
  },
});
