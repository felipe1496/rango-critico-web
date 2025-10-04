import type { GoogleLoginResponse } from "../hooks/mutations/useGoogleLogin";
import { createStore } from "../utils/functions";

interface State {
  sessionUser: GoogleLoginResponse["data"]["user"] | null;
  shouldRenderApp: boolean;
}

interface Action {
  setSessionUser: (user: State["sessionUser"]) => void;
  setShouldRenderApp: (value: boolean) => void;
}

export const useAppStore = createStore<State & Action>()((set) => ({
  sessionUser: null,
  setSessionUser: (user) => set({ sessionUser: user }),
  shouldRenderApp: false,
  setShouldRenderApp: (value) => set({ shouldRenderApp: value }),
}));
