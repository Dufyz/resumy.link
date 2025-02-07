import React from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Edit2, Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Portfolio, PortfolioLinkType } from "@/types/portfolio-type";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import {
  updatePortfolioSchema,
  UpdatePortfolioSchema,
} from "@/schemas/portfolio-schema";
import { patchPortfolio } from "@/queries/portfolio-queries";
import usePortfolio from "@/hooks/usePortfolio";
import PortfolioLinkForm from "./portfolio-link/portfolio-link-form";

export function UpdatePortfolioModal({ portfolio }: { portfolio: Portfolio }) {
  const { updatePortfolio } = usePortfolio();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [links, setLinks] = useState<
    Array<{ type: PortfolioLinkType; url: string }>
  >(portfolio.metadata?.links || []);

  const form = useForm<UpdatePortfolioSchema>({
    resolver: zodResolver(updatePortfolioSchema),
    defaultValues: {
      title: portfolio.title,
      bio: portfolio.bio,
      username: portfolio.username,
      avatar_path: portfolio.avatar_path,
      metadata: portfolio.metadata,
    },
    mode: "onChange",
  });

  const {
    formState: { errors },
  } = form;

  const hasMainErrors = Boolean(errors.title || errors.bio);
  const hasLinksErrors = Boolean(errors.metadata?.links);

  const handleAddLink = () => {
    const newLinks = [
      ...links,
      { type: "website" as PortfolioLinkType, url: "" },
    ];
    setLinks(newLinks);
    form.setValue("metadata.links", newLinks);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    form.setValue("metadata.links", newLinks);
  };

  const handleLinkChange = (
    index: number,
    value: { type: PortfolioLinkType; url: string }
  ) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
    form.setValue("metadata.links", newLinks);
  };

  async function onSubmit(data: UpdatePortfolioSchema) {
    try {
      setIsSubmitting(true);

      const responseOrError = await patchPortfolio(portfolio.id, data);

      if (responseOrError.isFailure()) return;

      const { portfolio: response } = responseOrError.value;
      updatePortfolio(response);
      setOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar portfólio:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90%] overflow-auto p-0">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <DialogHeader className="sticky top-0 flex flex-col gap-4 bg-white p-4 z-10">
              <DialogTitle>Atualizar Portfólio</DialogTitle>
              <TabsList className="grid w-full grid-cols-2 !mt-0">
                <TabsTrigger
                  value="main"
                  className={cn(hasMainErrors && "border-red-500 text-red-500")}
                >
                  Informações Principais
                  {hasMainErrors && (
                    <span className="ml-2 text-red-500">⚠️</span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="links"
                  className={cn(
                    hasLinksErrors && "border-red-500 text-red-500"
                  )}
                >
                  Links
                  {hasLinksErrors && (
                    <span className="ml-2 text-red-500">⚠️</span>
                  )}
                </TabsTrigger>
              </TabsList>
            </DialogHeader>

            <TabsContent value="main" className="px-4 mt-0 pb-4">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="profileTitle">
                    Nome de exibição
                  </label>
                  <Input
                    id="profileTitle"
                    {...form.register("title")}
                    placeholder="Digite seu nome"
                    disabled={isSubmitting}
                    className={cn(errors.title && "border-red-300")}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
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
                    className={cn(errors.bio && "border-red-300")}
                    disabled={isSubmitting}
                  />
                  {errors.bio && (
                    <p className="text-sm text-red-500">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="links" className="px-4 mt-0 pb-4">
              <div className="flex flex-col gap-4">
                <AnimatePresence>
                  {links.map((link, index) => (
                    <PortfolioLinkForm
                      key={index}
                      index={index}
                      errors={errors}
                      register={form.register}
                      link={link}
                      onRemove={handleRemoveLink}
                      onChange={handleLinkChange}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            <div className="sticky bottom-0 p-4 z-10 bg-white border-t flex gap-2 flex-col">
              {activeTab === "links" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddLink}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar novo link
                </Button>
              )}
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
                  <span>Salvar</span>
                )}
              </Button>
            </div>
          </Tabs>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePortfolioModal;
