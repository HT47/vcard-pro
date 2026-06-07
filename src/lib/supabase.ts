import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback values during build time if environment variables are missing on the build server
const isConfigured = supabaseUrl && supabaseAnonKey;
const url = isConfigured ? supabaseUrl : 'https://placeholder-url.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(url, key);
