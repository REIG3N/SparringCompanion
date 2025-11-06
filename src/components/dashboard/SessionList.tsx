import React from 'react';
import { FlatList, View } from 'react-native';
import { Link } from 'expo-router';
import SessionItem, { type SessionItemProps } from './SessionItem';
import { spacing } from '@styles/atomic/spacing';
import { Text } from 'react-native';

export type UIState = 'normal' | 'loading' | 'empty' | 'error';

type Props = {
  sessions?: SessionItemProps[];
  mode: UIState;
  limit?: number;
};

export default function SessionList({ sessions = [], mode, limit }: Props) {
  if (mode === 'error') {
    return <Text style={{ marginTop: spacing.md }}>Error loading sessions</Text>;
  }
  if (mode === 'loading') {
    return (
      <>
        <SessionItem mode="loading" />
        <SessionItem mode="loading" />
      </>
    );
  }
  if (mode === 'empty') {
    return (
      <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
        <Text>No sessions yet.</Text>
      </View>
    );
  }
  const data = typeof limit === 'number' ? sessions.slice(0, limit) : sessions;
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => String(item.id ?? index)}
      renderItem={({ item, index }) => (
        <Link
          href={{ pathname: '/modals/modal', params: { mode: 'edit', id: String(item.id ?? index) } }}
          asChild
        >
          <SessionItem {...item} />
        </Link>
      )}
    />
  );
}


