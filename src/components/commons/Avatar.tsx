import { useState, type FC, type ReactNode } from "react";

interface Props {
  src?: string | null;
  alt?: string | null;
  fallback?: ReactNode;
}

export const Avatar: FC<Props> = ({ src, alt, fallback }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src || error || loading) {
    return fallback || "?";
  }

  return (
    <img
      src={src}
      alt={alt ?? "image"}
      className="w-10 h-10 rounded-full object-cover"
      onError={() => setError(true)}
      onLoad={() => setLoading(false)}
    />
  );
};
