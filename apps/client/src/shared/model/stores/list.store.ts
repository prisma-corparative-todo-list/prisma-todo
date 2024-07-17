import { create } from 'zustand';

interface IListStore {
  deleteListIsSuccess: boolean;
  updateListIsSuccess: boolean;
  defineDeleteListIsSuccess: (status: boolean) => void;
  defineUpdateListIsSuccess: (status: boolean) => void;
  isListsVisible: boolean;
  hideLists: () => void;
}

export const useListStore = create<IListStore>((set) => ({
  deleteListIsSuccess: false,
  updateListIsSuccess: false,
  defineDeleteListIsSuccess: (status: boolean) => set({ deleteListIsSuccess: status }),
  defineUpdateListIsSuccess: (status: boolean) => set({ updateListIsSuccess: status }),
  isListsVisible: false,
  hideLists: () => set({isListsVisible: false}),
}));
