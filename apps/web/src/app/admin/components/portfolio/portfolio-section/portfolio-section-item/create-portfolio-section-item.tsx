import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePortfolioSectionItemSchema,
  createPortfolioSectionItemSchema,
} from "@/schemas/portfolio-section-item-schema";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { postPortfolioSectionItem } from "@/queries/portfolio-section-item-queries";

export function CreatePortfolioSectionItem() {
  const [open, setOpen] = useState(false);

  const createPortfolioSectionItem = usePortfolioStore(
    (state) => state.createPortfolioSectionItem
  );

  const form = useForm<CreatePortfolioSectionItemSchema>({
    resolver: zodResolver(createPortfolioSectionItemSchema),
    defaultValues: {},
  });

  async function onSubmit(data: CreatePortfolioSectionItemSchema) {
    const { portfolio_section_item } = await postPortfolioSectionItem(data);

    createPortfolioSectionItem(portfolio_section_item);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar novo item</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="linkTitle">
              Título
            </label>
            <Input
              id="linkTitle"
              {...form.register("title")}
              placeholder="ex: Meu Portfólio"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            type="submit"
          >
            Adicionar Link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
