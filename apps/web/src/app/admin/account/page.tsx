"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useUser from "@/hooks/useUser";
import UserAvatarUpload from "@/components/user-avatar-upload";
import getS3Image from "@/lib/utils/getS3Image";
import { useForm } from "react-hook-form";
import { updateUserSchema, UpdateUserSchema } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { postFile } from "@/queries/bucket-queries";
import { patchUser } from "@/queries/user-queries";
import { IconLoader2 } from "@tabler/icons-react";

export default function AccountPage() {
  const { user, updateUser } = useUser();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      avatar_path: user?.avatar_path,
    },
    mode: "onChange",
  });

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

  async function onSubmit(data: UpdateUserSchema) {
    if (!user) return;

    try {
      setIsSubmitting(true);

      if (avatarFile) {
        const filePathOrError = await postFile({
          file: avatarFile,
          file_path: `users/avatar`,
        });

        if (filePathOrError.isFailure()) return;

        const { file_path } = filePathOrError.value;

        data.avatar_path = file_path;
      }

      const responseOrError = await patchUser(user.id, data);

      if (responseOrError.isFailure()) return;

      const { user: response } = responseOrError.value;
      updateUser(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>
      <Tabs defaultValue="profile">
        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6 flex flex-col gap-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-6">
                  <UserAvatarUpload
                    avatarPath={
                      user.avatar_path ? getS3Image(user.avatar_path) : null
                    }
                    isSubmitting={isSubmitting}
                    onAvatarChange={handleAvatarChange}
                    error={null}
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Nome"
                  className="w-full"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <span>{form.formState.errors.name.message}</span>
                )}
                <Input
                  type="email"
                  value={user.email}
                  disabled
                  placeholder="Email"
                  className="w-full"
                  {...form.register("email")}
                />
                <Button
                  type="submit"
                  className={`w-full ${
                    isSubmitting ? "cursor-not-allowed opacity-70" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    <span>Salvar</span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
