import type { FC } from "react";
import { useGetReviews } from "../hooks/queries/useGetReviews";
import { Divider } from "./commons/Divider";
import { Card } from "./commons/Card";
import { StoreIcon } from "lucide-react";
import dayjs from "dayjs";
import { filter } from "../utils/functions";

interface Props {
  username: string;
}

export const ReviewsList: FC<Props> = ({ username }) => {
  const { data, isPending } = useGetReviews({
    filter: filter().and("username", "eq", `'${username}'`),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <section>
        <h1 className="font-title font-bold text-3xl">Suas Críticas</h1>

        <Divider className="my-2" />

        <div className="flex flex-col gap-3">
          {data.data.reviews.map((review) => (
            <Card key={review.id}>
              <article className="flex flex-col gap-2">
                <header className="flex items-center gap-2">
                  <div>
                    <div className="bg-zinc-200 rounded-full p-3">
                      <StoreIcon className="size-5" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {review.restaurant.name && (
                      <h2 className="font-title font-bold text-xl">
                        {review.restaurant.name}
                      </h2>
                    )}
                  </div>
                </header>
                {review.comment && <p>{review.comment}</p>}
                <span className="text-sm text-muted">
                  {dayjs(review.visited_at).format("DD/MM/YYYY")}
                </span>
              </article>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return null;
};
