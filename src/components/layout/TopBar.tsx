import type { FC } from "react";
import { useAppStore } from "../../stores/app-store";
import { Button } from "../commons/Button";
import { Avatar } from "../commons/Avatar";

export const TopBar: FC = () => {
  const { sessionUser } = useAppStore();

  const renderUserSection = () => {
    if (sessionUser) {
      return (
        <Avatar
          src={sessionUser.avatar_url}
          fallback={
            <div className="size-10 border-2 border-amber-400 rounded-full flex items-center justify-center">
              {sessionUser.name.charAt(0).toUpperCase()}
            </div>
          }
        />
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
