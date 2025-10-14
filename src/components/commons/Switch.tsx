import type { FC } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

interface Props {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: FC<Props> = ({ id, checked, onChange }) => {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onChange}
      className="relative h-[20px] w-[37px] cursor-default rounded-full border border-zinc-400 outline-none bg-zinc-300 data-[state=checked]:bg-green-500"
      id={id}
    >
      <SwitchPrimitive.Thumb className="block size-[16px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
    </SwitchPrimitive.Root>
  );
};
