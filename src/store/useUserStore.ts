import { create } from 'zustand';
import type { User, TabType } from '../types';
import { mockUser } from '../utils/mock';

interface UserState {
  user: User;
  isLoggedIn: boolean;
  activeTab: TabType;
  login: () => void;
  logout: () => void;
  setActiveTab: (tab: TabType) => void;
  updateNickname: (nickname: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: mockUser,
  isLoggedIn: true,
  activeTab: 'published',

  login: () =>
    set({
      isLoggedIn: true,
      user: { ...mockUser, isLoggedIn: true },
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      user: { ...mockUser, isLoggedIn: false },
    }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  updateNickname: (nickname) =>
    set((state) => ({
      user: { ...state.user, nickname },
    })),
}));
