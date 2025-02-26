"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  KeyboardSensor,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { PortfolioSection } from "./portfolio-section";
import { Portfolio } from "@/types/portfolio-type";
import { useState } from "react";
import { PortfolioSection as PortfolioSectionType } from "@/types/portfolio-section-type";
import { sortPortfolioSections } from "@/lib/utils/sortPortfolioSections";
import usePortfolio from "@/hooks/usePortfolio";
import { patchPortfolioSection } from "@/queries/portfolio-section-queries";

const WEIGHT_INCREMENT = 1000;

export default function ListPortfolioSections({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const { updatePortfolioSection } = usePortfolio();

  const [activeId, setActiveId] = useState<null | number>(null);

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

  const portfolioSections = sortPortfolioSections(
    portfolio.portfolio_sections || []
  ).map((section) => ({
    ...section,
    portfolio_section_items: portfolio.portfolio_section_items?.filter(
      (i) => i.portfolio_section_id === section.id
    ),
  }));

  const activePortfolioSection = portfolioSections.find(
    (section) => section.id === activeId
  );

  const checkForEqualWeights = (sections: PortfolioSectionType[]) => {
    const weights = new Set();
    const duplicates = new Set();

    sections.forEach((section) => {
      if (weights.has(section.index)) {
        duplicates.add(section.index);
      }
      weights.add(section.index);
    });

    return duplicates.size > 0;
  };

  const reorderAllWeights = async (sections: PortfolioSectionType[]) => {
    const updatePromises = sections.map((section, index) => {
      const newWeight = (index + 1) * WEIGHT_INCREMENT;

      patchPortfolioSection(section.id, {
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

    const oldIndex = portfolioSections.findIndex((s) => s.id === active.id);
    const newIndex = portfolioSections.findIndex((s) => s.id === over.id);

    if (oldIndex === newIndex) {
      setActiveId(null);
      return;
    }

    const updatedSections = arrayMove(portfolioSections, oldIndex, newIndex);

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

      updatePortfolioSection(active.id as number, {
        index: newWeight,
      });

      patchPortfolioSection(active.id as number, {
        index: newWeight,
      });
    }

    setActiveId(null);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={portfolioSections}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {portfolioSections.map((s) => (
            <PortfolioSection key={s.id} portfolioSection={s} />
          ))}
        </AnimatePresence>
      </SortableContext>
      <DragOverlay>
        {activeId && activePortfolioSection ? (
          <PortfolioSection portfolioSection={activePortfolioSection} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
