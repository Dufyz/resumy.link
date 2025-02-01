"use server";

import { createClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function signInWithProvider(
  provider: Provider,
  callbackUrl: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: callbackUrl,
    },
  });

  if (error) throw error;

  return;
}
