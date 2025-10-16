import type { FC } from "react";
import { Input } from "../../../components/commons/Input";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/commons/Button";
import { usePatchUser } from "../../../hooks/mutations/usePatchUser";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSession } from "../../../hooks/useSession";
import { LoaderCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(3).max(200),
  username: z.string().min(1).max(200),
  email: z.email(),
});

export const ProfileForm: FC = () => {
  const { sessionUser } = useSession();

  const { logout } = useSession();

  const { mutate, isPending } = usePatchUser({
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      toast.info("Faça login novamente para atualizar seus dados");
      logout();
    },
    onError: (err) => {
      if (err.status === 409) {
        toast.error("Usuário já existente");
      }
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: sessionUser?.name ?? "",
      email: sessionUser?.email ?? "",
      username: sessionUser?.username ?? "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate({
      data: {
        user: {
          name: data.name,
          username: data.username,
        },
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-12 flex flex-col gap-2 max-w-96 w-full"
    >
      <h1 className="font-title font-bold text-2xl">Perfil</h1>

      <Input label="Nome" {...register("name")} />

      <Input label="Usuário" {...register("username")} />

      <Input label="Email" disabled {...register("email")} />

      <div className="w-full flex items-center justify-end mt-4">
        <Button type="submit" size="sm" className="w-full" disabled={isPending}>
          {isPending ? <LoaderCircle className="animate-spin" /> : "Salvar"}
        </Button>
      </div>
    </form>
  );
};
