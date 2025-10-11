import type { FC, HTMLAttributes } from "react";
import { cn } from "../../utils/functions";

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => (
  <div className={cn("p-4 bg-white rounded-lg shadow", className)}>
    {children}
  </div>
);
