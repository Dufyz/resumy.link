"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Folder, Loader2 } from "lucide-react";
import {
  CreatePortfolioSectionSchema,
  createPortfolioSectionSchema,
} from "../../../../../schemas/portfolio-section-schema";
import { PORTFOLIO_SECTION_TYPES } from "../../../data/portfolio-section-types-data";
import { PortfolioSectionType } from "@/types/portfolio-section-type";
import { Portfolio } from "@/types/portfolio-type";
import { postPortfolioSection } from "@/queries/portfolio-section-queries";
import { cn } from "@/lib/utils";
import usePortfolio from "@/hooks/usePortfolio";

export function CreatePortfolioSectionModal({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPortfolioSection } = usePortfolio();

  const form = useForm<CreatePortfolioSectionSchema>({
    resolver: zodResolver(createPortfolioSectionSchema),
    defaultValues: {
      portfolio_id: portfolio.id,
      is_active: true,
      title: "Educação",
      type: "education",
    },
  });

  async function onSubmit(data: CreatePortfolioSectionSchema) {
    try {
      setIsSubmitting(true);
      const { portfolio_section } = await postPortfolioSection(data);

      createPortfolioSection(portfolio_section);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao criar seção:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline" className="w-full">
          <Folder className="mr-2 h-4 w-4" />
          Adicionar nova seção
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar nova seção</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="sectionTitle">
              Título da Seção
            </label>
            <Input
              id="sectionTitle"
              {...form.register("title")}
              placeholder="ex: Mídias Sociais, Projetos, Contato"
              disabled={isSubmitting || true}
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div> */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Categoria de Seção</label>
            <Select
              onValueChange={(value) => {
                const selectedType = PORTFOLIO_SECTION_TYPES.find(
                  (type) => type.value === value
                );
                if (selectedType) {
                  form.setValue("title", selectedType.label);
                  form.setValue(
                    "type",
                    selectedType.value as PortfolioSectionType
                  );
                }
              }}
              value={form.watch("type")}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent defaultValue={"Educa"}>
                {PORTFOLIO_SECTION_TYPES.map((type, index) => (
                  <SelectItem key={index} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Ativar Seção</label>
            <Switch
              checked={form.watch("is_active")}
              onCheckedChange={(value) => form.setValue("is_active", value)}
              disabled={isSubmitting}
            />
          </div>
          <Button
            className={cn("w-full bg-purple-600 hover:bg-purple-700", {
              "cursor-not-allowed opacity-70": isSubmitting,
            })}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Adicionando...</p>
              </>
            )}
            {!isSubmitting && <p>Adicionar Seção</p>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
