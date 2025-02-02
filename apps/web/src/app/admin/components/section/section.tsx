"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GripVertical, LayoutGrid, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { SectionItem } from "./section-item/section-item";
import { cn } from "@/lib/utils";
import { CreateSectionItem } from "./section-item/create-section-item";
import { Section as SectionType } from "@/types/section-type";

export function Section({
  section,
  dragId,
}: {
  section: SectionType;
  dragId: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dragId });

  const toggleCollection = (id: string) => {
    // setSections((prev) =>
    //   prev.map((collection) =>
    //     collection.id === id
    //       ? { ...collection, isActive: !collection.isActive }
    //       : collection
    //   )
    // );
  };

  const deleteCollection = (id: string) => {
    // setSections((prev) => prev.filter((collection) => collection.id !== id));
  };

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
          }
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none active:cursor-grabbing"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{section.title}</h3>
              <span className="text-sm text-muted-foreground">
                {section.links.length} itens
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={deleteCollection}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <Switch
              checked={section.isActive}
              onCheckedChange={toggleCollection}
            />
          </div>
        </div>

        <AnimatePresence>
          <div className="flex flex-col gap-3">
            {section.links.map((link) => (
              <motion.div
                key={link.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SectionItem sectionItem={link} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <CreateSectionItem />
      </div>
    </motion.div>
  );
}
