import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles, OPACITY } from '../../../styles';

export const ButtonOutline = ({ title, onPress, disabled = false }) => (
  <TouchableOpacity
    style={[globalStyles.buttonOutline, disabled && { opacity: OPACITY.o40 }]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={globalStyles.buttonOutlineText}>{title}</Text>
  </TouchableOpacity>
);


