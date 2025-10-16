import type { FC } from "react";
import "./loader.css";
import { useEffect, useState } from "react";

interface Props {
  message?: string;
}

export const Loader: FC<Props> = ({ message }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 400);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="newtons-cradle">
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
        <div className="newtons-cradle__dot"></div>
      </div>
      <span className="flex -translate-y-4 text-sm">
        {message || "Carregando"}
        <div className="h-5 w-4">{dots}</div>
      </span>
    </div>
  );
};
