import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY_ANON;

export const supabase = createClient(supabaseUrl, supabaseKey);