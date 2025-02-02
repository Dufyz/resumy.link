import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
} from "@tabler/icons-react";

const footerLinks = {
  Product: [
    { name: "Funcionalidades", href: "#" },
    { name: "Preços", href: "#" },
    { name: "Sobre", href: "#" },
  ],
  Recursos: [
    { name: "Documentação", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Comunidade", href: "#" },
  ],
  Legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 px-4 border-t" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <Code2 className="w-6 h-6 text-blue-600" />
              <span>Resumy.link</span>
            </Link>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-100 hover:text-blue-600"
              >
                <IconBrandGithub className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-100 hover:text-blue-600"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-blue-100 hover:text-blue-600"
              >
                <IconBrandYoutube className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-8 sm:justify-evenly w-full">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-3">
                <h3 className="font-semibold text-gray-900">{category}</h3>
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
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
          <div className="text-gray-600 text-sm">
            © 2025 Resumy.link All rights reserved.
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
