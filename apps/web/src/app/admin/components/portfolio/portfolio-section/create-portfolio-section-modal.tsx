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
      const portfolioSectionOrError = await postPortfolioSection(data);

      if (portfolioSectionOrError.isFailure()) return;

      const { portfolio_section } = portfolioSectionOrError.value;
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Categoria de Seção</label>
            <Select
              onValueChange={(value) => {
                const selectedType = PORTFOLIO_SECTION_TYPES[value];

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
                {Object.keys(PORTFOLIO_SECTION_TYPES).map((key) => {
                  const type = PORTFOLIO_SECTION_TYPES[key];
                  return (
                    <SelectItem key={key} value={type.value}>
                      {type.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <Button
            className={cn("w-full", {
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
