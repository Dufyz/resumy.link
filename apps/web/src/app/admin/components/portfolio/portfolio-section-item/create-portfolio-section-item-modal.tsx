import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import {
  CreatePortfolioSectionItemSchema,
  createPortfolioSectionItemSchema,
} from "@/schemas/portfolio-section-item-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PortfolioSection } from "@/types/portfolio-section-type";
import { postPortfolioSectionItem } from "@/queries/portfolio-section-item-queries";
import usePortfolio from "@/hooks/usePortfolio";
import { cn } from "@/lib/utils";

export function CreatePortfolioSectionItemModal({
  portfolioSection,
}: {
  portfolioSection: PortfolioSection;
}) {
  const [open, setOpen] = useState(false);

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPortfolioSectionItem } = usePortfolio();

  const form = useForm<CreatePortfolioSectionItemSchema>({
    resolver: zodResolver(createPortfolioSectionItemSchema),
    defaultValues: {
      portfolio_id: portfolioSection.portfolio_id,
      portfolio_section_id: portfolioSection.id,
      is_active: true,
      metadata: {
        type: portfolioSection.type,
        title: "",
        description: "",
        organization: "",
        start_date: undefined,
        end_date: null,
        url: null,
        skills: [],
        level: undefined,
      },
    },
  });

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const newSkills = [...skills, trimmedSkill];
      setSkills(newSkills);
      setSkillInput("");
      form.setValue("metadata.skills", newSkills);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    form.setValue("metadata.skills", newSkills);
  };

  const onSubmit = async (data: CreatePortfolioSectionItemSchema) => {
    try {
      setIsSubmitting(true);
      const portfolioSectionItemOrError = await postPortfolioSectionItem(data);

      if (portfolioSectionItemOrError.isFailure()) return;

      const { portfolio_section_item } = portfolioSectionItemOrError.value;
      createPortfolioSectionItem(portfolio_section_item);

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTypeSpecificFields = () => {
    switch (portfolioSection.type) {
      case "education":
      case "experience":
      case "course":
      case "certification":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">
                Organização
              </label>
              <Input
                {...form.register("metadata.organization")}
                placeholder="Nome da instituição"
              />
              {form.formState.errors?.metadata &&
                typeof form.formState.errors.metadata === "object" &&
                form.formState.errors.metadata !== null &&
                "organization" in form.formState.errors.metadata &&
                typeof form.formState.errors.metadata.organization ===
                  "object" &&
                form.formState.errors.metadata.organization !== null &&
                "message" in form.formState.errors.metadata.organization && (
                  <span>
                    {
                      form.formState.errors.metadata.organization
                        .message as string
                    }
                  </span>
                )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Data de Início
              </label>
              <Controller
                name="metadata.start_date"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="date"
                    onChange={(value) => {
                      const date = new Date(value.target.value);

                      field.onChange(date);
                    }}
                  />
                )}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium mb-2">
                  Data de Término
                </label>
                <div className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={isCurrent}
                      onChange={(e) => {
                        setIsCurrent(e.target.checked);
                        if (e.target.checked) {
                          form.setValue("metadata.end_date", null);
                        }
                      }}
                    />
                    <span className="ml-2">Atual</span>
                  </label>
                </div>
              </div>
              <Controller
                name="metadata.end_date"
                control={form.control}
                render={({ field }) => (
                  <Input
                    type="date"
                    disabled={isCurrent}
                    onChange={(value) => {
                      const date = new Date(value.target.value);

                      field.onChange(date);
                    }}
                  />
                )}
              />
            </div>
          </div>
        );

      case "project":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL do Projeto
              </label>
              <Input
                {...form.register("metadata.url")}
                placeholder="https://github.com/seu-projeto"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Habilidades
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Adicionar habilidade"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSkill}
                >
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "language":
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Nível</label>
            <Controller
              name="metadata.level"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                    <SelectItem value="native">Nativo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors?.metadata &&
              typeof form.formState.errors.metadata === "object" &&
              form.formState.errors.metadata !== null &&
              "level" in form.formState.errors.metadata && (
                <p className="text-red-500 text-sm mt-1">
                  O nível é obrigatório
                </p>
              )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título</label>
            <Input
              {...form.register("metadata.title")}
              placeholder="Digite o título"
            />
            {form.formState.errors.metadata?.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.metadata.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <Textarea
              {...form.register("metadata.description")}
              placeholder="Detalhes adicionais"
            />
          </div>

          {renderTypeSpecificFields()}

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              className={cn("w-full", {
                "cursor-not-allowed opacity-70": isSubmitting,
              })}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Salvando...</span>
                </div>
              ) : (
                <p>Salvar</p>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
