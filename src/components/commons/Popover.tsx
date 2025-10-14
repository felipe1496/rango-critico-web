import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";
import { cn } from "../../utils/functions";
import { XIcon } from "lucide-react";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent: FC<
  ComponentProps<typeof PopoverPrimitive.Content>
> = ({ className, ...props }) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className={cn(
          "bg-white border border-zinc-200 rounded-md shadow-md w-[var(--radix-popover-trigger-width)] mt-1 z-50",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};

export const PopoverXClose: FC = () => (
  <PopoverPrimitive.Close asChild>
    <button className="cursor-pointer absolute top-4 right-4">
      <XIcon />
    </button>
  </PopoverPrimitive.Close>
);

export const PopoverClose = PopoverPrimitive.Close;
