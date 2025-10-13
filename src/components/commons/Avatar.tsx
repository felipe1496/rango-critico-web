import * as PrimitiveAvatar from "@radix-ui/react-avatar";
import type { ComponentProps, FC } from "react";

export const Avatar = PrimitiveAvatar.Root;
export const AvatarImage: FC<
  Omit<ComponentProps<typeof PrimitiveAvatar.Image>, "src"> & {
    src?: string | null;
  }
> = ({ src, ...props }) => (
  <PrimitiveAvatar.Image src={src ?? undefined} {...props} />
);
export const AvatarFallback = PrimitiveAvatar.Fallback;
