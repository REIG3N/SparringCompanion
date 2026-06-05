import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl = "https://mmgtrjhdgjutdfviupnw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tZ3RyamhkZ2p1dGRmdml1cG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NTM2NjYsImV4cCI6MjA5NjEyOTY2Nn0.oSF1X7jbMQZEulCz_ay75KN-NvapDSob-fxofTYtUNU";

// Détecter si on est sur le web (évalué dynamiquement)
const isWeb = () => {
  try {
    if (typeof Platform !== 'undefined' && Platform.OS === 'web') {
      return true;
    }
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  } catch {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
};

// Storage adaptatif pour web et mobile
const getStorage = () => {
  if (isWeb()) {
    // Sur le web, Supabase utilise localStorage par défaut
    // On peut retourner undefined pour utiliser le comportement par défaut
    // ou créer un wrapper localStorage
    return {
      getItem: (key) => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            return Promise.resolve(window.localStorage.getItem(key));
          }
        } catch (e) {
          console.warn('localStorage.getItem error:', e);
        }
        return Promise.resolve(null);
      },
      setItem: (key, value) => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, value);
            return Promise.resolve();
          }
        } catch (e) {
          console.warn('localStorage.setItem error:', e);
        }
        return Promise.resolve();
      },
      removeItem: (key) => {
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
            return Promise.resolve();
          }
        } catch (e) {
          console.warn('localStorage.removeItem error:', e);
        }
        return Promise.resolve();
      },
    };
  }
  // Utiliser AsyncStorage sur mobile
  return AsyncStorage;
};

// Configuration Supabase
const supabaseConfig = {
  auth: {
    storage: getStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseKey, supabaseConfig);
