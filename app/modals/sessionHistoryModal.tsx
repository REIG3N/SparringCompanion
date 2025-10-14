import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TEXT_STYLES } from "@/src/styles";

export default function SessionHistoryModal() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={TEXT_STYLES.headerLG}>Session History</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>sessionHistoryModal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 50,
    paddingHorizontal: SPACING.lg,
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
    fontWeight: "bold" },
});
