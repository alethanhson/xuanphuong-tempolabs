import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const createClient = async () => {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );

  return supabase;
};
