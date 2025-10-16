import { useState, type FormEvent, type ReactNode } from "react";
import type { FCC } from "../../utils/types";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  PopoverXClose,
} from "./Popover";
import { Button } from "./Button";
import { FunnelIcon, Trash2Icon } from "lucide-react";
import { cn } from "../../utils/functions";

interface Props {
  trigger?: ReactNode;
  onApply?: (evt: FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export const FilterOptions: FCC<Props> = ({
  children,
  onApply,
  onClear,
  disabled,
  trigger = (
    <button
      className={cn(
        "uppercase items-end text-xs flex disabled:text-muted",
        disabled
          ? "text-muted cursor-not-allowed"
          : "hover:underline cursor-pointer"
      )}
      disabled={disabled}
    >
      Opções de Filtros
    </button>
  ),
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-96">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpen(false);
            onApply?.(e);
          }}
        >
          <PopoverXClose />
          <div className="px-4 py-2">
            <span className="font-title font-bold text-xl">Filtros</span>
          </div>
          <div className="flex flex-col gap-2 px-4 py-2">{children}</div>
          <div className="flex justify-between px-4 py-2">
            <PopoverClose asChild>
              <Button size="sm" variant="outlined" onClick={onClear}>
                <Trash2Icon className="size-4" />
                Limpar
              </Button>
            </PopoverClose>

            <Button size="sm" type="submit">
              <FunnelIcon className="size-4" />
              Aplicar
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
