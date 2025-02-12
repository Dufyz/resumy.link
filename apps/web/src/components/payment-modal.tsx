"use client";

import { Check, Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { PLANS } from "@/data/plans-data";
import { postCreateStripeCheckoutSession } from "@/queries/stripe-queries";
import useUser from "@/hooks/useUser";
import { useState } from "react";

interface PricingCardProps {
  nome: string;
  preco: string;
  plan: "free" | "standard" | "lifetime";
  periodo?: string;
  recursos: string[];
  cta: string;
  popular?: boolean;
  disabled?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  nome,
  plan,
  preco,
  periodo,
  recursos,
  cta,
  popular,
  disabled,
}) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  async function handlePlanSelection() {
    if (!user) return;
    if (plan === "free") return;

    try {
      setIsLoading(true);

      const checkoutSessionOrError = await postCreateStripeCheckoutSession({
        email: user.email,
        price: plan,
      });

      if (checkoutSessionOrError.isFailure()) return;

      const { session } = checkoutSessionOrError.value;

      if (!session.url) return;

      window.open(session.url, "_self");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={`bg-white flex flex-col p-4 md:p-6 rounded-2xl shadow-lg border-2 ${
        popular ? "border-blue-500" : "border-transparent"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex flex-col gap-4 md:gap-6 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xl md:text-2xl font-bold">{nome}</h3>
        </div>
        <div>
          <span className="text-3xl md:text-4xl font-bold">{preco}</span>
          {periodo && (
            <span className="text-muted-foreground text-sm">{periodo}</span>
          )}
        </div>

        <ul className="flex flex-col gap-3">
          {recursos.map((recurso, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm md:text-base">{recurso}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handlePlanSelection}
        className={`w-full py-4 md:py-6 text-base md:text-lg mt-6 md:mt-8 ${
          popular
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        }`}
        disabled={disabled}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Carregando...</span>
          </div>
        ) : (
          <p>{cta}</p>
        )}
      </Button>
    </div>
  );
};

export default function PaymentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex gap-2 items-center">
          <Crown className="h-5 w-5 text-yellow-500" />
          Faça upgrade agora
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-5xl p-4 md:p-6 h-[90vh] md:h-auto">
        <div className="space-y-6 md:space-y-8 h-full flex flex-col">
          <div className="text-center">
            <DialogTitle className="text-3xl md:text-4xl font-bold tracking-tight">
              Escolha seu plano
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">
              Crie portfolios profissionais e destaque-se no mercado
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 overflow-y-auto flex-1 pr-2">
            {PLANS.slice(1).map((plano, index) => (
              <PricingCard
                key={index}
                plan={plano.plan}
                nome={plano.nome}
                preco={plano.preco}
                periodo={plano.periodo}
                recursos={plano.recursos}
                cta={plano.cta}
                popular={plano.popular}
                disabled={plano.plan === "lifetime"}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
