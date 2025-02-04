"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function SplashScreen() {
  const { isLoading } = useAuth();

  return (
    <AnimatePresence>
      {(isLoading || !isLoading) && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div className="relative z-10">
                <Code2 className="w-16 h-16 text-blue-500" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mt-8 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text"
            >
              DevLinks
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              exit={{ width: 0 }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: "easeInOut",
              }}
              className="h-1 bg-blue-500/20 rounded-full mt-6 overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  ease: "linear",
                }}
                className="w-1/2 h-full bg-blue-500"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
