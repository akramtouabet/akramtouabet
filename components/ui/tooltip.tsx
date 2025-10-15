"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function Tooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={6}
            className="z-50 max-w-xs rounded-md border border-white/10 bg-black px-3 py-2 text-sm text-gray-200 shadow-sm"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-black" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
