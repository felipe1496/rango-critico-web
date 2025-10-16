import { ReviewsList } from "../../components/ReviewsList";
import { useStrictParams } from "../../hooks/useStrictParams";
import { ProfileInfo } from "../../components/ProfileInfo";
import { Page } from "../../components/commons/Page";
import { useGetProfile } from "../../hooks/queries/useGetProfile";

export const ProfilePage = () => {
  const { username } = useStrictParams<{ username: string }>();

  const { data: profileData } = useGetProfile({ username });

  return (
    <Page
      title={
        profileData
          ? `Perfil de ${profileData.data.profile.name.split(" ")[0]}`
          : "Perfil"
      }
    >
      <div className="flex items-center justify-center w-full">
        <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
          <ProfileInfo username={username} />

          <ReviewsList username={username} preview />
        </main>
      </div>
    </Page>
  );
};
