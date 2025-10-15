import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Mutation } from "../../utils/types";

export type PatchUserRequest = {
  data: {
    user: {
      name?: string;
      username?: string;
    };
  };
};

export type PatchUserResponse = {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar_url?: string | null;
      created_at: string;
      username: string;
    };
  };
};

export const usePatchUser = ({
  mutationKey = [],
  ...props
}: Mutation<PatchUserResponse, PatchUserRequest> = {}) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.MUTATIONS.PATCH_USER, ...mutationKey],
    mutationFn: async (body) => {
      const { data } = await api.patch("/v1/users", body);

      return data;
    },
    ...props,
  });
};
