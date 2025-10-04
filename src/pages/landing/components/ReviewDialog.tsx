import { useState } from "react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/commons/AlertDialog";
import type { FCC } from "../../../utils/types";
import { RestaurantCombobox } from "../../../components/RestaurantCombobox";
import type { GetRestaurantsResponse } from "../../../hooks/queries/useGetRestaurants";
import { Textarea } from "../../../components/commons/Textarea";
import { StoreIcon } from "lucide-react";

export const ReviewDialog: FCC = ({ children }) => {
  const [step, setStep] = useState(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState<
    GetRestaurantsResponse["data"]["restaurants"][number] | null
  >(null);

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
              <RestaurantCombobox
                selected={selectedRestaurant}
                onChange={(r) => {
                  setSelectedRestaurant(r);
                  setStep(2);
                }}
              />
            </div>
          </AlertDialogContent>
        );
      case 2:
        return (
          <AlertDialogContent className="max-w-4xl w-full">
            <AlertDialogClose />
            <AlertDialogHeader>
              <AlertDialogTitle>Nova Crítica</AlertDialogTitle>
              <AlertDialogDescription>
                Escreva sua crítica
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex justify-center p-4 gap-4">
              <div>
                <div className="bg-zinc-200 rounded-full p-8">
                  <StoreIcon className="size-10" />
                </div>
              </div>
              <Textarea className="w-full h-80" />
            </div>
          </AlertDialogContent>
        );
      default:
        return null;
    }
  };
  return (
    <AlertDialog onOpenChange={(open) => open && setStep(1)}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {renderStep()}
    </AlertDialog>
  );
};
