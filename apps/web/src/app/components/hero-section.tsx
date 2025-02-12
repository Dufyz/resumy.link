"use client";

import { Button } from "@/components/ui/button";
import { Terminal, ArrowRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm">
            <Terminal className="w-4 h-4" />
            <span>Seu portfólio profissional</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Seu trabalho. Sua história. Um link.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
            Crie um portfólio impressionante que mostra seus projetos,
            habilidades e experiência. Compartilhe em qualquer lugar com um
            único link e deixe seu trabalho falar por você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="resumy.link/username"
                className="w-full sm:w-64 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              onClick={() => {
                redirect("/login?mode=sign-up");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-lg inline-flex items-center gap-2 group"
            >
              Criar meu portfólio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-3xl transform rotate-6"></div>
          <Image
            src="/hero-section.png"
            alt="Portfolio Preview"
            fill
            quality={100}
            className="object-cover rounded-md transform -rotate-6 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
