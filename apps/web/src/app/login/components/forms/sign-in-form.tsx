"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SignInSchema, signInSchema } from "../../schemas/sign-in-schema";
import { useState } from "react";
import { signIn } from "../../actions/sign-in-action";
import { IconBrandGithub, IconBrandGoogleFilled } from "@tabler/icons-react";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: SignInSchema) {
    try {
      setIsLoading(true);
      await signIn(email, password);

      router.push("/admin");
    } catch {
      form.setError("root", { message: "Ocorreu um erro ao fazer login" });
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, "/admin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
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
          {form.formState.errors.root && (
            <p className="text-sm text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-[#9333EA] hover:bg-[#8829E0]"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">OU</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <IconBrandGoogleFilled />
          <p>Continuar com Google</p>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full h-12"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading}
        >
          <IconBrandGithub />
          <p>Continuar com Github</p>
        </Button>
      </div>

      <div className="space-y-4 text-sm text-center">
        <div className="space-x-1">
          <Link
            href="/login?mode=forgot-password"
            className="text-[#9333EA] hover:text-[#8829E0]"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <div className="text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            href="/login?mode=sign-up"
            className="text-[#9333EA] hover:text-[#8829E0]"
          >
            Inscrever-se
          </Link>
        </div>
      </div>
    </div>
  );
}
