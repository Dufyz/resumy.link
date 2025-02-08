import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PortfolioSectionItem as PortfolioSectionItemType } from "@/types/portfolio-section-item-type";
import PortfolioSectionItemEducation from "./portoflio-section-item-education";
import PortfolioSectionItemExperience from "./portoflio-section-item-experience";
import PortfolioSectionItemCourse from "./portoflio-section-item-course";
import PortfolioSectionItemCertification from "./portoflio-section-item-certification";
import usePortfolio from "@/hooks/usePortfolio";
import {
  deletePortfolioSectionItem as deletePortfolioSectionItemQuery,
  patchPortfolioSectionItem,
} from "@/queries/portfolio-section-item-queries";
import PortfolioSectionItemProject from "./portoflio-section-item-project";
import PortfolioSectionItemLanguage from "./portoflio-section-item-language";
import { IconGripVertical } from "@tabler/icons-react";
import { sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export function PortfolioSectionItem({
  portfolioSectionItem,
}: {
  portfolioSectionItem: PortfolioSectionItemType;
}) {
  const { deletePortfolioSectionItem, updatePortfolioSectionItem } =
    usePortfolio();

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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onToggleIsActive = async () => {
    const isActive = !portfolioSectionItem.is_active;

    updatePortfolioSectionItem(portfolioSectionItem.id, {
      is_active: isActive,
    });

    const responseOrError = await patchPortfolioSectionItem(
      portfolioSectionItem.id,
      {
        is_active: isActive,
      }
    );

    if (responseOrError.isFailure())
      return updatePortfolioSectionItem(portfolioSectionItem.id, {
        is_active: !isActive,
      });
  };

  const onDelete = async () => {
    const responseOrError = await deletePortfolioSectionItemQuery(
      portfolioSectionItem.id
    );

    if (responseOrError.isFailure()) return;

    deletePortfolioSectionItem(portfolioSectionItem.id);
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        "group flex items-center justify-between rounded-lg border p-4",
        "bg-card",
        {
          "opacity-50": !portfolioSectionItem.is_active || isDragging,
        }
      )}
    >
      <div className="flex items-center gap-3">
        <button {...listeners} className="cursor-grab touch-none">
          <IconGripVertical className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {portfolioSectionItem.metadata.title}
            </span>
          </div>
          {portfolioSectionItem.metadata.type === "education" && (
            <PortfolioSectionItemEducation
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
          {portfolioSectionItem.metadata.type === "experience" && (
            <PortfolioSectionItemExperience
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
          {portfolioSectionItem.metadata.type === "course" && (
            <PortfolioSectionItemCourse
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
          {portfolioSectionItem.metadata.type === "certification" && (
            <PortfolioSectionItemCertification
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
          {portfolioSectionItem.metadata.type === "project" && (
            <PortfolioSectionItemProject
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
          {portfolioSectionItem.metadata.type === "language" && (
            <PortfolioSectionItemLanguage
              portfolioSectionItem={portfolioSectionItem}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>

        <Switch
          checked={portfolioSectionItem.is_active}
          onCheckedChange={onToggleIsActive}
        />
      </div>
    </div>
  );
}
