import type { FC } from "react";
import { FixingBroIcon } from "../icons/FixingBroIcon";

interface Props {
  iconClassName?: string;
  message?: string;
}

export const Error: FC<Props> = ({ iconClassName, message }) => (
  <div className="flex items-center justify-center flex-col">
    <FixingBroIcon className={iconClassName || "size-72"} />
    <div className="flex flex-col items-center justify-center -translate-y-8">
      <span className="font-title font-bold text-2xl">Sentimos muito...</span>
      <span>{message || "Ocorreu um erro inesperado"}</span>
    </div>
  </div>
);
