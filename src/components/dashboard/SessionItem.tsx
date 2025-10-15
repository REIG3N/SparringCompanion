import React from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { globalStyles, SPACING, COLORS } from '../../styles';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export type SessionItemProps = {
  id?: number;
  title?: string;
  subtitle?: string;
  duration?: string;
  mode?: UIState;
  containerStyle?: ViewStyle;
  onPress?: () => void;
};

export default function SessionItem({
  id,
  title,
  subtitle,
  duration,
  mode = 'normal',
  containerStyle,
  onPress,
}: SessionItemProps) {
  // Handler for onPress
  const handlePress = () => {
    console.log(
      'SessionItem pressed:',
      id || '[No id]',
      title || '[No title]',
      subtitle || '[No subtitle]',
      duration || '[No duration]'
    );
  };

  if (mode === 'error') {
    return (
      <View style={[globalStyles.sessionItem, styles.errorItem, containerStyle]}>
        <Text style={{ color: COLORS.text }}>Error</Text>
      </View>
    );
  }

  if (mode === 'loading') {
    return (
      <Pressable
        style={[
          globalStyles.sessionItem,
          { marginBottom: SPACING.sm, opacity: 0.5 },
          containerStyle,
        ]}
        onPress={onPress ?? handlePress}
      >
        <View style={globalStyles.sessionInfo}>
          <Text style={globalStyles.sessionTitle}>{' '}</Text>
          <Text style={globalStyles.sessionSubtitle}>{' '}</Text>
        </View>
      </Pressable>
    );
  }

  if (mode === 'empty') {
    return null;
  }

  return (
    <Pressable
      style={[
        globalStyles.sessionItem,
        { marginBottom: SPACING.sm },
        containerStyle,
      ]}
      onPress={onPress ?? handlePress}
    >
      <View style={globalStyles.sessionInfo}>
        <Text style={globalStyles.sessionTitle}>{title}</Text>
        <Text style={globalStyles.sessionSubtitle}>{subtitle}</Text>
      </View>
      <View style={globalStyles.sessionMeta}>
        <Text style={{ color: COLORS.accent }}>{duration}</Text>
        <Text style={{ color: COLORS.accent }}>▶</Text>
      </View>
    </Pressable>
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


