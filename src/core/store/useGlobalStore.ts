import { create } from 'zustand';

interface GlobalState {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  userPreferences: {
    theme: 'light' | 'dark' | 'system';
    emailNotifications: boolean;
  };
  setPreferences: (prefs: Partial<GlobalState['userPreferences']>) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  bookmarks: [],
  addBookmark: (id) => set((state) => ({ bookmarks: [...state.bookmarks, id] })),
  removeBookmark: (id) => set((state) => ({ bookmarks: state.bookmarks.filter(b => b !== id) })),
  userPreferences: {
    theme: 'system',
    emailNotifications: true,
  },
  setPreferences: (prefs) => set((state) => ({ 
    userPreferences: { ...state.userPreferences, ...prefs } 
  }))
}));
