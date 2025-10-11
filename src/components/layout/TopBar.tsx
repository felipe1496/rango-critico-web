import type { FC } from "react";
import { useAppStore } from "../../stores/app-store";
import { Button } from "../commons/Button";
import { Avatar } from "../commons/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../commons/DropdownMenu";
import { Link } from "react-router";
import { routes } from "../../constants/routes";
import { DoorOpenIcon, UserIcon } from "lucide-react";

export const TopBar: FC = () => {
  const { sessionUser } = useAppStore();

  const renderUserSection = () => {
    if (sessionUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar
              src={sessionUser.avatar_url}
              fallback={
                <div className="size-10 border-2 border-amber-400 rounded-full flex items-center justify-center">
                  {sessionUser.name.charAt(0).toUpperCase()}
                </div>
              }
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-54" align="end">
            <DropdownMenuItem asChild>
              <Link
                to={routes.account.profile.replace(
                  ":username",
                  sessionUser.username
                )}
                className="w-full flex items-center gap-1"
              >
                <UserIcon className="size-4" /> Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 text-red-500 hover:bg-red-100">
              <DoorOpenIcon className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return <Button>Entrar</Button>;
  };

  return (
    <header className="w-screen h-16 fixed top-0 items-center justify-center flex">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <h1 className="font-title text-3xl font-bold">Rango Crítico</h1>

        {renderUserSection()}
      </div>
    </header>
  );
};
