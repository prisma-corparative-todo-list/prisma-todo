

import { create } from "zustand"

interface IStore {
    isAuth: boolean;
    setAuth:(status: boolean) => void
}

export const useAuthStore = create<IStore>((set) => ({
    isAuth: false,
    setAuth: (isAuth) => set({ isAuth })
}))

