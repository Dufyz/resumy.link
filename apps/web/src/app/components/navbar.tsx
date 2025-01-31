import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="py-4 px-4 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Code2 className="w-6 h-6" />
            <span>Resumy.link</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-gray-600">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Funcionalidades
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Preços
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Entrar
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Comece agora
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
