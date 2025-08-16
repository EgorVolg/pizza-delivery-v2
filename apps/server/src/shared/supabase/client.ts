import { createClient } from '@supabase/supabase-js'
import { env } from 'process'

const supabaseUrl = env.SUPABASE_URL
const supabaseAnonKey = env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)