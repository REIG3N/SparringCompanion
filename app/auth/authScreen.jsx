import { View, Text, TextInput, Button } from 'react-native'
import React from 'react'
import authStyles from './authStyle'
import { useRouter } from 'expo-router'

const AuthScreen = () => {
  // The Link component from expo-router is not useful here because we are navigating programmatically on button press.
  // Using useRouter and router.push is the correct approach for imperative navigation.
  const router = useRouter();

  const handleContinue = () => {
    router.push('/dashboard');
  }

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>SparringCompanion</Text>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Entrez votre email :</Text>
        <View style={authStyles.inputWrapper}>
          <TextInput
            style={authStyles.input}
            placeholder="Email"
          />
        </View>
      <Button
        title="Continuer"
        onPress={() => handleContinue()}
      />
      </View>
    </View>
  )
}
export default AuthScreen