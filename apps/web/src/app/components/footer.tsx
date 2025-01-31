import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  Produto: [
    { name: "Funcionalidades", href: "#" },
    { name: "Preços", href: "#" },
  ],
  Recursos: [
    { name: "Community", href: "#" },
    { name: "Support", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Licenses", href: "#" },
    { name: "Settings", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">
              Feito com ❤️ para profissionais
            </span>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:text-blue-600"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:text-blue-600"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:text-blue-600"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg hover:text-blue-600"
            >
              <Youtube className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
