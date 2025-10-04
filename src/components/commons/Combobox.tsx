import { useState, type ReactNode } from "react";
import { Input } from "./Input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from "./Popover";
import { cn } from "../../utils/functions";
import { LoaderCircle } from "lucide-react";

interface Props<T> {
  options: T[];
  id: (option: T) => string;
  label: (option: T) => ReactNode;
  className?: string;
  placeholder?: string;
  selected?: T | null;
  onChange?: (option: T) => void;
  isLoading?: boolean;
  query?: string;
  onQueryChange?: (query: string) => void;
}

export const Combobox = <T,>({
  options,
  label,
  id,
  className,
  placeholder,
  selected,
  onChange = () => {},
  query = "",
  onQueryChange,
  isLoading = false,
}: Props<T>) => {
  const [optsIsVisible, setOptsIsVisible] = useState(false);

  const queryFilteredOptions =
    query && onQueryChange
      ? options
      : options.filter((option) =>
          id(option).toLowerCase().includes(query.toLowerCase())
        );

  const renderOptions = () => {
    if (isLoading) {
      return (
        <li className="p-2 flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </li>
      );
    }

    if (queryFilteredOptions.length) {
      return queryFilteredOptions.map((option) => (
        <li
          key={id(option)}
          className="p-2 hover:bg-zinc-100 cursor-pointer"
          onClick={() => {
            onChange(option);
            setOptsIsVisible(false);
          }}
        >
          {label(option)}
        </li>
      ));
    }

    return (
      <li className="p-2 flex items-center justify-center">Nenhum resultado</li>
    );
  };

  return (
    <Popover open={optsIsVisible} onOpenChange={setOptsIsVisible}>
      <PopoverAnchor asChild>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full bg-white px-3 h-8 border border-zinc-200 rounded-md cursor-pointer flex items-center justify-between",
              className
            )}
          >
            {selected ? label(selected) : placeholder || "Selecionar..."}

            {isLoading && <LoaderCircle className="animate-spin" />}
          </button>
        </PopoverTrigger>
      </PopoverAnchor>

      <PopoverContent>
        <div className="p-2 border-b border-zinc-200">
          <Input
            value={query}
            onChange={(evt) => onQueryChange && onQueryChange(evt.target.value)}
          />
        </div>
        <ul>{renderOptions()}</ul>
      </PopoverContent>
    </Popover>
  );
};
