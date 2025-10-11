import { useParams } from "react-router";

export function useStrictParams<T extends Record<string, string>>() {
  const params = useParams<T>();

  for (const key of Object.keys(params)) {
    /* @ts-expect-error Type 'string' is not assignable to type 'keyof T'. */
    const value = params[key as keyof T];
    if (value === undefined) {
      throw new Error(`Missing required route param: "${key}"`);
    }
  }

  return params as T; // agora seguro
}
