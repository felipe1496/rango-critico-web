import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps, FC } from "react";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent: FC<
  ComponentProps<typeof PopoverPrimitive.Content>
> = ({ ...props }) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className="bg-white border border-zinc-200 rounded-md shadow-md w-[var(--radix-popover-trigger-width)] mt-1 z-50"
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
};
