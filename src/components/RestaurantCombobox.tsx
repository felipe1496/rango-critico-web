import { useState, type FC } from "react";
import { Combobox } from "./commons/Combobox";
import {
  useGetRestaurants,
  type GetRestaurantsResponse,
} from "../hooks/queries/useGetRestaurants";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  selected?: GetRestaurantsResponse["data"]["restaurants"][number] | null;
  onChange: (
    restaurant: GetRestaurantsResponse["data"]["restaurants"][number] | null
  ) => void;
}

export const RestaurantCombobox: FC<Props> = ({ selected, onChange }) => {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const { data, isPending } = useGetRestaurants({
    queryKey: [debouncedQuery],
    query: debouncedQuery,
  });

  return (
    <Combobox
      id={(option) => option.name}
      label={(option) => option.name}
      options={data?.data.restaurants ?? []}
      selected={selected}
      onChange={(r) => {
        onChange(r);
      }}
      className="w-[500px]"
      placeholder="Buscar restaurante..."
      isLoading={isPending}
      query={query}
      onQueryChange={setQuery}
    />
  );
};
