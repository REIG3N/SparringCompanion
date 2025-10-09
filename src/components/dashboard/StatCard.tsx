import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { globalStyles, SPACING, COLORS } from '../../styles';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export type StatCardProps = {
  title: string;
  value?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  mode?: UIState;
  containerStyle?: ViewStyle;
};

export default function StatCard({ title, value, change, changeType, mode = 'normal', containerStyle }: StatCardProps) {
  if (mode === 'error') {
    return (
      <View style={[styles.card, styles.errorCard, containerStyle]}>
        <Text style={globalStyles.statCardTitle}>{title}</Text>
        <Text style={styles.errorTextSmall}>Error</Text>
      </View>
    );
  }

  if (mode === 'loading') {
    return (
      <View style={[styles.card, { opacity: 0.5 }, containerStyle]}>
        <Text style={globalStyles.statCardTitle}>{title}</Text>
        <Text style={globalStyles.statCardValue}>{' '}</Text>
      </View>
    );
  }

  // empty mode displays placeholders
  const displayValue = mode === 'empty' ? '--' : (value ?? '--');
  const displayChange = mode === 'empty' ? undefined : change;

  return (
  <>
  
  <View style={[styles.card, containerStyle]}>
      <Text style={globalStyles.statCardTitle}>{title}</Text>
      <Text style={globalStyles.statCardValue}>{displayValue}</Text>
      {!!displayChange && (
        <Text style={changeType === 'negative' ? globalStyles.statCardChangeNegative : globalStyles.statCardChangePositive}>
          {displayChange}
        </Text>
      )}
    </View>
  
  </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: `rgba(255,255,255,0.05)`,
    borderColor: `rgba(255,255,255,0.10)`,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  errorCard: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: COLORS.primary,
  },
  errorTextSmall: {
    color: COLORS.text,
  },
});


