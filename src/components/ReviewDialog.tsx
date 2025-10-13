import { useEffect, useState, type FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./commons/AlertDialog";
import { RestaurantCombobox } from "./RestaurantCombobox";
import { Textarea } from "./commons/Textarea";
import { StoreIcon } from "lucide-react";
import { Rating } from "./commons/Rating";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./commons/Input";
import { Button } from "./commons/Button";
import dayjs from "dayjs";
import { usePostReview } from "../hooks/mutations/usePostReview";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";

const schema = z.object({
  restaurant: z
    .object({
      id: z.string(),
      name: z.string(),
      avatar_url: z.string().nullable(),
      description: z.string().nullable(),
      created_at: z.string(),
    })
    .nullable(),
  rating: z.union([
    z.literal(0),
    z.literal(0.5),
    z.literal(1),
    z.literal(1.5),
    z.literal(2),
    z.literal(2.5),
    z.literal(3),
    z.literal(3.5),
    z.literal(4),
    z.literal(4.5),
    z.literal(5),
  ]),
  comment: z.string(),
  visited_at: z
    .string()
    .refine((date) => dayjs(date).isValid())
    .refine(
      (date) => dayjs(date).isBefore(dayjs()),
      "Data da visita precisa estar no passado"
    ),
});

interface Props {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
}

export const ReviewDialog: FC<Props> = ({ isOpen, onIsOpenChange }) => {
  const [step, setStep] = useState(1);

  const queryClient = useQueryClient();

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      restaurant: null,
      rating: 0,
      comment: "",
      visited_at: dayjs().format("YYYY-MM-DD"),
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      setStep(1);
    }
  }, [isOpen, reset]);

  const { mutate: postReview, isPending: postReviewIsPending } = usePostReview({
    onSuccess: () => {
      toast.success("Critica criada com sucesso!");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.QUERIES.GET_REVIEWS],
      });
      onIsOpenChange(false);
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar a critica!");
    },
  });

  const restaurant = watch("restaurant");

  const onSubmit = (review: z.infer<typeof schema>) => {
    postReview({
      data: {
        review: {
          rating: review.rating,
          comment: review.comment,
          visited_at: dayjs(review.visited_at).toISOString(),
          restaurant_id: review.restaurant!.id,
        },
      },
    });
  };

  const renderErrors = () => {
    if (!Object.keys(errors).length) return null;

    return (
      <div className="flex flex-col">
        {Object.entries(errors).map(([key, value]) => (
          <p key={key} className="text-sm text-red-500">
            {value.message}
          </p>
        ))}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AlertDialogContent className="h-[200px] max-w-2xl w-full">
            <AlertDialogClose />
            <AlertDialogHeader>
              <AlertDialogTitle>Nova Crítica</AlertDialogTitle>
              <AlertDialogDescription>
                Selecione um restaurante
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex items-center justify-center h-full">
              <Controller
                name="restaurant"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RestaurantCombobox
                    selected={value}
                    onChange={(r) => {
                      onChange(r);
                      setStep(2);
                    }}
                  />
                )}
              />
            </div>
          </AlertDialogContent>
        );
      case 2:
        return (
          <AlertDialogContent className="max-w-3xl w-full">
            <AlertDialogClose />
            <AlertDialogHeader>
              <AlertDialogTitle>Nova Crítica</AlertDialogTitle>
              <AlertDialogDescription className="text-muted">
                Escreva sua crítica
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center p-4 gap-4">
              <div className="flex flex-col w-full gap-3">
                <div className="flex items-center gap-2">
                  <div>
                    <div className="bg-zinc-200 rounded-full p-5">
                      <StoreIcon className="size-10" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {restaurant?.name && (
                      <h2 className="font-title font-bold text-2xl">
                        {restaurant.name}
                      </h2>
                    )}
                    {restaurant?.description && (
                      <span className="text-sm text-muted">
                        {restaurant.description}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    control={control}
                    name="rating"
                    render={({ field: { onChange, value } }) => (
                      <Rating
                        id="review-rating"
                        rating={value}
                        onChange={onChange}
                      />
                    )}
                  />

                  <Input
                    type="date"
                    className="w-40"
                    error={errors.visited_at?.message}
                    {...register("visited_at")}
                  />
                </div>
                <Textarea className="w-full h-80" {...register("comment")} />

                {renderErrors()}
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button
                  variant="outlined"
                  className="w-full"
                  size="sm"
                  disabled={postReviewIsPending}
                >
                  Cancelar
                </Button>
              </AlertDialogCancel>

              <Button
                onClick={() => handleSubmit(onSubmit)()}
                className="w-full"
                size="sm"
                disabled={postReviewIsPending}
              >
                Salvar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        );
      default:
        return null;
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onIsOpenChange}>
      {renderStep()}
    </AlertDialog>
  );
};
