import {
  IconSchool,
  IconBriefcase,
  IconCertificate,
  IconLanguage,
  IconBook,
  IconBookmarks,
} from "@tabler/icons-react";

export const PORTFOLIO_SECTION_TYPES: Record<
  string,
  { value: string; label: string; icon: React.ComponentType }
> = {
  education: {
    value: "education",
    label: "Educação",
    icon: IconSchool,
  },
  experience: {
    value: "experience",
    label: "Experiência",
    icon: IconBriefcase,
  },
  certification: {
    value: "certification",
    label: "Certificação",
    icon: IconCertificate,
  },
  course: {
    value: "course",
    label: "Curso",
    icon: IconBook,
  },
  project: {
    value: "project",
    label: "Projeto",
    icon: IconBookmarks,
  },
  language: {
    value: "language",
    label: "Idioma",
    icon: IconLanguage,
  },
};
