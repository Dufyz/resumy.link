"use client";

import { createContext, ReactNode, useContext } from "react";
import { Session } from "@supabase/supabase-js";

const OnboardingContext = createContext<{
  session: Session | null;
} | null>(null);

export function OnboardingProvider({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  const value = {
    session,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return context;
}
