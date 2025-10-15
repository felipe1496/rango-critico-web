import type { FC } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/commons/Tabs";
import { ProfileForm } from "./components/ProfileForm";

export const SettingsPage: FC = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <main className="w-full max-w-5xl mt-8 flex flex-col gap-4">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
