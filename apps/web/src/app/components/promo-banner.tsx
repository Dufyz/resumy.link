"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 relative">
      <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
        <div className="text-2xl">⚡️</div>
        <div className="text-center">
          <span className="font-semibold">Lançamento Especial</span>
          <span className="mx-2">Crie seu portfólio gratuitamente</span>
        </div>
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
          Comece Agora
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-blue-500/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
