import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Filter, Query } from "../../utils/types";

export type GetReviewsResponse = {
  data: {
    reviews: {
      id: string;
      name: string;
      comment?: string | null;
      rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
      visited_at: string;
      created_at: string;
      restaurant: {
        id: string;
        name: string;
        description?: string | null;
        avatar_url?: string | null;
        created_at: string;
      };
    }[];
  };
  query: {
    page: number;
    per_page: number;
    next_page: number;
  };
};

export const useGetReviews = ({
  queryKey = [],
  username,
  perPage,
  filter,
  ...props
}: Query<GetReviewsResponse> & {
  username: string;
  perPage?: number;
  filter?: Filter;
}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUERIES.GET_REVIEWS, ...queryKey],
    queryFn: async () => {
      const { data } = await api.get(`/v1/reviews/${username}`, {
        params: {
          per_page: perPage,
          sort: "review_visited_at",
          order: "desc",
          filter: filter?.build(),
        },
      });

      return data;
    },
    ...props,
  });
};
