"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL,
} from "@/config";

export default function useSupabase() {
  const supabase = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      console.log("event", event);

      if (event === "SIGNED_IN") {
        console.log("User signed in");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return supabase;
}
