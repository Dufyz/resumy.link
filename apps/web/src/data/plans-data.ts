import { STRIPE_PRICES } from "@/config";
import { UserPlanType } from "@/types/user-type";

export const PLANS: {
  plan: UserPlanType;
  nome: string;
  preco: string;
  periodo?: string;
  recursos: string[];
  cta: string;
  popular: boolean;
  price_id: string | null;
}[] = [
  {
    plan: "free",
    nome: "Curioso",
    preco: "Grátis",
    recursos: ["1 página de portfólio preview"],
    cta: "Começar",
    popular: false,
    price_id: null,
  },
  {
    plan: "standard",
    nome: "Profissional",
    preco: "R$11,99",
    periodo: "/portfólio",
    recursos: [
      "1 página de portfólio",
      "Análises avançadas",
      "Suporte prioritário",
    ],
    cta: "Comprar agora",
    popular: true,
    price_id: STRIPE_PRICES.standard,
  },
  {
    plan: "lifetime",
    nome: "Apoiador",
    preco: "R$99,99",
    recursos: [
      "Páginas de portfólio ilimitadas",
      "Análises avançadas",
      "Domínios personalizados",
      "Suporte prioritário",
      "CSS personalizado",
      "Funcionalidades futuras",
    ],
    cta: "Comprar agora",
    popular: false,
    price_id: STRIPE_PRICES.lifetime,
  },
];
