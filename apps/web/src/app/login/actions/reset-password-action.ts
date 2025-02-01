"use server";

import { NEXT_PUBLIC_WEB_URL } from "@/config";
import { createClient } from "@/lib/supabase/server";
import { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function forgotPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${NEXT_PUBLIC_WEB_URL}/login/reset-password`,
  });

  if (error) throw error;
}

export async function resetPassword(password: string, session: Session) {
  const supabase = await createClient();

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  if (sessionError) {
    throw new Error(sessionError.message);
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin");
}
