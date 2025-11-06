import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { globalStyles, COLORS, SPACING, TEXT_STYLES } from "../../styles";
import Card from '@/src/components/ui/Card';
import CardHeader from '@/src/components/ui/CardHeader';
import i18n, { useLanguage } from "@/src/i18n";

export type UIState = "normal" | "loading" | "empty" | "error";

export type Day = { label: string; hasSession?: boolean; selected?: boolean };

export type CalendarWeekProps = {
  days: Day[];
  mode?: UIState;
  containerStyle?: ViewStyle;
};

export default function CalendarWeek({
  days,
  mode = "normal",
  containerStyle,
}: CalendarWeekProps) {
  useLanguage();
  
  if (mode === "error") {
    return (
      <Card style={[{ marginTop: SPACING.xl }, containerStyle, { backgroundColor: 'rgba(250,45,45,0.10)', borderColor: COLORS.primary, borderWidth: 1 }]}>
        <CardHeader>
          <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>
            Last 7 Days
          </Text>
        </CardHeader>
        <Text style={styles.errorText}>
          Impossible de charger les données du calendrier
        </Text>
      </Card>
    );
  }

  const renderDays =
    mode === "empty" ? days.map((d) => ({ ...d, hasSession: false })) : days;

  return (
    <Card style={[containerStyle, { marginTop: SPACING.xl }] }>
      <CardHeader>
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text }]}>
          {i18n.t('dashboard.last7days') as string}
        </Text>
      </CardHeader>
      <View style={globalStyles.cardHeaderRow}>
        {renderDays.map((d, idx) => {
          const dayStyle = [
            globalStyles.calendarDay,
            d.selected && globalStyles.calendarDaySelected,
            mode === "loading" && { opacity: 0.5 },
          ];
          const textStyle = [
            { color: COLORS.text },
          ];
          return (
            <View key={`${d.label}-${idx}`} style={dayStyle}>
              <Text style={textStyle as any}>{d.label}</Text>
              {d.hasSession ? <View style={globalStyles.calendarDayDot} /> : null}
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: "rgba(250,45,45,0.10)",
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
  },
  errorText: {
    color: COLORS.text,
    textAlign: "center",
  },
});
