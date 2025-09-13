import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { create } from "zustand";

export interface IMenu {
  id: string;
  title: string;
  href?: string | null;
  parentId?: string | null;
}

interface IUseMenuStore {
  menus: IMenu[];
  addMenu: (menu: Omit<IMenu, "id">) => void;
  updateMenu: (id: string, updated: Partial<IMenu>) => void;
  deleteMenu: (id: string) => void;
  getMenuById: (id: string) => IMenu | undefined;
}

const useMenuStore = create<IUseMenuStore>()(
  persist(
    (set, get) => ({
      menus: [],
      addMenu: (menu) => {
        set((state) => ({
          menus: [...state.menus, { id: nanoid(), ...menu }],
        }));
      },
      updateMenu: (id, updated) =>
        set((state) => ({
          menus: state.menus.map((m) =>
            m.id === id ? { ...m, ...updated } : m
          ),
        })),
      deleteMenu: (id) => {
        set((state) => ({
          menus: state.menus.filter((m) => {
            m.id !== id;
          }),
        }));
      },
      getMenuById: (id) => {
        return get().menus.find((m) => m.id == id);
      },
    }),
    {
      name: "menus",
    }
  )
);

export default useMenuStore;
