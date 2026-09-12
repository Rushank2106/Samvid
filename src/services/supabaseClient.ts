import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper storage keys for client-side state persistence when offline/mock
export const STORAGE_KEYS = {
  PROFILE: 'samvida_user_profile',
  SAVED_SCHEMES: 'samvida_saved_schemes',
  APPLICATION_TRACKER: 'samvida_app_tracker',
  REMINDERS: 'samvida_reminders',
  LANGUAGE: 'samvida_lang'
};
