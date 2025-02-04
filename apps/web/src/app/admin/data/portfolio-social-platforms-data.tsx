import {
  Instagram,
  Mail,
  Facebook,
  Youtube,
  Twitter,
  TwitterIcon as TikTok,
  MessageCircle,
  PhoneIcon as WhatsApp,
} from "lucide-react";

export interface SocialPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const PORTFOLIO_SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "threads",
    name: "Threads",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
  },
  { id: "email", name: "Email", icon: <Mail className="h-5 w-5" /> },
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
  {
    id: "twitter",
    name: "X (formerly Twitter)",
    icon: <Twitter className="h-5 w-5" />,
  },
  { id: "tiktok", name: "TikTok", icon: <TikTok className="h-5 w-5" /> },
  { id: "whatsapp", name: "WhatsApp", icon: <WhatsApp className="h-5 w-5" /> },
];
