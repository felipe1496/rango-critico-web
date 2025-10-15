import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps, FC } from "react";
import { cn } from "../../utils/functions";

export const Tabs = TabsPrimitive.Root;
export const TabsList: FC<ComponentProps<typeof TabsPrimitive.List>> = ({
  className,
  ...props
}) => (
  <TabsPrimitive.List
    className={cn("border-b border-zinc-300", className)}
    {...props}
  />
);

export const TabsTrigger: FC<ComponentProps<typeof TabsPrimitive.Trigger>> = ({
  className,
  ...props
}) => (
  <TabsPrimitive.Trigger
    className={cn(
      "px-4 py-1 cursor-pointer data-[state=active]:text-amber-500 data-[state=active]:font-medium data-[state=active]:border-b data-[state=active]:border-amber-500 text-sm uppercase",
      className
    )}
    {...props}
  />
);

export const TabsContent = TabsPrimitive.Content;
