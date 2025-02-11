"use server";

import { NEXT_PUBLIC_WEB_URL } from "@/config";
import { createClient } from "@/lib/supabase/server";
import { Provider } from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (e) {
    console.error(e);
  }
}

export async function signInWithProvider(provider: Provider) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${NEXT_PUBLIC_WEB_URL}/auth/callback`,
      },
    });

    if (error) throw error;

    return data;
  } catch (e) {
    console.log(e);
  }
}
