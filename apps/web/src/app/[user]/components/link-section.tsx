"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface LinkSectionProps {
  icon: ReactNode;
  title: string;
  items: {
    main: boolean;
    title: string;
    subtitle?: string;
    content?: string;
    link?: string;
  }[];
}

export default function LinkSection({ icon, title, items }: LinkSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mainItem = items.find((item) => item.main) || items[0];

  return (
    <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-blue-500/20">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-blue-400">{icon}</div>
            <h2 className="font-semibold text-lg">{title}</h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {!isExpanded && (
          <div className="mt-2 transition-opacity duration-300">
            <h3 className="font-medium text-gray-200">{mainItem.title}</h3>
            {mainItem.subtitle && (
              <p className="text-sm text-gray-400">{mainItem.subtitle}</p>
            )}
          </div>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-700">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-medium text-gray-200">{item.title}</h3>
              {item.subtitle && (
                <p className="text-sm text-gray-400">{item.subtitle}</p>
              )}
              {item.content && (
                <p className="text-sm text-gray-500 mt-1">{item.content}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
