"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../actions/reset-password-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../../schemas/forgot-password-schema";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordSchema) {
    try {
      setIsLoading(true);
      await forgotPassword(values.email);
      setSuccess(true);
    } catch {
      form.setError("root", {
        message: "Ocorreu um erro ao enviar o email de recuperação",
      });
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                  className="h-12 text-base"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success ? (
          <p className="text-green-700">Email de recuperação enviado.</p>
        ) : (
          form.formState.errors.root && (
            <p className="text-red-500">{form.formState.errors.root.message}</p>
          )
        )}
        <Button
          type="submit"
          className="w-full h-12 text-base font-medium bg-[#9333EA] hover:bg-[#8829E0]"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar email de recuperação"}
        </Button>
      </form>
      <div className="space-y-4 text-sm text-center">
        <div className="text-muted-foreground">
          Voltar para o login ?{" "}
          <Link href="/login" className="text-[#9333EA] hover:text-[#8829E0]">
            Entrar
          </Link>
        </div>
      </div>
    </Form>
  );
}
