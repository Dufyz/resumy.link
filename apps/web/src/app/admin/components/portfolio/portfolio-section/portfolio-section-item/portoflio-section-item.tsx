import { Switch } from "@/components/ui/switch";
import { GripVertical, Link2, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PortfolioSectionItem as PortfolioSectionItemType } from "@/types/portfolio-section-type";

export function PortfolioSectionItem({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItemType;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: portfolioSectionItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onToggle = (collectionId: string, linkId: string) => {
    // setSections((prev) =>
    //   prev.map((collection) =>
    //     collection.id === collectionId
    //       ? {
    //           ...collection,
    //           links: collection.links.map((link) =>
    //             link.id === linkId
    //               ? { ...link, isActive: !link.isActive }
    //               : link
    //           ),
    //         }
    //       : collection
    //   )
    // );
  };

  const onDelete = (collectionId: string, linkId: string) => {
    // setSections((prev) =>
    //   prev.map((collection) =>
    //     collection.id === collectionId
    //       ? {
    //           ...collection,
    //           links: collection.links.filter((link) => link.id !== linkId),
    //         }
    //       : collection
    //   )
    // );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center justify-between rounded-lg border bg-card p-4",
        isDragging && "opacity-50",
        !portfolioSectionItem.is_active && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{portfolioSectionItem.title}</span>
            <Link2 className="h-3 w-3 text-muted-foreground" />
          </div>
          <a
            href={portfolioSectionItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            {portfolioSectionItem.url}
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>

        <Switch
          checked={portfolioSectionItem.is_active}
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  );
}
