import { create } from 'zustand';

// Define the shape of our College object
export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
  totalFees: string;
  avgPackage: string;
  imageUrl: string;
  accreditation?: string;
}

interface CompareStore {
  selectedColleges: College[];
  toggleCollege: (college: College) => void;
  clearComparisons: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
  selectedColleges: [],
  
  toggleCollege: (college) => set((state) => {
    // Check if college is already in the list
    const exists = state.selectedColleges.find((c) => c.id === college.id);
    
    if (exists) {
      // If it exists, remove it (toggle off)
      return { selectedColleges: state.selectedColleges.filter((c) => c.id !== college.id) };
    }
    
    // Limit comparison to 3 colleges max
    if (state.selectedColleges.length >= 3) {
      alert("You can only compare up to 3 colleges at a time.");
      return state;
    }
    
    // Add the new college
    return { selectedColleges: [...state.selectedColleges, college] };
  }),

  clearComparisons: () => set({ selectedColleges: [] }),
}));