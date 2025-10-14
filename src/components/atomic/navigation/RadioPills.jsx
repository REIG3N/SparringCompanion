import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../styles';

export const RadioPills = ({ options, selected, onSelect, disabled = false }) => (
  <View style={globalStyles.radioPills}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[globalStyles.radioPill, selected === index && globalStyles.radioPillSelected, disabled && { opacity: 0.4 }]}
        onPress={() => { if (!disabled) { onSelect(index); } }}
        disabled={disabled}
      >
        <Text style={[globalStyles.radioPillText, selected === index && globalStyles.radioPillTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);


