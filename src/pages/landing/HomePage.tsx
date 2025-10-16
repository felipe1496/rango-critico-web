import { Link } from "react-router";
import { Page } from "../../components/commons/Page";
import { useSession } from "../../hooks/useSession";
import { routes } from "../../constants/routes";

export const HomePage = () => {
  const { sessionUser } = useSession();

  return (
    <Page title="Página Inicial">
      <div className="flex items-center justify-center w-full">
        <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
          <span className="text-2xl font-thin text-center">
            Bem vindo de volta,{" "}
            <Link
              to={routes.account.profile.replace(
                ":username",
                sessionUser?.username || ""
              )}
              className="font-medium"
            >
              {sessionUser?.name.split(" ")[0]}
            </Link>
            . Aqui estão os restaurantes que seus amigos vêem visitando...
          </span>
        </main>
      </div>
    </Page>
  );
};
