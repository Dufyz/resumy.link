"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Code, Globe, Share2, Zap } from "lucide-react";
import { redirect } from "next/navigation";

const features = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Destaque seu trabalho ",
    description:
      "Adicione respositórios, portfólios visuais, artigos, vídeos e muito mais para mostrar o que você faz de melhor.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Domínio personalizado",
    description:
      "Use seu próprio domínio ou nosso subdomínio gratuito para seu portfólio.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Compartilhe em qualquer Lugar",
    description:
      "Adicione o link do seu portfólio ao GitHub, LinkedIn, Twitter e outros perfis sociais.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Analytics",
    description:
      "Acompanhe visitas, cliques e engajamento com o painel de análise integrado.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Feito para profissionais</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crie seu portfólio digital e destaque sua trajetória. Seja você um
            developer, designer, fotógrafo, escritor ou qualquer outro
            profissional, Resumy.link ajuda você a se conectar com
            oportunidades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-white hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Pronto para mostrar seu talento ?
              </h2>
              <p className="text-gray-300">
                Junte-se a milhares de profissionais que já estão usando
                Resumy.link para compartilhar seu trabalho e se conectar com
                oportunidades.
              </p>
              <Button
                onClick={() => {
                  redirect("/login?mode=sign-up");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg"
              >
                Começar agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
