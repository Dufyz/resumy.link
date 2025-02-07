import { cn } from "@/lib/utils";
import { PortfolioLinkType } from "@/types/portfolio-type";
import { JSX } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconWorld,
} from "@tabler/icons-react";

export const PORTFOLIO_LINKS: Record<
  string,
  {
    type: PortfolioLinkType;
    icon: JSX.Element;
    url: string;
  }
> = {
  instagram: {
    type: "instagram",
    icon: <IconBrandInstagram size={20} className={cn("text-pink-600")} />,
    url: "https://www.instagram.com/",
  },
  linkedin: {
    type: "linkedin",
    icon: <IconBrandLinkedin size={20} className={cn("text-blue-600")} />,
    url: "https://www.linkedin.com/in/",
  },
  twitter: {
    type: "twitter",
    icon: <IconBrandTwitter size={20} className={cn("text-blue-400")} />,
    url: "https://twitter.com/",
  },
  youtube: {
    type: "youtube",
    icon: <IconBrandYoutube size={20} className={cn("text-red-600")} />,
    url: "https://www.youtube.com/@",
  },
  github: {
    type: "github",
    icon: <IconBrandGithub size={20} className={cn("text-gray-800")} />,
    url: "https://github.com/",
  },
  tiktok: {
    type: "tiktok",
    icon: <IconBrandTiktok size={20} className={cn("text-black")} />,
    url: "https://www.tiktok.com/@",
  },
  website: {
    type: "website",
    icon: <IconWorld size={20} className={cn("text-gray-600")} />,
    url: "",
  },
};
