import React, { useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconTriangleInverted } from "@tabler/icons-react";

const useAutoAdjustingInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  const adjustWidth = useCallback(() => {
    if (measureRef.current && inputRef.current) {
      const textWidth = measureRef.current.offsetWidth;
      inputRef.current.style.width = `${Math.max(70, textWidth)}px`;
    }
  }, []);

  useEffect(() => {
    adjustWidth();
    window.addEventListener("resize", adjustWidth);
    return () => window.removeEventListener("resize", adjustWidth);
  }, [adjustWidth]);

  return { inputRef, measureRef, adjustWidth };
};

export default function AutoAdjustingInput({
  error = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
}) {
  const { inputRef, measureRef, adjustWidth } = useAutoAdjustingInput();

  useEffect(() => {
    adjustWidth();
  }, [props.value, adjustWidth]);

  return (
    <div className="relative flex items-center gap-2">
      <Input
        ref={inputRef}
        {...props}
        className={cn(
          "hover:bg-state-hover-primary focus-within:bg-state-hover-primary h-7 min-w-[70px] border-transparent py-1 pl-2 pr-2 outline-none transition-all duration-100 ease-in-out",
          {
            "border-red-600 hover:border-transparent focus:border-transparent":
              error,
          },
          props.className
        )}
      />
      {error && <IconTriangleInverted className="h-4 w-4 text-red-500" />}
      <span
        ref={measureRef}
        className="invisible absolute left-0 whitespace-pre px-2"
        aria-hidden="true"
      >
        {props.value}
      </span>
    </div>
  );
}
