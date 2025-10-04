import type { ButtonHTMLAttributes, FC } from "react";
import { cn } from "../../utils/functions";
const variants = {
  primary: "bg-amber-400 text-zinc-800 shadow-lg hover:bg-amber-500",
  outlined: "border border-amber-500 hover:bg-amber-100",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-6 py-3 text-lg",
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
        "rounded-full cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50 flex gap-1 items-center justify-center",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
