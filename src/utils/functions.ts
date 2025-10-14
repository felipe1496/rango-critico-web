import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tw-merge";
import type { StateCreator } from "zustand";
import { create as actualCreate } from "zustand";
import type { Filter, Operator } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const createStore = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    storeResetFns.add(() => {
      store.setState(store.getInitialState(), true);
    });
    return store;
  };
}) as typeof actualCreate;

export const filter = (): Filter => {
  let filterStrs: string[] = [];

  const and = (field: string, operator: Operator, value: string) => {
    filterStrs.push(`${field} ${operator} ${value}`);
    return _this;
  };

  const or = (conds: [string, Operator, string][]) => {
    filterStrs.push(`(${conds.map((c) => c.join(" ")).join(" or ")})`);
    return _this;
  };

  const build = () => {
    return filterStrs.length ? filterStrs.join(" and ") : null;
  };

  const clear = () => {
    filterStrs = [];
    return _this;
  };

  const _this = {
    and,
    or,
    build,
    clear,
  };

  return _this;
};
