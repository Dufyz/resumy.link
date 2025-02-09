import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/data/plans-data";

export default function PricingSection() {
  return (
    <section className="py-20 px-4 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-bold">Preços simples e transparentes</h2>
          <p className="text-gray-600 max-w-2xl text-center">
            Escolha o plano certo para você começar a construir seu portfólio
            profissional hoje
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plano) => (
            <div
              key={plano.nome}
              className={`bg-white flex flex-col p-8 rounded-2xl shadow-lg border-2 ${
                plano.popular ? "border-blue-500" : "border-transparent"
              }`}
            >
              <div className="flex flex-col gap-6 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{plano.nome}</h3>
                </div>
                <div>
                  <span className="text-4xl font-bold">{plano.preco}</span>
                  {plano.periodo && (
                    <span className="text-muted-foreground text-sm">
                      {plano.periodo}
                    </span>
                  )}
                </div>

                <ul className="flex flex-col gap-3">
                  {plano.recursos.map((recurso, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{recurso}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className={`w-full py-6 text-lg mt-8 ${
                  plano.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
              >
                {plano.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
