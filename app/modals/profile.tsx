import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { COLORS, SPACING, TEXT_STYLES, globalStyles } from '@/src/styles';

export default function ProfileModal() {
  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={globalStyles.card}>
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text, marginBottom: SPACING.md }]}>Profile</Text>
        <Text style={{ color: COLORS.accent }}>
          Coming soon: manage email and password.
        </Text>
      </View>
    </ScrollView>
  );
}


