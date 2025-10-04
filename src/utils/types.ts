/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

export type FCC<T = object> = FC<{ children?: ReactNode } & T>;

export type ApiError = {
  message: string;
  status: number;
  error: string;
};

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
