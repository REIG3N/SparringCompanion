import { AppState, View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import authStyles from './authStyle'
import { useRouter } from 'expo-router'
import { supabase } from "../../utils/supabase"

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRegisterOrLogin, setShowRegisterOrLogin] = useState(false)
  const router = useRouter();

  async function LogInWithEmail() {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      Alert.alert(error.message)
      setLoading(false)
      return
    }
    setLoading(false)
    if (data && data.session) {
      router.replace('/dashboard')
    }
  }

  async function RegisterWithEmail() {
    setLoading(true)

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) {
      if (error.message === "Invalid login credentials") {
        Alert.alert(
          "Account not found",
          "No account found with this email. Would you like to register?"
        );
      } else {
        Alert.alert(error.message);
      }
    }

    setLoading(false)

    if (session) {
      router.replace('/dashboard');
    }
  }

  // No Animated import or usage, so we just switch views without animation
  const handleSwitch = (toRegister) => {
    setShowRegisterOrLogin(toRegister);
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>SparringCompanion</Text>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Entrez votre email :</Text>
        <View style={authStyles.inputWrapper}>
          <TextInput
            style={authStyles.input}
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View style={authStyles.inputWrapper} >
          <Text style={authStyles.label}>Entrez votre mot de passe :</Text>
          <View style={authStyles.inputWrapper}>
            <TextInput
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={false}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
        </View>
        {/* <Button title="Log in" disabled={loading} onPress={() => LogInWithEmail()} />
        <Button title="Register" disabled={loading} onPress={() => RegisterWithEmail()} /> */}

        {/* Switch between login/register without animation */}
        {showRegisterOrLogin ? (
          <>
            <Button title="Register" disabled={loading} onPress={() => RegisterWithEmail()} />
            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                marginTop: 10,
                textAlign: 'center',
                textDecorationLine: 'underline'
              }}
              onPress={() => handleSwitch(false)}
            >
              Already have an account? Log in
            </Text>
          </>
        ) : (
          <>
            <Button title="Log in" disabled={loading} onPress={() => LogInWithEmail()} />
            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                marginTop: 10,
                textAlign: 'center',
                textDecorationLine: 'underline'
              }}
              onPress={() => handleSwitch(true)}
            >
              Don't have an account? Register
            </Text>
          </>
        )}
      </View>
    </View>
  )
}
export default AuthScreen