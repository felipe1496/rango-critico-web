import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Mutation } from "../../utils/types";

export type PostReviewRequest = {
  data: {
    follow: {
      username: string;
    };
  };
};

export const usePostFollow = ({
  mutationKey = [],
  ...props
}: Mutation<void, PostReviewRequest> = {}) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.MUTATIONS.POST_FOLLOW, ...mutationKey],
    mutationFn: async (variables) => {
      const { data } = await api.post(
        `/v1/follows/${variables.data.follow.username}`
      );

      return data;
    },
    ...props,
  });
};
