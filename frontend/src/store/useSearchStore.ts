import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Zustand v5 requires the curried form create<T>()() for correct TypeScript inference
export const useSearchStore = create<SearchStore>()((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));