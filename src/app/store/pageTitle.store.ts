import { create } from 'zustand';

interface PageTitleState {
  title: string;
  setTitle: (title: string) => void;
}

export const usePageTitleStore = create<PageTitleState>((set) => ({
  title: 'Dashboard',
  setTitle: (title) => set({ title }),
}));
