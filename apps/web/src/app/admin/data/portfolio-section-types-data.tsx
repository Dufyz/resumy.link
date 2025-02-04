import {
  IconSchool,
  IconBriefcase,
  IconCertificate,
  IconLanguage,
  IconBook,
  IconBookmarks,
  IconPalette,
} from "@tabler/icons-react";

export const PORTFOLIO_SECTION_TYPES = [
  {
    value: "education",
    label: "Educação",
    icon: IconSchool,
  },
  {
    value: "experience",
    label: "Experiência",
    icon: IconBriefcase,
  },
  {
    value: "project",
    label: "Projeto",
    icon: IconBookmarks,
  },
  {
    value: "certification",
    label: "Certificação",
    icon: IconCertificate,
  },
  {
    value: "language",
    label: "Idioma",
    icon: IconLanguage,
  },
  {
    value: "course",
    label: "Curso",
    icon: IconBook,
  },
  {
    value: "custom",
    label: "Customizado",
    icon: IconPalette,
  },
];
