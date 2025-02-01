"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../actions/reset-password-action";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../../schemas/reset-password-schema";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";

export function ResetPasswordForm({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({ password }: ResetPasswordSchema) {
    try {
      setIsLoading(true);
      await resetPassword(password, session);
      setSuccess(true);
    } catch {
      form.setError("root", {
        message: "Ocorreu um erro ao redefinir a senha",
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Nova senha"
                  type="password"
                  disabled={isLoading}
                  className="h-12 text-base"
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
                  placeholder="Confirme a nova senha"
                  type="password"
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
          <p className="text-green-500">Senha redefinida com sucesso!</p>
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
          {isLoading ? "Redefinindo..." : "Redefinir senha"}
        </Button>
      </form>
    </Form>
  );
}
