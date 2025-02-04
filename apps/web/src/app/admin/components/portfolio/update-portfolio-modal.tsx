import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Portfolio } from "@/types/portfolio-type";
import {
  UpdatePortfolioSchema,
  updatePortfolioSchema,
} from "../../../../schemas/portfolio-schema";
import { patchPortfolio } from "@/queries/portfolio-queries";
import { usePortfolioStore } from "@/stores/portfolio-store";

export function UpdatePortfolioModal({ portfolio }: { portfolio: Portfolio }) {
  const [open, setOpen] = useState(false);

  const updatePortfolio = usePortfolioStore((state) => state.updatePortfolio);

  const form = useForm<UpdatePortfolioSchema>({
    resolver: zodResolver(updatePortfolioSchema),
    defaultValues: {
      title: portfolio.title,
      username: portfolio.username,
      bio: portfolio.bio,
      avatar_path: portfolio.avatar_path,
    },
  });

  async function onSubmit(data: UpdatePortfolioSchema) {
    const { portfolio: response } = await patchPortfolio(portfolio.id, data);

    updatePortfolio(response);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nome e biografia</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="profileTitle">
              Nome de exibição
            </label>
            <Input
              id="profileTitle"
              {...form.register("title")}
              placeholder="Digite seu nome"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.title?.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="bio">
              Biografia
            </label>
            <Textarea
              id="bio"
              {...form.register("bio")}
              className="resize-none"
              maxLength={80}
            />
            {form.formState.errors.bio && (
              <p className="text-sm text-red-500">
                {form.formState.errors.bio?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
