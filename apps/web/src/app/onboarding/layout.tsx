import { createClient } from "@/lib/supabase/server";
import { OnboardingProvider } from "@/providers/onboarding-provider";
import { ReactNode } from "react";

export default async function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <OnboardingProvider session={session}>{children}</OnboardingProvider>;
}
