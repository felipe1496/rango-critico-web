import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { routes } from "../constants/routes";

export const useSession = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return {
    logout: () => {
      localStorage.clear();
      queryClient.clear();
      queryClient.cancelQueries();
      navigate(routes.auth.login);
    },
  };
};
