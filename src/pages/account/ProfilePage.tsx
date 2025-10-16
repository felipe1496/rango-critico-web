import { ReviewsList } from "../../components/ReviewsList";
import { useStrictParams } from "../../hooks/useStrictParams";
import { ProfileInfo } from "../../components/ProfileInfo";
import { Page } from "../../components/commons/Page";

export const ProfilePage = () => {
  const { username } = useStrictParams<{ username: string }>();

  return (
    <Page title="Perfil">
      <div className="flex items-center justify-center w-full">
        <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
          <ProfileInfo username={username} />

          <ReviewsList username={username} preview />
        </main>
      </div>
    </Page>
  );
};
