import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { COLORS, OPACITY, SPACING, globalStyles } from '../../../styles';

export const InputField = ({ 
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  error = false,
  errorMessage = '',
  editable = true
}) => (
  <View style={{ marginBottom: SPACING.md }}>
    {label && <Text style={globalStyles.labelText}>{label}</Text>}
    <TextInput
      style={[
        globalStyles.inputField,
        error && { borderColor: COLORS.primary, borderWidth: 2 },
        !editable && { opacity: OPACITY.o40 },
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={`rgba(117,117,117,${OPACITY.o60})`}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      editable={editable}
    />
    {error && errorMessage ? (
      <Text style={{ color: COLORS.primary, fontSize: 12, marginTop: SPACING.xs }}>
        {errorMessage}
      </Text>
    ) : null}
  </View>
);


