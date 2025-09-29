import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../styles';

export const RadioPills = ({ options, selected, onSelect }) => (
  <View style={globalStyles.radioPills}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[globalStyles.radioPill, selected === index && globalStyles.radioPillSelected]}
        onPress={() => onSelect(index)}
      >
        <Text style={[globalStyles.radioPillText, selected === index && globalStyles.radioPillTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);


