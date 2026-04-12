import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSoundStore = create(
  persist(
    (set) => ({
      isMuted: false,
      isInitialized: false,
      volume: 0.15,
      setMuted: (muted) => set({ isMuted: muted }),
      toggleMuted: () => set((state) => ({ isMuted: !state.isMuted })),
      initialize: () => set({ isInitialized: true }),
      setVolume: (v) => set({ volume: v }),
    }),
    {
      name: '1666-sound-storage',
    }
  )
);
