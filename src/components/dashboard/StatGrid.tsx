import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@styles/atomic/spacing';
import StatCard, { UIState } from './StatCard';

type StatItem = {
  title: string;
  value?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
};
type StatGridProps = {
  stats?: StatItem[];
  mode: UIState;
};

export default function StatGrid({ stats = [], mode }: StatGridProps) {
  return (
    <View style={[styles.statsGrid, { marginTop: spacing.md }]}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statsGridItem}>
          <StatCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            mode={mode}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: -spacing.md,
  },
  statsGridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
});


