import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

try {
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_PROJECT_URL') {
    throw new Error('Supabase credentials missing');
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
  console.warn('Supabase initialization failed:', err.message);
  // Mock client to prevent crashes
  supabase = {
    from: () => ({ select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }), insert: () => ({ select: () => Promise.resolve({ data: [], error: null }) }), update: () => ({ eq: () => ({ select: () => Promise.resolve({ data: [], error: null }) }) }), delete: () => ({ eq: () => Promise.resolve({ error: null }) }) }),
    storage: { from: () => ({ upload: () => Promise.resolve({ error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) }
  };
}

export { supabase };
