import { Text, StyleSheet,ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container} >
      <Text>Dashboard</Text>
      <Link href="/modal" style={styles.link}>
        <Text>Open modal</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
  },
  link: {
    marginTop: 22,

  }
});
