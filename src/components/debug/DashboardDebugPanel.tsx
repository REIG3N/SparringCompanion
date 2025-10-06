import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DebugPanel from './DebugPanel';
import { globalStyles, SPACING } from '../../styles';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

export type DashboardDebugPanelProps = {
  mode: UIState;
  onMode: (m: UIState) => void;
};

export default function DashboardDebugPanel({
  mode,
  onMode,
}: DashboardDebugPanelProps) {
  const renderRow = (label: string, current: UIState, onChange: (m: UIState) => void) => (
    <View style={{ marginTop: SPACING.sm }}>
      <Text style={{ marginBottom: SPACING.xs }}>{label}</Text>
      <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => onChange('loading')}>
          <Text style={globalStyles.buttonOutlineText}>Loading</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => onChange('empty')}>
          <Text style={globalStyles.buttonOutlineText}>Empty</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonOutline, { flex: 1 }]} onPress={() => onChange('error')}>
          <Text style={globalStyles.buttonOutlineText}>Error</Text>
        </Pressable>
        <Pressable style={[globalStyles.buttonSecondary, { flex: 1 }]} onPress={() => onChange('normal')}>
          <Text style={globalStyles.buttonSecondaryText}>Normal</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <DebugPanel title="Dashboard Debug">
      {renderRow('Global mode', mode, onMode)}
    </DebugPanel>
  );
}
