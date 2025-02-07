"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PortfolioSection as PortfolioSectionType } from "@/types/portfolio-section-type";
import { PORTFOLIO_SECTION_TYPES } from "@/app/admin/data/portfolio-section-types-data";
import PortfolioSectionItemEducation from "./portfolio-section-item/portoflio-section-item-education";
import PortfolioSectionItemCertification from "./portfolio-section-item/portoflio-section-item-certification";
import PortfolioSectionItemCourse from "./portfolio-section-item/portoflio-section-item-course";
import PortfolioSectionItemExperience from "./portfolio-section-item/portoflio-section-item-experience";
import PortfolioSectionItemLanguage from "./portfolio-section-item/portoflio-section-item-language";
import PortfolioSectionItemProject from "./portfolio-section-item/portoflio-section-item-project";

export default function PortfolioSection({
  portfolioSection,
}: {
  portfolioSection: PortfolioSectionType;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const portfolioSectionItems = portfolioSection.portfolio_section_items || [];

  const mainPortfolioSectionItem = portfolioSectionItems[0];

  const Icon = PORTFOLIO_SECTION_TYPES[portfolioSection.type].icon;

  return (
    <div className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-blue-500/20">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-blue-400">
              <Icon />
            </div>
            <h2 className="font-semibold text-lg">{portfolioSection.title}</h2>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </div>
        {!isExpanded && (
          <>
            {portfolioSection.type === "education" && (
              <PortfolioSectionItemEducation
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
            {portfolioSection.type === "certification" && (
              <PortfolioSectionItemCertification
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
            {portfolioSection.type === "course" && (
              <PortfolioSectionItemCourse
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
            {portfolioSection.type === "experience" && (
              <PortfolioSectionItemExperience
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
            {portfolioSection.type === "language" && (
              <PortfolioSectionItemLanguage
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
            {portfolioSection.type === "project" && (
              <PortfolioSectionItemProject
                portfolioSectionItem={mainPortfolioSectionItem}
                className="p-0 pt-2 hover:none bg-transparent shadow-none"
              />
            )}
          </>
        )}
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-700">
          {portfolioSectionItems.map((item, index) => (
            <div key={index}>
              {portfolioSection.type === "education" && (
                <PortfolioSectionItemEducation portfolioSectionItem={item} />
              )}
              {portfolioSection.type === "certification" && (
                <PortfolioSectionItemCertification
                  portfolioSectionItem={item}
                />
              )}
              {portfolioSection.type === "course" && (
                <PortfolioSectionItemCourse portfolioSectionItem={item} />
              )}
              {portfolioSection.type === "experience" && (
                <PortfolioSectionItemExperience portfolioSectionItem={item} />
              )}
              {portfolioSection.type === "language" && (
                <PortfolioSectionItemLanguage portfolioSectionItem={item} />
              )}
              {portfolioSection.type === "project" && (
                <PortfolioSectionItemProject portfolioSectionItem={item} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
