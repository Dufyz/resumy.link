"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { signUpSchema, SignUpSchema } from "../../schemas/sign-up-schema";
import { signUp } from "../../actions/sign-up-action";
import { useState } from "react";

export function SignUpForm() {
  const [mode, setMode] = useState<"sign-up" | "verify-email">("sign-up");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({ email, password }: SignUpSchema) {
    try {
      setIsLoading(true);
      await signUp(email, password);
      setMode("verify-email");
    } catch {
      form.setError("root", {
        message: "Ocorreu um erro ao criar sua conta",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (mode === "verify-email") {
    return (
      <div className="space-y-6">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="ml-3">
            <p>
              Enviamos um email para <br />
              <span className="font-medium">{form.getValues("email")}</span>
              <br />
              Clique no link de verificação para ativar sua conta.
            </p>
          </AlertDescription>
        </Alert>

        <div className="text-sm text-center text-muted-foreground">
          Já verificou seu email?{" "}
          <Link href="/login" className="text-[#9333EA] hover:text-[#8829E0]">
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  className="h-12 text-base"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Senha"
                  type="password"
                  className="h-12 text-base"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Confirmar senha"
                  type="password"
                  className="h-12 text-base"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-red-500">{form.formState.errors.root.message}</p>
        )}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-[#9333EA] hover:bg-[#8829E0]"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>
      <div className="space-y-4 text-sm text-center">
        <div className="text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-[#9333EA] hover:text-[#8829E0]">
            Entrar
          </Link>
        </div>
      </div>
    </Form>
  );
}
