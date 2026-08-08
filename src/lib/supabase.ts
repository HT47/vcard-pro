import { createClient } from '@supabase/supabase-js';

const defaultUrl = 'https://ygkmsxgyyxbyqgfdpier.supabase.co';
const defaultAnonKey = 'sb_publishable_Ths6fYf6cIl0S-OK7aagBw_nqO8HiN_';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

