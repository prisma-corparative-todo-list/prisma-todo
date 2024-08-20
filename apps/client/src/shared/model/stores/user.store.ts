import { User } from "prisma/prisma-client"
import { create } from "zustand"

interface IStore {
    // LEGACY
    user: User
    setUser: (payload: User) => void,
    // LEGACY
    userId: string
    setUserId: (userId: string) => void 
}

export const useUserStore = create<IStore>((set) => ({
    // LEGACY
    userId: '',
    setUserId: (userId) => set({ userId }),
    // LEGACY
    user: {} as User,
    setUser: (user) => set({ user }),
}))