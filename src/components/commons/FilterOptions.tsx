import type { FormEvent, ReactNode } from "react";
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

interface Props {
  trigger?: ReactNode;
  onApply?: (evt: FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

export const FilterOptions: FCC<Props> = ({
  children,
  onApply,
  onClear,
  trigger = (
    <button className="uppercase hover:underline items-end text-xs flex cursor-pointer">
      Opções de Filtros
    </button>
  ),
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-96">
        <form onSubmit={onApply}>
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
