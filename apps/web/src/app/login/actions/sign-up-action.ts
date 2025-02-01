"use server";

import { NEXT_PUBLIC_WEB_URL } from "@/config";
import { createClient } from "@/lib/supabase/server";

export async function signUp(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${NEXT_PUBLIC_WEB_URL}/login`,
    },
  });

  if (error) throw error;

  return data;
}
