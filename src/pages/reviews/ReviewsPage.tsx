import { ReviewsList } from "../../components/ReviewsList";
import { useStrictParams } from "../../hooks/useStrictParams";

export const ReviewsPage = () => {
  const { username } = useStrictParams<{ username: string }>();

  return (
    <div className="flex items-center justify-center w-full">
      <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
        <ReviewsList username={username} />
      </main>
    </div>
  );
};
