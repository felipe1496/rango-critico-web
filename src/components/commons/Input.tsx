import {
  Fragment,
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/functions";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode | null;
}

export const Input: FC<Props> = ({ label, ...props }) => {
  const Wrapper = label ? "label" : Fragment;

  const wrapperProps = {};

  if (label) {
    Object.assign(wrapperProps, { className: "flex flex-col gap-1 w-full" });
  }

  const renderLabel = () => {
    if (!label) return null;

    if (typeof label === "string") {
      return <span className="text-sm">{label}</span>;
    } else {
      return label;
    }
  };

  return (
    <Wrapper {...wrapperProps}>
      {renderLabel()}
      <input
        type="text"
        className={cn(
          "w-full bg-white px-3 h-8 border border-zinc-200 rounded-md"
        )}
        {...props}
      />
    </Wrapper>
  );
};
