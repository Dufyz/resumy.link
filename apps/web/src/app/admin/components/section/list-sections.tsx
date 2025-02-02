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
import { useState } from "react";
import { Section } from "./section";

// interface DragItem {
//   id: string;
//   type: "section" | "sectionItem";
//   collectionId?: string;
// }

const initialSections = [
  {
    id: "1",
    title: "Educação",
    isActive: true,
    links: [
      {
        id: "1",
        title: "GitHub",
        url: "https://github.com/Dufyz",
        clicks: 0,
        isActive: true,
      },
    ],
  },
  {
    id: "2",
    title: "Experiência",
    isActive: true,
    links: [
      {
        id: "2",
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/schmidt-iago-thomaz/",
        clicks: 2,
        isActive: true,
      },
      {
        id: "3",
        title: "Dufyz | Fullstack Developer",
        url: "https://dufyz.dev/pt",
        clicks: 2,
        isActive: true,
      },
    ],
  },
];

export default function ListSections() {
  const [sections, setSections] = useState(initialSections);
  // const [activeItem, setActiveItem] = useState<DragItem | null>(null);

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
        items={sections.map((c) => `section-${c.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {sections.map((s) => (
            <Section key={s.id} section={s} dragId={`section-${s.id}`} />
          ))}
        </AnimatePresence>
      </SortableContext>

      {/* <DragOverlay>
        {activeItem && activeItem.type === "section" && (
          <Section
            section={sections.find((c) => c.id === activeItem.id)!}
            dragId={`section-${activeItem.id}`}
          />
        )}
      </DragOverlay> */}
    </DndContext>
  );
}
