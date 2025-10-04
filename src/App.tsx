import { Route, Routes } from "react-router";
import type { FCC } from "./utils/types";
import { LoginPage } from "./pages/auth/LoginPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./constants/routes";
import { Toaster } from "sonner";
import { useAppStore } from "./stores/app-store";
import { HomePage } from "./pages/landing/HomePage";
import { LandingPage } from "./pages/landing/LandingPage";
import { useEffect } from "react";
import { Layout } from "./components/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App: FCC = () => {
  const { sessionUser, setSessionUser, shouldRenderApp, setShouldRenderApp } =
    useAppStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("session_user");
    const sessionToken = localStorage.getItem("session_token");

    if (storedUser && sessionToken) {
      setSessionUser(JSON.parse(storedUser));
    } else {
      localStorage.removeItem("session_user");
      localStorage.removeItem("session_token");
      setSessionUser(null);
    }

    setShouldRenderApp(true);
  }, [setSessionUser, setShouldRenderApp]);

  return (
    <GoogleOAuthProvider clientId="341378880284-flneomnqoan713odlle1v95lvc4efpoi.apps.googleusercontent.com">
      <Toaster richColors position="bottom-left" />
      <QueryClientProvider client={queryClient}>
        {shouldRenderApp ? (
          <Routes>
            <Route path={routes.auth.login} element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route
                index
                element={sessionUser ? <HomePage /> : <LandingPage />}
              />
            </Route>
          </Routes>
        ) : null}
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};
