import type { FC } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/commons/Tabs";
import { ProfileForm } from "./components/ProfileForm";
import { Page } from "../../components/commons/Page";

export const SettingsPage: FC = () => {
  return (
    <Page title="Configurações">
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
    </Page>
  );
};
