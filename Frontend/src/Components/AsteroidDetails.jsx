import useAsteroidStore from '../other/useAsteroidStore';

function AsteroidDetails() {
    const {
        type, speed, distance, size,
        setType, setSpeed, setDistance, setSize,
        runSimulation
    } = useAsteroidStore();

    const handleNumberInput = (setter) => (e) => {
        const value = e.target.value;
        if (value === '' || Number(value) >= 0) {
            setter(value);
        }
    };

    return (
        <div className="flex-1 p-8">
            <div className="max-w-md mx-auto bg-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold border-b border-neutral-700 pb-2">Asteroid Details</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        >
                            <option value="A">A-type</option>
                            <option value="B">B-type</option>
                            <option value="C">C-type</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Speed (km/s)</label>
                        <input
                            type="number"
                            min="0"
                            value={speed}
                            onChange={handleNumberInput(setSpeed)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                    </div>
                    <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Distance (million km)</label>
                        <input
                            type="number"
                            min="0"
                            value={distance}
                            onChange={handleNumberInput(setDistance)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                    </div>
                    <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Size (m)</label>
                        <input
                            type="number"
                            min="0"
                            value={size}
                            onChange={handleNumberInput(setSize)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                    </div>
                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={runSimulation}
                            className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
                        >
                            Run Simulation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AsteroidDetails;
