import { create } from 'zustand';

const useAsteroidStore = create((set) => ({
    type: 'C',
    speed: '',
    distance: '',
    size: '',
    damage: '',
    launched: false,

    setType: (type) => set({ type }),
    setSpeed: (speed) => set({ speed }),
    setDistance: (distance) => set({ distance }),
    setSize: (size) => set({ size }),
    setDamage: (damage) => set({ damage }),
    setLaunched: (launched) => set({ launched }),

    runSimulation: () =>
        set((state) => {
            const typeMultiplier = state.type === 'A' ? 1.2 : state.type === 'B' ? 1.5 : 1;
            const damage =
                ((Number(state.speed) || 0) * (Number(state.size) || 0)) /
                ((Number(state.distance) || 1)) *
                typeMultiplier;
            return { damage };
        }),
}));

export default useAsteroidStore;
