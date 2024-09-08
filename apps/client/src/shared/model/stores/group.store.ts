import { Roles } from 'interfaces';
import { create } from 'zustand';

interface IStore {
  role: Roles;
  setRole: (role: Roles) => void;
}

export const useGroupStore = create<IStore>((set) => ({
  role: 'PARTICIPANT',
  setRole: (role) => set({ role }),
}));
