import { ChevronLeftIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/commons/Avatar";
import { Page } from "../../components/commons/Page";
import { ReviewsList } from "../../components/ReviewsList";
import { useGetProfile } from "../../hooks/queries/useGetProfile";
import { useStrictParams } from "../../hooks/useStrictParams";
import { Link } from "react-router";
import { routes } from "../../constants/routes";

export const ReviewsPage = () => {
  const { username } = useStrictParams<{ username: string }>();

  const { data: profileData } = useGetProfile({
    username,
  });

  return (
    <Page title={`Críticas de ${username}`}>
      <div className="flex items-center justify-center w-full">
        <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
          {profileData && (
            <Link
              to={routes.account.profile.replace(":username", username)}
              className="flex items-center gap-1"
            >
              <ChevronLeftIcon className="size-5" />
              <Avatar>
                <AvatarImage
                  src={profileData.data.profile.avatar_url}
                  className="size-6 rounded-full"
                />
                <AvatarFallback asChild>
                  <div className="size-5 border-2 border-amber-400 rounded-full flex items-center justify-center text-xs">
                    {profileData.data.profile.name.charAt(0).toUpperCase()}
                  </div>
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">Voltar para o perfil</span>
            </Link>
          )}

          <ReviewsList username={username} />
        </main>
      </div>
    </Page>
  );
};
