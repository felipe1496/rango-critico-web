import { PlusIcon } from "lucide-react";
import { Button } from "../../components/commons/Button";
import { useState } from "react";
import { ReviewDialog } from "../../components/ReviewDialog";
import { ReviewsList } from "../../components/ReviewsList";
import { useStrictParams } from "../../hooks/useStrictParams";

export const ProfilePage = () => {
  const { username } = useStrictParams<{ username: string }>();

  const [createReviewDialogIsOpen, setCreateReviewDialogIsOpen] =
    useState(false);

  return (
    <div className="flex items-center justify-center w-full">
      <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
        <div className="w-full flex">
          <ReviewDialog
            isOpen={createReviewDialogIsOpen}
            onIsOpenChange={setCreateReviewDialogIsOpen}
          />
          <Button onClick={() => setCreateReviewDialogIsOpen(true)}>
            <PlusIcon className="size-5" />
            Crítica
          </Button>
        </div>

        <ReviewsList username={username} />
      </main>
    </div>
  );
};
