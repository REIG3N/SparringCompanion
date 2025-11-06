import { AppState, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import authStyles from './authStyle'
import { useRouter } from 'expo-router'
import { supabase } from "../../utils/supabase"
import i18n, { changeLanguage } from '@/src/i18n'
import { COLORS, globalStyles } from '../../utils/globalStyles'

// no flags/images used on Auth anymore

const AuthScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRegisterOrLogin, setShowRegisterOrLogin] = useState(false)
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(null)
  // No default language selection - user must choose explicitly

  // no asset preloading

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
      Alert.alert(i18n.t('auth.title'), i18n.t('auth.errors.generic'))
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
          i18n.t('auth.errors.account_not_found_title'),
          i18n.t('auth.errors.account_not_found_message')
        );
      } else {
        Alert.alert(i18n.t('auth.title'), i18n.t('auth.errors.generic'));
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
            <Text style={authStyles.headerTitle}>{i18n.t('common.app_name')}</Text>
            <Text style={authStyles.headerSubtitle}>{i18n.t('auth.subtitle')}</Text>
          </View>

          {/* Language selection moved to Register only (after password) */}

          <View style={authStyles.radioPills}>
            <TouchableOpacity
              style={[authStyles.radioPill, !showRegisterOrLogin && authStyles.radioPillSelected]}
              onPress={() => handleSwitch(false)}
            >
              <Text style={[authStyles.radioPillText, !showRegisterOrLogin && authStyles.radioPillTextSelected]}>{i18n.t('auth.login')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[authStyles.radioPill, showRegisterOrLogin && authStyles.radioPillSelected]}
              onPress={() => handleSwitch(true)}
            >
              <Text style={[authStyles.radioPillText, showRegisterOrLogin && authStyles.radioPillTextSelected]}>{i18n.t('auth.register')}</Text>
            </TouchableOpacity>
          </View>

          {!showRegisterOrLogin ? (
            <View style={authStyles.formSection}>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>{i18n.t('settings.email')}</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder={i18n.t('auth.email_placeholder')}
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                />
              </View>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>{i18n.t('settings.password')}</Text>
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
                <Text style={authStyles.buttonPrimaryText}>{i18n.t('auth.login_cta')}</Text>
              </TouchableOpacity>
              <View style={authStyles.bottomLinkContainer}>
                <Text style={authStyles.bottomLinkText} onPress={() => handleSwitch(true)}>
                {i18n.t('auth.register_redirect')}
                </Text>
              </View>
            </View>
          ) : (
            <View style={authStyles.formSection}>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>{i18n.t('settings.email')}</Text>
                <TextInput
                  style={authStyles.input}
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder={i18n.t('auth.email_placeholder')}
                  placeholderTextColor={'#757575'}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                />
              </View>
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>{i18n.t('settings.password')}</Text>
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
              {/* Language selection appears here for Register only */}
              <View style={authStyles.formGroup}>
                <Text style={authStyles.label}>{i18n.t('auth.language')}</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity onPress={async () => { setSelectedLang('fr'); await changeLanguage('fr'); }} style={{ flex: 1 }}>
                    <View style={[globalStyles.buttonOutline, selectedLang === 'fr' && { borderColor: COLORS.secondary }]}>
                      <Text style={[globalStyles.buttonOutlineText, selectedLang === 'fr' && { color: COLORS.secondary }]}>FR</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={async () => { setSelectedLang('en'); await changeLanguage('en'); }} style={{ flex: 1 }}>
                    <View style={[globalStyles.buttonOutline, selectedLang === 'en' && { borderColor: COLORS.secondary }]}>
                      <Text style={[globalStyles.buttonOutlineText, selectedLang === 'en' && { color: COLORS.secondary }]}>EN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={authStyles.buttonPrimary} disabled={loading || !selectedLang} onPress={() => {
                if (!selectedLang) { Alert.alert(i18n.t('auth.title'), i18n.t('auth.required')); return; }
                RegisterWithEmail();
              }}>
                <Text style={authStyles.buttonPrimaryText}>{i18n.t('auth.register_cta')}</Text>
              </TouchableOpacity>
              <View style={authStyles.bottomLinkContainer}>
                <Text style={authStyles.bottomLinkText}>
                {i18n.t('auth.forgotten_password')}
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
