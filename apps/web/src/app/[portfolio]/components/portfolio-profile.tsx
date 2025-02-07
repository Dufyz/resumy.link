import PortfolioLinkIcon from "@/app/admin/components/portfolio/portfolio-link/portfolio-link-icon";
import { Portfolio } from "@/types/portfolio-type";
import Image from "next/image";

export default function PortfolioProfile({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  const { title, bio, avatar_path } = portfolio;

  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
      <div className="relative w-32 h-32 lg:w-40 lg:h-40">
        <Image
          src={avatar_path || "/placeholder.svg"}
          alt={title}
          fill
          className="rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="text-xl lg:text-lg text-gray-300">{bio}</p>
      </div>
      <div className="flex gap-2 flex-wrap items-center justify-center md:justify-start">
        {portfolio.metadata?.links.map((link, index) => {
          return (
            <a key={index} href={link.url} target="_blank" rel="noreferrer">
              <PortfolioLinkIcon type={link.type} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
