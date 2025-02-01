import { redirect } from "next/navigation";
import { ResetPasswordForm } from "../components/forms/reset-password-form";

import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  const supabase = await createClient();
  const code = searchParams.code;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/admin");
  }

  if (!code) {
    return redirect("/login");
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!session) {
      throw new Error("");
    }

    return (
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  Crie uma nova senha
                </h1>
              </div>
            </div>
            <ResetPasswordForm session={session} />
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700" />
          <div
            className="absolute inset-0 bg-lime-400"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 35% 100%)",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    );
  } catch {
    redirect("/login");
  }
}
