import type { FC } from "react";
import { useGetReviews } from "../hooks/queries/useGetReviews";
import { Divider } from "./commons/Divider";
import { Card } from "./commons/Card";
import { StoreIcon } from "lucide-react";
import dayjs from "dayjs";
import { filter } from "../utils/functions";
import { Link } from "react-router";

interface Props {
  username: string;
  preview?: boolean;
}

export const ReviewsList: FC<Props> = ({ username, preview }) => {
  const { data, isPending } = useGetReviews({
    filter: filter().and("username", "eq", `'${username}'`),
    perPage: preview ? 3 : undefined,
    queryKey: [username],
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <section className="w-full">
        <div className="flex w-full justify-between">
          <h1 className="font-title font-bold text-2xl">Suas Críticas</h1>

          <Link
            to="#"
            className="flex items-end text-xs hover:underline uppercase"
          >
            Visualizar Todas
          </Link>
        </div>

        <Divider className="my-2" />

        <div className="flex flex-col gap-3 items-center w-full">
          {!data.data.reviews.length && <div>Nenhuma crítica no momento</div>}
          {data.data.reviews.map((review) => (
            <Card key={review.id} className="w-full">
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
