import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_PROJECT_URL_SUPABASE;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);