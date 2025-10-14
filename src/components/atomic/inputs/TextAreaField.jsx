import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { OPACITY, SPACING, globalStyles } from '../../../styles';

export const TextAreaField = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  numberOfLines = 4,
  editable = true
}) => (
  <View style={{ marginBottom: SPACING.md }}>
    {label && <Text style={globalStyles.labelText}>{label}</Text>}
    <TextInput
      style={[globalStyles.inputField, { minHeight: 80, textAlignVertical: 'top' }, !editable && { opacity: OPACITY.o40 }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`rgba(117,117,117,${OPACITY.o60})`}
      multiline
      numberOfLines={numberOfLines}
      editable={editable}
    />
  </View>
);


