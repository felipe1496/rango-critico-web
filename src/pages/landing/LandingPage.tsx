import type { FC } from "react";
import { Page } from "../../components/commons/Page";
import { Button } from "../../components/commons/Button";
import { Link } from "react-router";
import { routes } from "../../constants/routes";
import { Card } from "../../components/commons/Card";
import { BookmarkIcon, ChefHatIcon, ContactIcon, StarIcon } from "lucide-react";

export const LandingPage: FC = () => {
  return (
    <Page title="Página Inicial">
      <div className="flex items-center justify-center w-full">
        <main className="w-full max-w-5xl mt-8 flex flex-col gap-16">
          <section className="flex flex-col gap-8 mt-14">
            <h1 className="text-3xl font-bold font-title text-center">
              Acompanhe os restaurantes que você visitou.
              <br />
              Salve aqueles que você quer visitar.
              <br />
              Conte aos amigos os que são bons.
            </h1>
            <div className="flex items-center justify-center">
              <Button asChild className="font-medium">
                <Link to={routes.auth.login}>Comece agora - é grátis!</Link>
              </Button>
            </div>
            <span className="text-muted text-center">
              A rede social para amantes da gastronomia.
            </span>
          </section>

          <section className="relative shadow">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <span className="uppercase font-bold text-bold text-xl font-title text-amber-400 text-shadow-lg text-shadow-black/40">
                Esqueceu se gostou? Critique no app e nunca mais erre.
              </span>
              <span className="text-white text-sm font-bold text-shadow-lg text-shadow-black/40">
                Já gastou tempo e dinheiro em um restaurante porque não <br />{" "}
                lembrava se valeu a pena da última vez?
              </span>
            </div>
            <img
              src="/sushi.webp"
              alt="Sushi dish with many pieces horizontally lined up"
              className="h-[100px] w-full object-cover object-right"
            />
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-xs uppercase">
              Com Rango Crítico você pode...
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="flex gap-4 items-center">
                <ChefHatIcon className="size-10 shrink-0" />

                <p>
                  Acompanhe e registre todos os restaurantes que você visitou.
                </p>
              </Card>

              <Card className="flex gap-4 items-center">
                <StarIcon className="size-10 shrink-0" />

                <p>
                  Avaliar os restaurantes em uma escala de 5 estrelas e deixe
                  que os outros vejam o que você achou.
                </p>
              </Card>

              <Card className="flex gap-4 items-center">
                <ContactIcon className="size-10 shrink-0" />

                <p>
                  Ser seguido e seguir amigos para compartilhar suas críticas.
                </p>
              </Card>

              <Card className="flex gap-4 items-center">
                <BookmarkIcon className="size-10 shrink-0" />

                <p>
                  Favorite os melhores restaurantes no perfil para mostrar para
                  todos seus prediletos.
                </p>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </Page>
  );
};
