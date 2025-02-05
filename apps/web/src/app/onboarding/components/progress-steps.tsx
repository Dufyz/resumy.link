"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

export function ProgressSteps({ currentStep, steps }: ProgressStepsProps) {
  return (
    <div className="relative mb-12">
      <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border" />
      <div
        className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-primary transition-all duration-500"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />
      <div className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isCurrent = currentStep === index;

          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted
                    ? "hsl(var(--primary))"
                    : "hsl(var(--background))",
                  borderColor: isCompleted
                    ? "hsl(var(--primary))"
                    : isCurrent
                    ? "hsl(var(--primary))"
                    : "hsl(var(--border))",
                  scale: isCurrent ? 1.1 : 1,
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background text-sm font-medium"
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <span
                    className={
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {index + 1}
                  </span>
                )}
              </motion.div>
              <span className="text-xs font-medium text-muted-foreground">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
