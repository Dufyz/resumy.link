import { Button } from "@/components/ui/button";
import { Instagram, Mail, Youtube } from "lucide-react";
import { CreatePortfolioSocialModal } from "./create-portfolio-social-modal";

export default function PortfolioSocialIcons() {
  return (
    <div className="flex items-center gap-2 pt-2">
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Instagram className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Youtube className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
        <Mail className="h-4 w-4" />
      </Button>
      <CreatePortfolioSocialModal />
    </div>
  );
}
