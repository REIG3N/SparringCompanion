import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../../styles';

export const TabNavigation = ({ tabs, activeTab, onTabPress }) => (
  <View style={globalStyles.tabContainer}>
    {tabs.map((tab, index) => (
      <TouchableOpacity
        key={index}
        style={[globalStyles.tabItem, activeTab === index && globalStyles.tabItemActive]}
        onPress={() => onTabPress(index)}
      >
        <Text style={[globalStyles.tabItemText, activeTab === index && globalStyles.tabItemTextActive]}>
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);


