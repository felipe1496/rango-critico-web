import { PlusIcon } from "lucide-react";
import { Button } from "../../components/commons/Button";
import { ReviewDialog } from "./components/ReviewDialog";

export const HomePage = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <main className="w-full max-w-5xl mt-8">
        <ReviewDialog>
          <Button>
            <PlusIcon className="size-5" />
            Crítica
          </Button>
        </ReviewDialog>
      </main>
    </div>
  );
};
