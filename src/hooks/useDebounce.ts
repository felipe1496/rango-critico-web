import { useState, useEffect } from "react";

/**
 * Hook que retorna um valor apenas após um delay sem mudanças
 * @param value valor que vai ser "debounced"
 * @param delay tempo em ms (ex: 500 = meio segundo)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timeout caso o valor mude antes do delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
