import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { COLORS, SPACING, TEXT_STYLES, globalStyles } from '@/src/styles';

export default function ContactModal() {
  return (
    <ScrollView style={globalStyles.appScreen} contentContainerStyle={{ paddingBottom: SPACING.xl }}>
      <View style={globalStyles.card}>
        <Text style={[TEXT_STYLES.headerLG, { color: COLORS.text, marginBottom: SPACING.md }]}>Contact</Text>
        <Text style={{ color: COLORS.accent }}>
          Contact details and form will be added here.
        </Text>
      </View>
    </ScrollView>
  );
}


