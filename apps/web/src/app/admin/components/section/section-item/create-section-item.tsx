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
  CreateSectionItemSchema,
  createSectionItemSchema,
} from "@/app/admin/schemas/section-item-scheam";

export function CreateSectionItem() {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateSectionItemSchema>({
    resolver: zodResolver(createSectionItemSchema),
    defaultValues: {},
  });

  const handleAdd = (data: CreateSectionItemSchema) => {
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar novo link</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleAdd)}
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
