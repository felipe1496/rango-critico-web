import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { api } from "../../services/api";
import type { Mutation } from "../../utils/types";

export type GoogleLoginRequest = {
  data: {
    access_token: string;
  };
};

export type GoogleLoginResponse = {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      avatar_url: string;
      created_at: string;
    };
    session: {
      token: string;
      expires_at: string;
    };
  };
};

export const useGoogleLogin = ({
  ...props
}: Mutation<GoogleLoginResponse, GoogleLoginRequest>) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.MUTATIONS.GOOGLE_LOGIN],
    mutationFn: async (body) => {
      const { data } = await api.post("/v1/auth/login/google", body);

      return data;
    },
    ...props,
  });
};
