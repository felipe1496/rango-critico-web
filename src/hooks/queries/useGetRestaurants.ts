import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Query } from "../../utils/types";

export type GetRestaurantsResponse = {
  data: {
    restaurants: {
      id: string;
      name: string;
      description?: string | null;
      avatar_url?: string | null;
      created_at: string;
    }[];
  };
  query: {
    page: number;
    per_page: number;
    next_page: number;
  };
};

export const useGetRestaurants = ({
  queryKey = [],
  query = "",
  ...props
}: Query<GetRestaurantsResponse> & {
  query?: string;
} = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUERIES.GET_RESTAURANTS, ...queryKey],
    queryFn: async () => {
      const params = {};

      if (query) {
        Object.assign(params, {
          filter: `name like '${query}'`,
        });
      }

      const { data } = await api.get("/v1/restaurants", { params });

      return data;
    },
    ...props,
  });
};
