import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types";

interface StoreState {
  users: User[];
  favorites: string[];
  setUsers: (users: User[]) => void;
  addFavorite: (username: string) => void;
  removeFavorite: (username: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      users: [],
      favorites: [],
      setUsers: (users) => set({ users }),
      addFavorite: (username) =>
        set((state) => ({ favorites: [...state.favorites, username] })),
      removeFavorite: (username) =>
        set((state) => ({
          favorites: state.favorites.filter((user) => user !== username),
        })),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        users: state.users,
        favorites: state.favorites,
      }),
    }
  )
);
