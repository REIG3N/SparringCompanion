import { Link } from 'expo-router';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { PostSessionForm } from '@/src/components/forms/PostSessionForm';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Link href={{ pathname: '/(tabs)/dashboard/DashboardScreen' }} asChild>
        <Pressable style={styles.link}>
          <Text>Back to dashboard</Text>
        </Pressable>
      </Link>

      <PostSessionForm onSubmit={(data: any) => { console.log('Submitted session:', data); }} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
