import { create } from "zustand";

export const useStore = create((set) => ({
  threadData: { agreement: { forms: [] } },
  setThreadData: (threadData) => set({ threadData }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));
