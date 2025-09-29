import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { globalStyles, SPACING, COLORS } from '../../styles';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export type SessionItemProps = {
  title?: string;
  subtitle?: string;
  duration?: string;
  mode?: UIState;
  containerStyle?: ViewStyle;
};

export default function SessionItem({ title, subtitle, duration, mode = 'normal', containerStyle }: SessionItemProps) {
  if (mode === 'error') {
    return (
      <View style={[globalStyles.sessionItem, styles.errorItem, containerStyle]}>
        <Text style={{ color: COLORS.text }}>Error</Text>
      </View>
    );
  }

  if (mode === 'loading') {
    return (
      <View style={[globalStyles.sessionItem, { marginBottom: SPACING.sm, opacity: 0.5 }, containerStyle]}>
        <View style={globalStyles.sessionInfo}>
          <Text style={globalStyles.sessionTitle}>{' '}</Text>
          <Text style={globalStyles.sessionSubtitle}>{' '}</Text>
        </View>
      </View>
    );
  }

  if (mode === 'empty') {
    return null;
  }

  return (
    <View style={[globalStyles.sessionItem, { marginBottom: SPACING.sm }, containerStyle]}>
      <View style={globalStyles.sessionInfo}>
        <Text style={globalStyles.sessionTitle}>{title}</Text>
        <Text style={globalStyles.sessionSubtitle}>{subtitle}</Text>
      </View>
      <View style={globalStyles.sessionMeta}>
        <Text style={{ color: COLORS.accent }}>{duration}</Text>
        <Text style={{ color: COLORS.accent }}>▶</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorItem: {
    backgroundColor: 'rgba(250,45,45,0.10)',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 12,
  },
});


