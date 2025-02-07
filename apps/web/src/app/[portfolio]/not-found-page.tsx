"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Code } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8"
      >
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-8xl font-bold bg-gradient-to-r from-[#4B7BF5] to-[#8B5CF6] text-transparent bg-clip-text mb-4"
        >
          404
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Oops! Parece que esta página não existe.
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Gostaria de usar este nome de usuário para criar uma nova página?
            Crie seu portfólio e mostre ao mundo o que você pode fazer!
          </p>
        </div>

        {/* Botões de navegação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            variant="default"
            className="bg-[#4B7BF5] hover:bg-[#3D63C9] text-white w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar para casa
            </Link>
          </Button>

          <Button
            variant="outline"
            className="border-[#4B7BF5] text-[#4B7BF5] hover:bg-[#4B7BF5] hover:text-white w-full sm:w-auto"
            asChild
          >
            <Link href="/login">
              <Code className="mr-2 h-4 w-4" />
              Criar portfólio
            </Link>
          </Button>
        </div>

        {/* Elemento de fundo animado */}
        <motion.div
          className="absolute inset-0 -z-10 overflow-hidden"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTI1MjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJsLTIgMnYtNGwyIDJzMi0yIDItNGMwLTItMi00LTItNHMtMiAyLTQgMmwtMi0ydjRsMi0ycy0yIDItMiA0YzAgMiAyIDQgMiA0czIgMiA0IDJsMi0ydjRsLTItMnMtMi0yIDItNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        </motion.div>
      </motion.div>
    </div>
  );
}
