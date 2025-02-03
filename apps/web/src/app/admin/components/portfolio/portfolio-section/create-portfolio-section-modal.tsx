"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Folder } from "lucide-react";
import {
  CreatePortfolioSectionSchema,
  createPortfolioSectionSchema,
} from "../../../../../schemas/portfolio-section-schema";
import { SectionTypeData } from "../../../data/section-type-data";
import { PortfolioSectionType } from "@/types/portfolio-section-type";
import { Portfolio } from "@/types/portfolio-type";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { postPortfolioSection } from "@/queries/portfolio-section-queries";

export function CreatePortfolioSectionModal({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const [open, setOpen] = useState(false);

  const createPortfolioSection = usePortfolioStore(
    (state) => state.createPortfolioSection
  );

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
    const { portfolio_section } = await postPortfolioSection(data);

    createPortfolioSection(portfolio_section);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full">
          <Folder className="mr-2 h-4 w-4" />
          Adicionar nova sessão
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
            <label className="text-sm font-medium" htmlFor="sectionTitle">
              Título da Seção
            </label>
            <Input
              id="sectionTitle"
              {...form.register("title")}
              placeholder="ex: Mídias Sociais, Projetos, Contato"
              disabled
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tipo de Seção</label>
            <Select
              onValueChange={(value) => {
                const selectedType = SectionTypeData.find(
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
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent defaultValue={"Educa"}>
                {SectionTypeData.map((type, index) => (
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
            />
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            type="submit"
          >
            Adicionar Seção
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
