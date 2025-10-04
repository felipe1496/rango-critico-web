import type { FC } from "react";
import { Outlet } from "react-router";
import { TopBar } from "./TopBar";

export const Layout: FC = () => {
  return (
    <>
      <TopBar />
      <div className="mt-16">
        <Outlet />
      </div>
    </>
  );
};
