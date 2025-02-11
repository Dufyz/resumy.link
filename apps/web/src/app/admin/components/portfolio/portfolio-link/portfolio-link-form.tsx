/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { PortfolioLinkType } from "@/types/portfolio-type";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PortfolioLinkIcon from "./portfolio-link-icon";
import { PORTFOLIO_LINKS } from "@/app/admin/data/portfolio-link-data";

export default function PortfolioLinkForm({
  index,
  errors,
  register,
  link,
  onRemove,
  onChange,
}: {
  index: number;
  errors: any; //TODO: Fix any
  register: any; //TODO: Fix any
  link: { type: PortfolioLinkType; url: string };
  onRemove: (index: number) => void;
  onChange: (
    index: number,
    value: { type: PortfolioLinkType; url: string }
  ) => void;
}) {
  const isWebsite = link.type === "website";
  const linkError = errors?.metadata?.links?.[index];

  const getUsername = (url: string, type: PortfolioLinkType) => {
    if (type === "website") return url;
    return url.replace(PORTFOLIO_LINKS[type].url, "");
  };

  const handleTypeChange = (type: PortfolioLinkType) => {
    onChange(index, {
      type,
      url: type === "website" ? "" : PORTFOLIO_LINKS[type].url,
    });
  };

  const handleUsernameChange = (value: string) => {
    const url = isWebsite ? value : `${PORTFOLIO_LINKS[link.type].url}${value}`;
    onChange(index, { ...link, url });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex gap-4 items-start p-4 rounded-lg",
        linkError ? "bg-red-50 border border-red-200" : "bg-gray-50"
      )}
    >
      <PortfolioLinkIcon type={link.type} />
      <div className="flex-1 space-y-2">
        <Select
          value={link.type}
          onValueChange={(value) =>
            handleTypeChange(value as PortfolioLinkType)
          }
        >
          <SelectTrigger
            className={cn("w-full", linkError?.type ? "border-red-300" : "")}
          >
            <SelectValue placeholder="Selecione um tipo de link" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="website">Website</SelectItem>
          </SelectContent>
        </Select>

        {isWebsite ? (
          <div className="space-y-1">
            <Input
              {...register(`metadata.links.${index}.url`)}
              value={link.url}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="https://seusite.com"
              className={cn("w-full", linkError?.url ? "border-red-300" : "")}
            />
            {linkError?.url && (
              <p className="text-sm text-red-500">{linkError.url.message}</p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="relative">
              <Input
                {...register(`metadata.links.${index}.url`)}
                value={getUsername(link.url, link.type)}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder={`Username ${link.type}`}
                className={cn(
                  "w-full pl-8",
                  linkError?.url ? "border-red-300" : ""
                )}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                @
              </span>
            </div>
            {linkError?.url && (
              <p className="text-sm text-red-500">{linkError.url.message}</p>
            )}
          </div>
        )}

        {!isWebsite && link.url && (
          <p className="text-sm text-gray-500">URL: {link.url}</p>
        )}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
