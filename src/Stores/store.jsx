import { create } from 'zustand';

export const useStore = create((set) => ({
  threadData: {},  
  setThreadData: (threadData) => set({ threadData }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));