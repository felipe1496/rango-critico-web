import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tw-merge";
import type { StateCreator } from "zustand";
import { create as actualCreate } from "zustand";

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
