import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { globalStyles, COLORS, SPACING, TEXT_STYLES } from '../../styles';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export type Day = { label: string; hasSession?: boolean; selected?: boolean };

export type CalendarWeekProps = {
  days: Day[];
  mode?: UIState;
  containerStyle?: ViewStyle;
};

export default function CalendarWeek({ days, mode = 'normal', containerStyle }: CalendarWeekProps) {
  if (mode === 'error') {
    return (
      <View
        style={[
          globalStyles.card,
          containerStyle,
          {
            marginTop: SPACING.xl,
            backgroundColor: 'rgba(250,45,45,0.10)',
            borderColor: COLORS.primary,
            borderWidth: 1,
          },
        ]}
      >
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text, marginBottom: SPACING.md }]}>Last 7 Days</Text>
        <Text style={styles.errorText}>Impossible de charger les données du calendrier</Text>
      </View>
    );
  }

  const renderDays = mode === 'empty' ? days.map(d => ({ ...d, hasSession: false })) : days;

  return (
    <View style={[globalStyles.card, containerStyle, { marginTop: SPACING.xl }]}>
      <Text
        style={[
          TEXT_STYLES.headerLG,
          { color: COLORS.text, marginBottom: SPACING.md }
        ]}
      >
        Last 7 Days
      </Text>
      <View style={globalStyles.cardHeaderRow}>
        {renderDays.map((d, idx) => {
          const dayStyle = [
            globalStyles.calendarDay,
            d.hasSession && globalStyles.calendarDayHasSession,
            d.selected && globalStyles.calendarDaySelected,
            mode === 'loading' && { opacity: 0.5 },
          ];
          const textColor = d.selected ? '#000000' : COLORS.text;
          return (
            <View key={`${d.label}-${idx}`} style={dayStyle}>
              <Text style={{ color: textColor }}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
