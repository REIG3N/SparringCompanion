import { AppState, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import authStyles from './authStyle'
import { useRouter } from 'expo-router'
import { supabase } from "../../utils/supabase"

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRegisterOrLogin, setShowRegisterOrLogin] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh()
      } else {
        supabase.auth.stopAutoRefresh()
      }
    });

    // Clean up the event listener on unmount
    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else if (AppState.removeEventListener) {
        // For React Native < 0.65
        AppState.removeEventListener('change', () => {});
      }
    };
  }, []);

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
      router.replace('/(tabs)/dashboard/DashboardScreen')
    }
  }

  async function RegisterWithEmail() {
    setLoading(true)

    const {
      data: { session } = {},
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
      router.replace('/(tabs)/dashboard/DashboardScreen');
    }
  }

  // No Animated import or usage, so we just switch views without animation
  const handleSwitch = (toRegister) => {
    setShowRegisterOrLogin(toRegister);
  };

  return (
    <View style={authStyles.container}>
      <View style={authStyles.inner}>
        <View style={authStyles.card}>
          <View style={authStyles.header}>
            <Text style={authStyles.headerTitle}>SparringCompanion</Text>
            <Text style={authStyles.headerSubtitle}>Deviens ton propre coach en sports de combat</Text>
          </View>

          <View style={authStyles.radioPills}>
            <TouchableOpacity
              style={[authStyles.radioPill, !showRegisterOrLogin && authStyles.radioPillSelected]}
              onPress={() => handleSwitch(false)}
            >
              <Text style={[authStyles.radioPillText, !showRegisterOrLogin && authStyles.radioPillTextSelected]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[authStyles.radioPill, showRegisterOrLogin && authStyles.radioPillSelected]}
              onPress={() => handleSwitch(true)}
            >
              <Text style={[authStyles.radioPillText, showRegisterOrLogin && authStyles.radioPillTextSelected]}>Register</Text>
            </TouchableOpacity>
          </View>

          {!showRegisterOrLogin ? (
            <View style={authStyles.formSection}>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>Email</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="votre@email.com"
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                />
              </View>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>Mot de passe</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="••••••••"
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                />
              </View>
              <TouchableOpacity style={authStyles.buttonPrimary} disabled={loading} onPress={() => LogInWithEmail()}>
                <Text style={authStyles.buttonPrimaryText}>Se connecter</Text>
              </TouchableOpacity>
              <View style={authStyles.bottomLinkContainer}>
                <Text style={authStyles.bottomLinkText} onPress={() => handleSwitch(true)}>
                  Pas encore de compte ? Créer un compte
                </Text>
              </View>
            </View>
          ) : (
            <View style={authStyles.formSection}>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>Email</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="votre@email.com"
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                />
              </View>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>Mot de passe</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                  placeholder="••••••••"
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                />
              </View>
              <TouchableOpacity style={authStyles.buttonPrimary} disabled={loading} onPress={() => RegisterWithEmail()}>
                <Text style={authStyles.buttonPrimaryText}>Créer un compte</Text>
              </TouchableOpacity>
              <View style={authStyles.bottomLinkContainer}>
                <Text style={authStyles.bottomLinkText}>
                  Mot de passe oublié ?
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}
export default AuthScreen
