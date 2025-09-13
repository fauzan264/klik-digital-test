import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUseAuthStoreState {
  username: string;
}

interface IUseAuthStore extends IUseAuthStoreState {
  setAuth: ({ username }: IUseAuthStoreState) => void;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>()(
  persist(
    (set) => ({
      username: "",
      setAuth: ({ username }: { username: string }) => {
        set({ username });
      },
      logout: () => {
        set({ username: "" });
        localStorage.removeItem("auth");
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({ username: state.username }),
    }
  )
);

export default useAuthStore;
