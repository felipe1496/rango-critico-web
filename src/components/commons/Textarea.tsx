import type { FC, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/functions";

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <textarea
      className={cn("border border-zinc-200 rounded-md p-1", className)}
      {...props}
    />
  );
};
