"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X } from "lucide-react";
import { redirect } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 px-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Code2 className="w-6 h-6 text-blue-600" />
          <span>Resumy.link</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              redirect("/login");
            }}
          >
            Entrar
          </Button>
          <Button
            className="hidden sm:inline-flex bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => {
              redirect("/login?mode=sign-up");
            }}
          >
            Criar conta
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const links = [
    { href: "#features", label: "Funcionalidades" },
    { href: "#pricing", label: "Preços" },
    { href: "#about", label: "Sobre" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`${
            mobile ? "block py-2" : ""
          } text-gray-600 hover:text-blue-600 transition-colors`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
