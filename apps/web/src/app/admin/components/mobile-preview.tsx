import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

const profile = {
  name: "Guilherme Thomaz",
  username: "dufyz",
  role: "Software engineer",
  avatar: null,
  bio: "Passionate about creating amazing web experiences",
  socialLinks: [],
};

const collections = [
  {
    id: "1",
    title: "Educação",
    isActive: true,
    links: [
      {
        id: "1",
        title: "GitHub",
        url: "https://github.com/Dufyz",
        clicks: 0,
        isActive: true,
      },
    ],
  },
  {
    id: "2",
    title: "Experiência",
    isActive: true,
    links: [
      {
        id: "2",
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/schmidt-iago-thomaz/",
        clicks: 2,
        isActive: true,
      },
      {
        id: "3",
        title: "Dufyz | Fullstack Developer",
        url: "https://dufyz.dev/pt",
        clicks: 2,
        isActive: true,
      },
    ],
  },
];

export function MobilePreview() {
  const activeCollections = collections.filter((c) => c.isActive);
  const activeLinks = activeCollections.flatMap((c) =>
    c.links.filter((l) => l.isActive)
  );

  return (
    <div className="sticky top-4">
      <div className="overflow-hidden rounded-[40px] border bg-slate-950 p-6 shadow-xl">
        <div className="aspect-[9/19] w-full overflow-y-auto rounded-[28px] bg-slate-950 px-6 py-8">
          <div className="space-y-8">
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-slate-800">
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-slate-200">{profile.name}</h2>
              <p className="text-sm text-slate-400">{profile.role}</p>
            </div>

            <div className="space-y-4">
              {activeCollections.map((collection) => (
                <div key={collection.id} className="space-y-3">
                  <h3 className="text-center text-sm font-medium text-slate-200">
                    {collection.title}
                  </h3>
                  <div className="space-y-2">
                    {collection.links
                      .filter((l) => l.isActive)
                      .map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-3 text-sm text-slate-200 transition-colors hover:bg-slate-700"
                        >
                          <Link2 className="h-4 w-4" />
                          <span>{link.title}</span>
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between px-1 text-sm text-muted-foreground">
        <span>Linktree®</span>
        <Button variant="ghost" size="sm">
          Hide Linktree logo
        </Button>
      </div>
    </div>
  );
}
