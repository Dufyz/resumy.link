"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Check, X, Loader2 } from "lucide-react";
import {
  createPortfolioSchema,
  CreatePortfolioSchema,
} from "@/schemas/portfolio-schema";
import { postCheckPortfolioUsernameAvailability } from "@/queries/portfolio-queries";
import useDebounce from "@/hooks/useDebounce";

export function PortfolioForm({
  defaultValues,
  onSubmit,
  onBack,
}: {
  defaultValues: CreatePortfolioSchema;
  onSubmit: (values: CreatePortfolioSchema) => void;
  onBack: () => void;
}) {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

  const form = useForm<CreatePortfolioSchema>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues,
  });

  const username = form.watch("username");
  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    async function checkUsernameAvailability() {
      if (debouncedUsername.length < 3) {
        setIsUsernameAvailable(null);
        return;
      }

      setIsCheckingUsername(true);
      try {
        const availableOrError = await postCheckPortfolioUsernameAvailability(
          form.getValues("username")
        );

        if (availableOrError.isFailure()) return setIsUsernameAvailable(false);

        const { available } = availableOrError.value;
        setIsUsernameAvailable(available);
      } catch (error) {
        console.error("Erro ao verificar disponibilidade do username:", error);
        setIsUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }

    checkUsernameAvailability();
  }, [debouncedUsername, form]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Crie seu portfólio
        </h2>
        <p className="text-muted-foreground">
          Configure os detalhes do seu portfólio e escolha seu username único
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do Portfólio</FormLabel>
                <FormControl>
                  <Input placeholder="Meu Portfólio Criativo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Conte-nos sobre você..."
                    className="resize-none"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>
                  Isso será exibido na sua página de portfólio. Você pode
                  alterá-lo depois.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
                      resumy.link/
                    </span>
                    <Input
                      placeholder="seunome"
                      className="pl-24 pr-10"
                      {...field}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isCheckingUsername && (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                      {!isCheckingUsername && isUsernameAvailable === true && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                      {!isCheckingUsername && isUsernameAvailable === false && (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  {isCheckingUsername && "Verificando disponibilidade..."}
                  {!isCheckingUsername &&
                    isUsernameAvailable === true &&
                    "Username disponível!"}
                  {!isCheckingUsername &&
                    isUsernameAvailable === false &&
                    "Username já está em uso."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={!isUsernameAvailable || isCheckingUsername}
            >
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
