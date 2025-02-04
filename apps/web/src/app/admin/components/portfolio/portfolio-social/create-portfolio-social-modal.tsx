import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Search } from "lucide-react";
import { useState } from "react";
import { PORTFOLIO_SOCIAL_PLATFORMS } from "@/app/admin/data/portfolio-social-platforms-data";

const searchSchema = z.object({
  search: z.string().min(1, "Search cannot be empty"),
});

// TODO: Implement
export function CreatePortfolioSocialModal() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: { search: string }) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add social icon</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="p-4 pb-0">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                {...form.register("search")}
                className="pl-9"
              />
              {form.formState.errors.search && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.root?.message}
                </p>
              )}
            </div>
          </form>
        </div>
        <ScrollArea className="max-h-[300px] px-4">
          <div className="space-y-1">
            {PORTFOLIO_SOCIAL_PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                onClick={() => {
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                {platform.icon}
                {platform.name}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
