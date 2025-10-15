import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { COLORS, globalStyles, SPACING, TEXT_STYLES } from "@/src/styles";
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
        <Text style={TEXT_STYLES.headerLG}>Session History</Text>
        <Pressable style={globalStyles.buttonOutline} onPress={() => router.back()}>
          <Icons.X size={16} color={COLORS.text} />
        </Pressable>
      </View>
      <ScrollView>
        {displayMode === 'error' && (
          <View style={[styles.errorBox, { marginTop: SPACING.sm }]}>
            <Text style={styles.errorText}>Échec de chargement des sessions. Vérifiez votre connexion.</Text>
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
            <Text style={TEXT_STYLES.caption}>Aucune session enregistrée. Commencez votre premier entraînement pour voir votre progression.</Text>
          </View>
        )}
        {displayMode === 'normal' && (
          (sessions ?? []).map((s, i) => (
            <Link
              key={i}
              href={{ pathname: "/modals/modal", params: { mode: 'edit', id: String((s as any).id ?? i) } }}
              asChild
            >
              <SessionItem id={(s as any).id ?? i} title={s.title} subtitle={s.subtitle} duration={s.duration} />
            </Link>
          ))
        )}
      </ScrollView>
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
