import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Query } from "../../utils/types";

export type GetProfileResponse = {
  data: {
    profile: {
      username: string;
      name: string;
      avatar_url?: string | null;
    };
  };
};

export const useGetProfile = ({
  queryKey = [],
  username,
  ...props
}: Query<GetProfileResponse> & { username: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.QUERIES.GET_PROFILE, ...queryKey],
    queryFn: async () => {
      const { data } = await api.get(`/v1/profiles/${username}`);

      return data;
    },
    ...props,
  });
};
