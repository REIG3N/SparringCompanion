import { Text, StyleSheet,ScrollView,View } from 'react-native';
import { Link } from 'expo-router';
import AuthScreen from './auth/authScreen';
export default function HomeScreen() {
  return (
    <View style={styles.container} >
      <AuthScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex:1
  },
});
