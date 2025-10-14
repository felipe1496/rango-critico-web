/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

interface Props<T> {
  opts: {
    label: ReactNode;
    value: T;
  }[];
  selected?: {
    label: ReactNode;
    value: T;
  } | null;
  onChange: (value?: T | null) => void;
}

export function Select<T = any>({ opts, onChange }: Props<T>) {
  return (
    <select onChange={(e) => onChange(JSON.parse(e.target.value))}>
      {opts.map((opt) => (
        <option key={JSON.stringify(opt)} value={JSON.stringify(opt)}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
