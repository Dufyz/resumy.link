"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserForm } from "./components/user-form";
import { PortfolioForm } from "./components/portfolio-form";
import { ProgressSteps } from "./components/progress-steps";
import type { CreateUserSchema } from "@/schemas/user-schema";
import type { CreatePortfolioSchema } from "@/schemas/portfolio-schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useOnboarding } from "@/providers/onboarding-provider";
import { postOnboarding } from "@/queries/onboarding-queries";
import useUser from "@/hooks/useUser";
import usePortfolio from "@/hooks/usePortfolio";

const steps = [
  "Configuração da Conta",
  "Detalhes do Portfólio",
  "Tudo Pronto!",
];

export default function OnboardingPage() {
  const { session } = useOnboarding();
  const { setUser } = useUser();
  const { setPortfolio } = usePortfolio();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [formData, setFormData] = useState({
    user: {
      name: "",
      email: session?.user.email,
    } as CreateUserSchema,
    portfolio: {
      username: "",
      title: "",
      bio: null,
      avatar_path: null,
    } as CreatePortfolioSchema,
  });

  const handleUserSubmit = (data: CreateUserSchema) => {
    setFormData((prev) => ({
      ...prev,
      user: data,
      portfolio: {
        ...prev.portfolio,
        title: data.name,
      },
    }));

    setStep(1);
  };

  const handlePortfolioSubmit = async (data: CreatePortfolioSchema) => {
    setFormData((prev) => ({ ...prev, portfolio: data }));
    setStep(2);
    setIsLoading(true);

    try {
      const responseOrError = await postOnboarding({
        user: formData.user,
        portfolio: data,
      });

      if (responseOrError.isFailure()) return;

      const { user, portfolio } = responseOrError.value;

      setUser(user);
      setPortfolio(portfolio);

      setIsComplete(true);
    } catch (error) {
      console.error("Erro ao criar usuário e portfólio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="w-full max-w-2xl rounded-xl border bg-card p-8 shadow-lg">
        <ProgressSteps currentStep={step} steps={steps} />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <UserForm
              key="user"
              defaultValues={formData.user}
              onSubmit={handleUserSubmit}
            />
          )}

          {step === 1 && (
            <PortfolioForm
              key="portfolio"
              defaultValues={formData.portfolio}
              onSubmit={handlePortfolioSubmit}
              onBack={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {isLoading && (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-muted-foreground">
                    Criando seu portfólio...
                  </p>
                </div>
              )}
              {isComplete && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight">
                    🎉 Tudo pronto!
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Seu portfólio foi criado com sucesso.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/admin")}
                    className="mt-6"
                  >
                    Ir para o Dashboard
                  </Button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
