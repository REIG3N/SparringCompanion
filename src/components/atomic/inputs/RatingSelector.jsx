import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, OPACITY, RADIUS, SPACING, globalStyles } from '../../../styles';

export const RatingSelector = ({ label, value, onChange }) => (
  <View style={{ marginBottom: SPACING.md }}>
    {label && <Text style={globalStyles.labelText}>{label}</Text>}
    <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <TouchableOpacity
          key={rating}
          style={{
            width: 44,
            height: 44,
            borderRadius: RADIUS.sm,
            borderWidth: 2,
            borderColor: value === rating ? COLORS.primary : `rgba(255,255,255,${OPACITY.o20})`,
            backgroundColor: value === rating ? COLORS.primary : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onChange(rating)}
        >
          <Text style={{ fontSize: 16, fontWeight: '600', color: value === rating ? '#000000' : COLORS.text }}>
            {rating}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


