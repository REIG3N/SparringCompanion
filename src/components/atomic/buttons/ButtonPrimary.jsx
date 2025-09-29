import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { globalStyles, OPACITY } from '../../../styles';

export const ButtonPrimary = ({ title, onPress, disabled = false, loading = false }) => (
  <TouchableOpacity
    style={[globalStyles.buttonPrimary, disabled && { opacity: OPACITY.o40 }]}
    onPress={onPress}
    disabled={disabled || loading}
  >
    {loading ? (
      <ActivityIndicator color="#000000" />
    ) : (
      <Text style={globalStyles.buttonPrimaryText}>{title}</Text>
    )}
  </TouchableOpacity>
);


