import { Section } from "@/types/section-type";
import { create } from "zustand";

type SectionStore = {
  sections: Section[];

  setSections(sections: Section[]): void;

  createSection(section: Section): void;
  updateSection(id: number, section: Partial<Pick<Section, "is_active">>): void;
  deleteSection(id: number): void;
};

export const useSectionStore = create<SectionStore>((set, get) => ({
  sections: [],

  setSections: (sections) => set({ sections }),

  createSection: (section) => {
    const sections = [...get().sections, section];

    set({ sections });
  },

  updateSection: (id, section) => {
    const sections = get().sections.map((s) => {
      if (s.id === id) {
        return { ...s, ...section };
      }

      return s;
    });

    set({ sections });
  },

  deleteSection: (id) => {
    const sections = get().sections.filter((s) => s.id !== id);

    set({ sections });
  },
}));
