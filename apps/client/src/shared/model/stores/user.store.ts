import { create } from "zustand"

interface IStore {
    userId: string
    setUserId: (userId: string) => void 
}

export const useUserStore = create<IStore>((set) => ({
    userId: '',
    setUserId: (userId) => set({ userId })
}))