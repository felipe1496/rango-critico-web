import type { FC, HTMLAttributes } from "react";
import { cn } from "../../utils/functions";

interface Props extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  width?: number;
  height?: number;
}

export const Divider: FC<Props> = ({
  className,
  orientation = "horizontal",
  width = 1,
  height = 1,
  ...props
}) => (
  <div
    className={cn("bg-zinc-300 rounded-full", className)}
    style={{
      width: orientation === "horizontal" ? "100%" : width,
      height: orientation === "vertical" ? "100%" : height,
    }}
    {...props}
  />
);
