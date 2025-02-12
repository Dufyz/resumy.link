import React, { useEffect } from "react";
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
import { Check, Edit2, Loader2, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Portfolio, PortfolioLinkType } from "@/types/portfolio-type";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import {
  updatePortfolioSchema,
  UpdatePortfolioSchema,
} from "@/schemas/portfolio-schema";
import {
  patchPortfolio,
  postCheckPortfolioUsernameAvailability,
} from "@/queries/portfolio-queries";
import usePortfolio from "@/hooks/usePortfolio";
import PortfolioLinkForm from "./portfolio-link/portfolio-link-form";
import PortfolioAvatarUpload from "@/app/admin/components/portfolio/portfolio-avatar-upload";
import getS3Image from "@/lib/utils/getS3Image";
import { postFile } from "@/queries/bucket-queries";
import useDebounce from "@/hooks/useDebounce";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function UpdatePortfolioModal({ portfolio }: { portfolio: Portfolio }) {
  const { updatePortfolio } = usePortfolio();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("main");
  const [links, setLinks] = useState<
    Array<{ type: PortfolioLinkType; url: string }>
  >(portfolio.metadata?.links || []);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);

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

  const handleAvatarChange = (avatarData: {
    previewUrl: string | null;
    file: File | null;
    type: string;
  }) => {
    if (avatarData.type === "new") {
      setAvatarFile(avatarData.file);
      form.setValue("avatar_path", avatarData.previewUrl);
    } else if (avatarData.type === "remove") {
      setAvatarFile(null);
      form.setValue("avatar_path", null);
    }
  };

  async function onSubmit(data: UpdatePortfolioSchema) {
    try {
      setIsSubmitting(true);

      if (avatarFile) {
        const filePathOrError = await postFile({
          file: avatarFile,
          file_path: `portfolios/avatar`,
        });

        if (filePathOrError.isFailure()) return;

        const { file_path } = filePathOrError.value;

        data.avatar_path = file_path;
      }

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

  const username = form.watch("username") || "";
  const debouncedUsername = useDebounce(username, 500);

  useEffect(() => {
    async function checkUsernameAvailability() {
      if (debouncedUsername.length < 3) {
        setIsUsernameAvailable(null);
        return;
      }

      const newUsername = form.getValues("username");

      if (!newUsername) return;
      if (newUsername === portfolio.username)
        return setIsUsernameAvailable(true);

      setIsCheckingUsername(true);
      try {
        const availableOrError = await postCheckPortfolioUsernameAvailability(
          newUsername
        );

        if (availableOrError.isFailure()) return setIsUsernameAvailable(false);

        const { available } = availableOrError.value;
        setIsUsernameAvailable(available);
      } catch (error) {
        console.error("Erro ao verificar disponibilidade do username:", error);
        setIsUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }

    checkUsernameAvailability();
  }, [debouncedUsername, form, portfolio.username]);

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90%] overflow-auto p-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <DialogHeader className="sticky top-0 flex flex-col gap-4 bg-white p-4 z-10">
                <DialogTitle>Atualizar Portfólio</DialogTitle>
                <TabsList className="grid w-full grid-cols-2 !mt-0">
                  <TabsTrigger
                    value="main"
                    className={cn(
                      hasMainErrors && "border-red-500 text-red-500"
                    )}
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
                  <PortfolioAvatarUpload
                    avatarPath={
                      portfolio.avatar_path
                        ? getS3Image(portfolio.avatar_path)
                        : null
                    }
                    onAvatarChange={handleAvatarChange}
                    isSubmitting={isSubmitting}
                    error={
                      errors.avatar_path
                        ? { message: errors.avatar_path.message || "" }
                        : undefined
                    }
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-muted-foreground">
                                resumy.link/
                              </span>
                              <Input
                                placeholder="seunome"
                                className="pl-24 pr-10"
                                {...field}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                {isCheckingUsername && (
                                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                )}
                                {!isCheckingUsername &&
                                  isUsernameAvailable === true && (
                                    <Check className="h-4 w-4 text-green-500" />
                                  )}
                                {!isCheckingUsername &&
                                  isUsernameAvailable === false && (
                                    <X className="h-4 w-4 text-red-500" />
                                  )}
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>
                            {isCheckingUsername &&
                              "Verificando disponibilidade..."}
                            {!isCheckingUsername &&
                              isUsernameAvailable === true &&
                              "Username disponível!"}
                            {!isCheckingUsername &&
                              isUsernameAvailable === false &&
                              "Username já está em uso."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium"
                      htmlFor="profileTitle"
                    >
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
                      className={cn(errors.bio && "border-red-300 resize-none")}
                      disabled={isSubmitting}
                      maxLength={120}
                    />
                    {errors.bio && (
                      <p className="text-sm text-red-500">
                        {errors.bio.message}
                      </p>
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
                    <p>Salvar</p>
                  )}
                </Button>
              </div>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePortfolioModal;
