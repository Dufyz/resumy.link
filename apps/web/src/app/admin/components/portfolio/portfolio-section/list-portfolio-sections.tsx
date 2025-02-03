"use client";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { PortfolioSection } from "./portfolio-section";
import { Portfolio } from "@/types/portfolio-type";

export default function ListPortfolioSections({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const portfolioSections = portfolio.portfolio_sections;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {};

  const onDragEnd = (event: DragEndEvent) => {};

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={portfolioSections.map((c) => `section-${c.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {portfolioSections.map((s) => (
            <PortfolioSection
              key={s.id}
              portfolioSection={s}
              dragId={`section-${s.id}`}
            />
          ))}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  );
}
