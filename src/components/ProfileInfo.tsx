import type { FC } from "react";
import { useGetProfile } from "../hooks/queries/useGetProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./commons/Avatar";
import { useAppStore } from "../stores/app-store";
import { Button } from "./commons/Button";
import { Link } from "react-router";
import { SimpleError } from "./commons/SimpleError";
import { toast } from "sonner";

interface Props {
  username: string;
}

export const ProfileInfo: FC<Props> = ({ username }) => {
  const { sessionUser } = useAppStore();

  const { data: profileData, error } = useGetProfile({ username });

  if (profileData) {
    return (
      <section>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage
              src={profileData.data.profile.avatar_url}
              alt={`${profileData.data.profile.name} profile picture`}
              className="size-24 rounded-full"
            />
            <AvatarFallback asChild>
              <div className="rounded-full size-24 bg-white shadow flex items-center justify-center text-3xl">
                {profileData.data.profile.name.charAt(0).toUpperCase()}
              </div>
            </AvatarFallback>
          </Avatar>

          <span>{profileData.data.profile.name}</span>

          {sessionUser?.username === username && (
            <Button size="sm" variant="secondary" asChild>
              <Link to="#">Editar Perfil</Link>
            </Button>
          )}
        </div>
      </section>
    );
  }

  if (error) {
    toast.error("Ocorreu um erro ao carregar as informações do perfil");
    return (
      <SimpleError message="Ocorreu um erro ao carregar as informações do perfil" />
    );
  }
};
