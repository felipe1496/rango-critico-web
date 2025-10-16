import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { routes } from "../constants/routes";
import { useAppStore } from "../stores/app-store";

export const useSession = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { sessionUser, setSessionUser } = useAppStore();

  return {
    logout: () => {
      localStorage.clear();
      queryClient.clear();
      queryClient.cancelQueries();
      navigate(routes.auth.login);
    },
    sessionUser,
    setSessionUser,
  };
};
