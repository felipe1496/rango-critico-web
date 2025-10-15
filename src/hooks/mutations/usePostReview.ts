import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Mutation } from "../../utils/types";

export type PostReviewRequest = {
  data: {
    review: {
      restaurant_id: string;
      comment?: string | null;
      rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
      visited_at: string;
    };
  };
};

export type PostReviewResponse = {
  data: {
    review: {
      id: string;
      comment?: string | null;
      rating: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
      visited_at: string;
      restaurant: {
        id: string;
        name: string;
        description?: string | null;
        avatar_url?: string | null;
        created_at: string;
      };
    };
  };
};

export const usePostReview = ({
  mutationKey = [],
  ...props
}: Mutation<PostReviewResponse, PostReviewRequest> = {}) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.MUTATIONS.POST_REVIEW, ...mutationKey],
    mutationFn: async (body) => {
      const { data } = await api.post("/v1/reviews", body);

      return data;
    },
    ...props,
  });
};
