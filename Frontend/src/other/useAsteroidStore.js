import { create } from 'zustand';

const useAsteroidStore = create((set) => ({
    type: 'C',
    speed: '',
    distance: '',
    size: '',
    damage: '',
    launched: false,
    xdistance: 100,
    ydistance: 50,
    zdistance: 0,

    setType: (type) => set({ type }),
    setSpeed: (speed) => set({ speed }),
    setDistance: (distance) => set({ distance }),
    setSize: (size) => set({ size }),
    setDamage: (damage) => set({ damage }),
    setLaunched: (launched) => set({ launched }),
    setX: (xdistance) => set({ xdistance }),
    setY: (ydistance) => set({ ydistance }),
    setZ: (zdistance) => set({ zdistance }),

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
