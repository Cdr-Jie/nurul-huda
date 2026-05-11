import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL= "https://itbnyysxbwhxaaxzhyap.supabase.co";
const VITE_SUPABASE_PUBLISHABLE_KEY= "sb_publishable_Qjx9bKKzvB4DmsHrtSSupQ_qw-jerAf";
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY);