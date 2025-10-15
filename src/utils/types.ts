/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { FC, ReactNode } from "react";

export type FCC<T = object> = FC<{ children?: ReactNode } & T>;

export type ApiError = AxiosError<{
  message: string;
  status: number;
  error: string;
}>;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Mutation<TData = any, TVariables = any> = UseMutationOptions<
  TData,
  ApiError,
  TVariables
>;

export type Query<TData = any> = PartialBy<
  Omit<UseQueryOptions<TData, ApiError>, "queryFn">,
  "queryKey"
>;

export type Operator =
  | "eq"
  | "ne"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "nin"
  | "like"
  | "nlike"
  | "sw"
  | "ew"
  | "is"
  | "isn";

export type Filter = {
  and: (field: string, operator: Operator, value: string) => Filter;
  or: (conds: [string, Operator, string][]) => Filter;
  build: () => string | null;
  clear: () => Filter;
};
