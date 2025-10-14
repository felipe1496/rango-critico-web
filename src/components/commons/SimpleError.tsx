import { TriangleAlertIcon } from "lucide-react";
import type { FC } from "react";
import { cn } from "../../utils/functions";

interface Props {
  message?: string;
  className?: string;
}

export const SimpleError: FC<Props> = ({ message, className }) => {
  return (
    <div
      className={cn(
        "border border-zinc-200 flex flex-col items-center justify-center h-32 w-full",
        className
      )}
    >
      <TriangleAlertIcon className="size-10" />
      <span className="font-title font-bold">Sentimos muito...</span>
      <span className="text-sm">{message || "Ocorreu um erro inesperado"}</span>
    </div>
  );
};
