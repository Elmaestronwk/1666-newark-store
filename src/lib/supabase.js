import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

// Supabase anon keys can be:
//   - Legacy JWT format: starts with "eyJ"
//   - New publishable format: starts with "sb_publishable_"
const isValidKey = supabaseAnonKey && (
  supabaseAnonKey.startsWith('eyJ') ||
  supabaseAnonKey.startsWith('sb_publishable_')
);
const isValidUrl = supabaseUrl &&
  supabaseUrl !== 'YOUR_SUPABASE_PROJECT_URL' &&
  supabaseUrl.startsWith('https://');

const mockClient = {
  from: () => ({
    select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
    insert: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
    update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
    upsert: () => Promise.resolve({ error: null }),
  }),
  storage: { from: () => ({ upload: () => Promise.resolve({ error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) }
};

let supabase;

if (!isValidUrl || !isValidKey) {
  console.warn('[1666] Supabase not configured — running in offline mode.');
  supabase = mockClient;
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('[1666] Supabase connected to:', supabaseUrl);
  } catch (err) {
    console.warn('[1666] Supabase client init failed:', err.message);
    supabase = mockClient;
  }
}

export { supabase };
