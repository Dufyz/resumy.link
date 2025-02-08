"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioSectionItem } from "../portfolio-section-item/portoflio-section-item";
import { cn } from "@/lib/utils";
import { CreatePortfolioSectionItemModal } from "../portfolio-section-item/create-portfolio-section-item-modal";
import { PortfolioSection as PortfolioSectionType } from "@/types/portfolio-section-type";
import {
  patchPortfolioSection,
  deletePortfolioSection as deletePortfolioSectionQuery,
} from "@/queries/portfolio-section-queries";
import usePortfolio from "@/hooks/usePortfolio";
import { PORTFOLIO_SECTION_TYPES } from "@/app/admin/data/portfolio-section-types-data";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { IconGripVertical } from "@tabler/icons-react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { PortfolioSectionItem as PortfolioSectionItemType } from "@/types/portfolio-section-item-type";
import { patchPortfolioSectionItem } from "@/queries/portfolio-section-item-queries";
import { sortPortfolioSectionItems } from "@/lib/utils/sortPortfolioSectionItems";

const WEIGHT_INCREMENT = 1000;

export function PortfolioSection({
  portfolioSection,
}: {
  portfolioSection: PortfolioSectionType;
}) {
  const portfolioSectionItems = sortPortfolioSectionItems(
    portfolioSection.portfolio_section_items || []
  );
  const [activeId, setActiveId] = useState<null | number>(null);

  const {
    updatePortfolioSection,
    deletePortfolioSection,
    updatePortfolioSectionItem,
  } = usePortfolio();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: portfolioSection.id });

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

  const checkForEqualWeights = (items: PortfolioSectionItemType[]) => {
    const weights = new Set();
    const duplicates = new Set();

    items.forEach((section) => {
      if (weights.has(section.index)) {
        duplicates.add(section.index);
      }
      weights.add(section.index);
    });

    return duplicates.size > 0;
  };

  const reorderAllWeights = async (items: PortfolioSectionItemType[]) => {
    const updatePromises = items.map((section, index) => {
      const newWeight = (index + 1) * WEIGHT_INCREMENT;

      patchPortfolioSectionItem(section.id, {
        index: newWeight,
      });

      return updatePortfolioSection(section.id, { index: newWeight });
    });

    await Promise.all(updatePromises);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (!event.active.id) return;

    setActiveId(event.active.id as number);
  };

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over) return;
    if (!active.id || !over.id) return;

    const oldIndex = portfolioSectionItems.findIndex((s) => s.id === active.id);
    const newIndex = portfolioSectionItems.findIndex((s) => s.id === over.id);

    if (oldIndex === newIndex) {
      setActiveId(null);
      return;
    }

    const updatedSections = arrayMove(
      portfolioSectionItems,
      oldIndex,
      newIndex
    );

    const hasEqualWeights = checkForEqualWeights(updatedSections);

    if (hasEqualWeights) {
      reorderAllWeights(updatedSections);
    } else {
      let newWeight: number;

      if (newIndex === 0) {
        newWeight = updatedSections[1].index / 2;
      } else if (newIndex === updatedSections.length - 1) {
        newWeight = updatedSections[newIndex - 1].index + WEIGHT_INCREMENT;
      } else {
        const prevWeight = updatedSections[newIndex - 1].index;
        const nextWeight = updatedSections[newIndex + 1].index;

        if (prevWeight === nextWeight) {
          reorderAllWeights(updatedSections);
          setActiveId(null);
          return;
        }

        newWeight = prevWeight + (nextWeight - prevWeight) / 2;
      }

      updatePortfolioSectionItem(active.id as number, {
        index: newWeight,
      });

      patchPortfolioSectionItem(active.id as number, {
        index: newWeight,
      });
    }

    setActiveId(null);
  }

  const onToggleIsActive = async () => {
    const isActive = !portfolioSection.is_active;

    updatePortfolioSection(portfolioSection.id, {
      is_active: isActive,
    });

    const responseOrError = await patchPortfolioSection(portfolioSection.id, {
      is_active: isActive,
    });

    if (responseOrError.isFailure())
      return updatePortfolioSection(portfolioSection.id, {
        is_active: !isActive,
      });
  };

  const onDelete = async () => {
    const responseOrError = await deletePortfolioSectionQuery(
      portfolioSection.id
    );

    if (responseOrError.isFailure()) return;

    deletePortfolioSection(portfolioSection.id);
  };

  const Icon = PORTFOLIO_SECTION_TYPES[portfolioSection.type].icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div
        style={style}
        ref={setNodeRef}
        {...attributes}
        className={cn(
          "transition-shadow duration-200 flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md",
          {
            "opacity-50": !portfolioSection.is_active || isDragging,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              {...listeners}
              className="cursor-grab touch-none active:cursor-grabbing"
            >
              <IconGripVertical className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <Icon />
              <h3 className="font-semibold">{portfolioSection.title}</h3>
              <span className="text-sm text-muted-foreground">
                {portfolioSection.portfolio_section_items?.length} itens
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <Switch
              checked={portfolioSection.is_active}
              onCheckedChange={onToggleIsActive}
            />
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={portfolioSectionItems}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              <div className="flex flex-col gap-3">
                {portfolioSectionItems.map((portfolioSectionItem) => (
                  <motion.div
                    key={portfolioSectionItem.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <PortfolioSectionItem
                      portfolioSectionItem={portfolioSectionItem}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <PortfolioSectionItem
                portfolioSectionItem={
                  portfolioSectionItems.find(
                    (s) => s.id === activeId
                  ) as unknown as PortfolioSectionItemType
                }
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <CreatePortfolioSectionItemModal portfolioSection={portfolioSection} />
      </div>
    </motion.div>
  );
}
