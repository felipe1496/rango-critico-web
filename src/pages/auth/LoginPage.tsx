import { useState, type FC } from "react";
import { Button } from "../../components/commons/Button";
import { useGoogleLogin as useOAuthGoogle } from "@react-oauth/google";
import { useGoogleLogin } from "../../hooks/mutations/useGoogleLogin";
import { useNavigate } from "react-router";
import { routes } from "../../constants/routes";
import { toast } from "sonner";
import { Page } from "../../components/commons/Page";
import { useSession } from "../../hooks/useSession";

export const LoginPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setSessionUser } = useSession();

  const navigate = useNavigate();

  const { mutate: googleLogin } = useGoogleLogin({
    onSuccess: ({ data }) => {
      setSessionUser(data.user);
      localStorage.setItem("session_token", data.session.token);
      localStorage.setItem("session_user", JSON.stringify(data.user));
      navigate(routes.landing.home);
      toast.success("Login realizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Ocorreu um erro ao realizar o login: " + error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const oauthGoogle = useOAuthGoogle({
    onSuccess: (tokenResponse) => {
      googleLogin({ data: { access_token: tokenResponse.access_token } });
    },
  });

  return (
    <Page title="Entrar">
      <main className="flex flex-col items-center justify-center gap-4 mt-20">
        <div className="flex items-center gap-2 relative">
          <img
            src="/logo.webp"
            alt="app logo"
            className="size-12 absolute -left-14"
          />
          <h1 className="text-2xl font-medium">Entrar em Rango Crítico</h1>
        </div>
        <Button
          variant="outlined"
          className="w-64"
          onClick={() => {
            setIsLoading(true);
            oauthGoogle();
          }}
          disabled={isLoading}
        >
          <img src="/google.svg" alt="google logo" className="size-4" />
          Entrar com Google
        </Button>
      </main>
    </Page>
  );
};
