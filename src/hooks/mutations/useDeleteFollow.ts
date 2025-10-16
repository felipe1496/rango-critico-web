import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Mutation } from "../../utils/types";

export type DeleteReviewRequest = {
  data: {
    unfollow: {
      username: string;
    };
  };
};

export const useDeleteFollow = ({
  mutationKey = [],
  ...props
}: Mutation<void, DeleteReviewRequest> = {}) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.MUTATIONS.DELETE_FOLLOW, ...mutationKey],
    mutationFn: async (variables) => {
      const { data } = await api.delete(
        `/v1/follows/${variables.data.unfollow.username}`
      );

      return data;
    },
    ...props,
  });
};
