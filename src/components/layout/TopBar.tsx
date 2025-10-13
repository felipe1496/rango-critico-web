import { useState, type FC } from "react";
import { useAppStore } from "../../stores/app-store";
import { Button } from "../commons/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../commons/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../commons/DropdownMenu";
import { Link, useNavigate } from "react-router";
import { routes } from "../../constants/routes";
import { DoorOpenIcon, PlusIcon, UserIcon } from "lucide-react";
import { ReviewDialog } from "../ReviewDialog";
import { useQueryClient } from "@tanstack/react-query";

export const TopBar: FC = () => {
  const [createReviewDialogIsOpen, setCreateReviewDialogIsOpen] =
    useState(false);

  const { sessionUser } = useAppStore();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const renderUserSection = () => {
    if (sessionUser) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage
                src={sessionUser.avatar_url}
                className="size-10 rounded-full"
              />
              <AvatarFallback asChild>
                <div className="size-10 border-2 border-amber-400 rounded-full flex items-center justify-center">
                  {sessionUser.name.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            </Avatar>
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
            <DropdownMenuItem
              onClick={() => {
                localStorage.clear();
                queryClient.clear();
                queryClient.cancelQueries();
                navigate(routes.auth.login, { replace: true });
              }}
              className="flex items-center gap-1 text-red-500 hover:bg-red-100"
            >
              <DoorOpenIcon className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button asChild>
        <Link to={routes.auth.login}>Entrar</Link>
      </Button>
    );
  };

  return (
    <header className="w-screen h-16 fixed top-0 items-center justify-center flex">
      <div className="w-full max-w-5xl flex justify-between items-center">
        <Link to={routes.landing.home}>
          <h1 className="font-title text-3xl font-bold">Rango Crítico</h1>
        </Link>

        <div className="flex gap-6 items-center">
          {sessionUser && (
            <Button onClick={() => setCreateReviewDialogIsOpen(true)} size="sm">
              <PlusIcon className="size-4" />
              Nova Crítica
            </Button>
          )}

          {renderUserSection()}
        </div>
      </div>

      <ReviewDialog
        isOpen={createReviewDialogIsOpen}
        onIsOpenChange={setCreateReviewDialogIsOpen}
      />
    </header>
  );
};
