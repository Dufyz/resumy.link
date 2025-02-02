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
  EditPortfolioSchema,
  editPortfolioSchema,
} from "../../schemas/portfolio-schema";

const portfolio: Portfolio = {
  id: 1,
  user_id: 1,
  name: "Guilherme Iago Schmidt Thomaz",
  username: "dufyz",
  bio: "Engenheiro de software",
  avatar_path: null,
  created_at: new Date(),
  updated_at: new Date(),
};

export function EditPortfolioModal() {
  const [open, setOpen] = useState(false);

  const form = useForm<EditPortfolioSchema>({
    resolver: zodResolver(editPortfolioSchema),
    values: {
      name: portfolio.name,
      bio: portfolio.bio,
      avatar_path: portfolio.avatar_path,
    },
  });

  const onSubmit = (data: EditPortfolioSchema) => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
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
              {...form.register("name")}
              placeholder="Digite seu nome"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
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
              placeholder="Engenheiro de software"
              className="resize-none"
              maxLength={80}
            />
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
