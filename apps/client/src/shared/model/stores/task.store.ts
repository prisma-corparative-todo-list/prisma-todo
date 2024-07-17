import { create } from "zustand"

interface IStore {

    isTaskInputVisible : boolean
    hideTaskInput: () => void
    showTaskInput: () => void
}

export const useTaskStore = create<IStore>((set) => ({
    isTaskInputVisible: false,
    hideTaskInput: () => set({ isTaskInputVisible: false }),
    showTaskInput() {
        set({ isTaskInputVisible: true })
    },
}))