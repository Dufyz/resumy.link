"use client";

import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LayoutGrid, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioSectionItem } from "./portfolio-section-item/portoflio-section-item";
import { cn } from "@/lib/utils";
import { CreatePortfolioSectionItemModal } from "./portfolio-section-item/create-portfolio-section-item-modal";
import { PortfolioSection as PortfolioSectionType } from "@/types/portfolio-section-type";
import {
  patchPortfolioSection,
  deletePortfolioSection as deletePortfolioSectionQuery,
} from "@/queries/portfolio-section-queries";
import usePortfolio from "@/hooks/usePortfolio";
import { PORTFOLIO_SECTION_TYPES } from "@/app/admin/data/portfolio-section-types-data";
import { Icon, IconProps } from "@tabler/icons-react";

export function PortfolioSection({
  portfolioSection,
  dragId,
}: {
  portfolioSection: PortfolioSectionType;
  dragId: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dragId });

  const { updatePortfolioSection, deletePortfolioSection } = usePortfolio();

  const toggleCollection = () => {
    const isActive = !portfolioSection.is_active;

    updatePortfolioSection(portfolioSection.id, {
      is_active: isActive,
    });

    patchPortfolioSection(portfolioSection.id, {
      is_active: isActive,
    });
  };

  const deleteCollection = () => {
    deletePortfolioSection(portfolioSection.id);

    deletePortfolioSectionQuery(portfolioSection.id);
  };

  const Icon = PORTFOLIO_SECTION_TYPES.find(
    (type) => type.value === portfolioSection.type
  )?.icon as ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        className={cn(
          "transition-shadow duration-200 flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm hover:shadow-md",
          {
            "shadow-lg": isDragging,
            "opacity-50": !portfolioSection.is_active,
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* TODO: Button quebra tudo */}
            {/* <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none active:cursor-grabbing"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button> */}
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{portfolioSection.title}</h3>
              <span className="text-sm text-muted-foreground">
                {portfolioSection.portfolio_section_items?.length} itens
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={deleteCollection}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <Switch
              checked={portfolioSection.is_active}
              onCheckedChange={toggleCollection}
            />
          </div>
        </div>

        <AnimatePresence>
          <div className="flex flex-col gap-3">
            {portfolioSection.portfolio_section_items?.map(
              (portfolioSection) => (
                <motion.div
                  key={portfolioSection.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PortfolioSectionItem
                    portfolioSectionItem={portfolioSection}
                  />
                </motion.div>
              )
            )}
          </div>
        </AnimatePresence>

        <CreatePortfolioSectionItemModal />
      </div>
    </motion.div>
  );
}
