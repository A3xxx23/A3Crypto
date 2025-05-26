import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_PROJECT_URL_SUPABASE;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseURL || !supabaseKey) {
  throw new Error("Supabase URL and API Key must be defined in environment variables.");
}

console.log("Supabase URL:", supabaseURL);
console.log("Supabase Key:", supabaseKey);

export const supabase = createClient(supabaseURL, supabaseKey);