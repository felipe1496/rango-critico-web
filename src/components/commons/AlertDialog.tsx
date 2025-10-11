import type { ComponentProps, FC } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { XIcon } from "lucide-react";
import { cn } from "../../utils/functions";
import type { FCC } from "../../utils/types";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogClose: FC = () => {
  return (
    <AlertDialogCancel asChild>
      <button className="cursor-pointer absolute top-4 right-4">
        <XIcon />
      </button>
    </AlertDialogCancel>
  );
};
export const AlertDialogContent: FC<
  ComponentProps<typeof AlertDialogPrimitive.Content>
> = ({ className, ...props }) => {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <AlertDialogPrimitive.Content
        className={cn(
          "bg-white rounded-2xl fixed top-[50%] left-[50%] z-50 translate-x-[-50%] translate-y-[-50%] shadow-md flex flex-col",
          className
        )}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialogHeader: FC<ComponentProps<"header">> = ({
  ...props
}) => {
  return (
    <header
      className={cn("flex flex-col px-4 py-3 shadow-md", props.className)}
      {...props}
    />
  );
};

export const AlertDialogTitle: FC<
  ComponentProps<typeof AlertDialogPrimitive.Title>
> = ({ ...props }) => (
  <AlertDialogPrimitive.Title
    className={cn("font-bold text-2xl font-title", props.className)}
    {...props}
  />
);

export const AlertDialogDescription: FC<
  ComponentProps<typeof AlertDialogPrimitive.Description>
> = ({ ...props }) => (
  <AlertDialogPrimitive.Description
    className={cn("text-zinc-400", props.className)}
    {...props}
  />
);
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;

export const AlertDialogFooter: FCC<ComponentProps<"footer">> = ({
  children,
  className,
  ...props
}) => (
  <footer
    className={cn(
      "flex w-full justify-center gap-2 p-4 rounded-b-lg",
      className
    )}
    {...props}
  >
    {children}
  </footer>
);
