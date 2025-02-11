"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SignInForm } from "./components/forms/sign-in-form";
import { SignUpForm } from "./components/forms/sign-up-form";
import { ForgotPasswordForm } from "./components/forms/forgot-password-form";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";

const titles = {
  "sign-in": "Seja bem vindo de volta!",
  "sign-up": "Crie sua conta",
  "forgot-password": "Recupere sua senha",
} as const;

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthPageConent />
    </Suspense>
  );
}

function AuthPageConent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as AuthMode;

  const allowedModes: AuthMode[] = ["sign-in", "sign-up", "forgot-password"];
  const currentMode = allowedModes.includes(mode) ? mode : "sign-in";

  return (
    <Suspense>
      <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {titles[currentMode]}
                </h1>
              </div>
            </div>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
              }
            >
              {currentMode === "sign-in" && <SignInForm />}
              {currentMode === "sign-up" && <SignUpForm />}
              {currentMode === "forgot-password" && <ForgotPasswordForm />}
            </Suspense>
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
    </Suspense>
  );
}
