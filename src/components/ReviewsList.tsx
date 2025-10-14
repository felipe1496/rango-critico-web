import { useState, type FC } from "react";
import { useGetReviews } from "../hooks/queries/useGetReviews";
import { Divider } from "./commons/Divider";
import { Card } from "./commons/Card";
import { StoreIcon } from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router";
import { routes } from "../constants/routes";
import { FilterOptions } from "./commons/FilterOptions";
import { Input } from "./commons/Input";
import { Rating } from "./commons/Rating";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "./commons/Switch";
import { filter } from "../utils/functions";
import { clone } from "lodash";

type FilterType = {
  name: string;
  visited_at: string | null;
  comment: string;
  rating: number;
};

interface Props {
  username: string;
  preview?: boolean;
}

export const ReviewsList: FC<Props> = ({ username, preview }) => {
  const [ratingFilterIsEnabled, setRatingFilterIsEnabled] = useState(false);
  const [filterInst, setFilterInst] = useState(filter());

  const { data, isPending } = useGetReviews({
    filter: filterInst,
    username,
    perPage: preview ? 3 : undefined,
    queryKey: [username, filterInst.build()],
  });

  const { register, control, handleSubmit, reset } = useForm<FilterType>({
    defaultValues: {
      name: "",
      visited_at: null,
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (data: FilterType) => {
    console.log("oi");
    setFilterInst((_inst) => {
      const inst = clone(_inst);
      inst.clear();

      if (data.name) {
        inst.and("restaurant_name", "like", `'${data.name}'`);
      }

      if (data.comment) {
        inst.and("review_comment", "like", `'${data.comment}'`);
      }

      if (data.visited_at) {
        inst.and(
          "review_visited_at",
          "gte",
          `'${dayjs(data.visited_at).toISOString()}'`
        );
        inst.and(
          "review_visited_at",
          "lt",
          `'${dayjs(data.visited_at).add(1, "day").toISOString()}'`
        );
      }

      if (ratingFilterIsEnabled) {
        inst.and("review_rating", "eq", `${data.rating}`);
      }

      return inst;
    });
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <section className="w-full">
        <div className="flex w-full justify-between">
          <h1 className="font-title font-bold text-2xl">Suas Críticas</h1>

          {preview ? (
            <Link
              to={routes.reviews.index.replace(":username", username)}
              className="flex items-end text-xs hover:underline uppercase"
            >
              Visualizar Todas
            </Link>
          ) : (
            <FilterOptions
              onClear={() => {
                setFilterInst(filter());
                reset();
              }}
              onApply={handleSubmit(onSubmit)}
            >
              <Input label="Restaurante" {...register("name")} />
              <Input label="Data" type="date" {...register("visited_at")} />
              <Input label="Crítica" {...register("comment")} />
              <label htmlFor="">
                <Controller
                  name="rating"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <div className="flex items-center gap-2">
                        <span>Avaliação</span>
                        <Switch
                          id="rating-filter-is-enabled"
                          onChange={(v) => {
                            setRatingFilterIsEnabled(v);
                            onChange(0);
                          }}
                          checked={ratingFilterIsEnabled}
                        />
                      </div>
                      <Rating
                        id="rating-filter"
                        rating={value}
                        onChange={onChange}
                        disabled={!ratingFilterIsEnabled}
                      />
                    </>
                  )}
                />
              </label>
            </FilterOptions>
          )}
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
