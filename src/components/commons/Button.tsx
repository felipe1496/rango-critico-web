import type { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../utils/functions";
const variants = {
  primary: "bg-amber-400 text-zinc-800 shadow-lg hover:bg-amber-500",
  secondary: "bg-zinc-300 hover:bg-zinc-400",
  outlined: "border border-zinc-300 hover:bg-zinc-200",
};

const sizes = {
  sm: "px-2 h-8 text-sm",
  md: "px-3 h-10",
  lg: "px-6 h-12 text-lg",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button: FC<Props> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-lg cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 flex gap-1 items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
