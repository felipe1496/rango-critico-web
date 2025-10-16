import type { FC } from "react";
import { useGetProfile } from "../hooks/queries/useGetProfile";
import { Avatar, AvatarFallback, AvatarImage } from "./commons/Avatar";
import { Button } from "./commons/Button";
import { Link } from "react-router";
import { SimpleError } from "./commons/SimpleError";
import { toast } from "sonner";
import { routes } from "../constants/routes";
import { useSession } from "../hooks/useSession";
import { usePostFollow } from "../hooks/mutations/usePostFollow";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { useDeleteFollow } from "../hooks/mutations/useDeleteFollow";

interface Props {
  username: string;
}

export const ProfileInfo: FC<Props> = ({ username }) => {
  const { sessionUser } = useSession();

  const { data: profileData, error } = useGetProfile({ username });

  const queryClient = useQueryClient();

  const { mutate: follow, isPending: followIsPending } = usePostFollow({
    onSuccess: () => {
      toast.success("Usuário seguido com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.QUERIES.GET_PROFILE, username],
      });
    },
    onError: (err) => {
      if (err.status === 409) {
        toast.error("Usuário ja seguido");
      } else {
        toast.error("Ocorreu um erro ao seguir o usuário");
      }
    },
  });

  const { mutate: unfollow, isPending: unfollowIsPending } = useDeleteFollow({
    onSuccess: () => {
      toast.success("Usuário deixado de seguir com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.QUERIES.GET_PROFILE, username],
      });
    },
    onError: (err) => {
      if (err.status === 409) {
        toast.error("Você ja deixou de seguir esse usuário");
      } else {
        toast.error("Ocorreu um erro ao deixar de seguir o usuário");
      }
    },
  });

  if (profileData) {
    return (
      <section className="flex items-center justify-between">
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

          {sessionUser?.username === username ? (
            <Button size="sm" variant="secondary" asChild>
              <Link to={routes.account.settings}>Editar Perfil</Link>
            </Button>
          ) : (
            <>
              {profileData.metadata.following ? (
                <Button
                  size="sm"
                  variant="danger"
                  disabled={unfollowIsPending}
                  onClick={() =>
                    unfollow({
                      data: {
                        unfollow: {
                          username: profileData.data.profile.username,
                        },
                      },
                    })
                  }
                >
                  Deixar de Seguir
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={followIsPending}
                  onClick={() => {
                    follow({
                      data: {
                        follow: {
                          username: profileData.data.profile.username,
                        },
                      },
                    });
                  }}
                >
                  Seguir
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold font-title text-2xl">
              {profileData.data.profile.followers}
            </span>
            <span className="text-xs text-muted uppercase">Seguidores</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-bold font-title text-2xl">
              {profileData.data.profile.following}
            </span>
            <span className="text-xs text-muted uppercase">Seguindo</span>
          </div>
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
