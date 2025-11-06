import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const supabaseUrl = "https://fkhtvcnffawfzpmvjklw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZraHR2Y25mZmF3ZnpwbXZqa2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MzE4MDEsImV4cCI6MjA3NDEwNzgwMX0.IFKn13GXDWYchAJoD6GGXke-gb8d-RXZuFk6XoeR6oE";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});