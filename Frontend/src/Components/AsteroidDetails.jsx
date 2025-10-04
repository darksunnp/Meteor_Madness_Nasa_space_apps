import useAsteroidStore from '../other/useAsteroidStore';
import OrbitSimulation from './orbit';


function AsteroidDetails() {
    const {
        type, speed, xdistance,ydistance,zdistance, size,
        setType, setSpeed, setX,setY,setZ, setSize, setLaunched2,launched2,
    } = useAsteroidStore();

    const handleNumberInput = (setter) => (e) => {
        const value = e.target.value;
        
        if (value === '' || Number(value) >= 0) {
            setter(Number(value));
        }
    };
    let onOrbit = false;
    function trackpage(){
        onOrbit=!onOrbit
        if (onOrbit){
            document.getElementById("toorbit").classList.remove("hidden");
            document.getElementById("toglobe").classList.add("hidden");
        } else {
            document.getElementById("toorbit").classList.add("hidden");
            document.getElementById("toglobe").classList.remove("hidden");
        }
    }

     // const [orbitKey, setOrbitKey] = useState(0);

  const handleRunSimulation = () => {
    // setOrbitKey(prev => prev + 1); // remount OrbitSimulation
    setLaunched2(!launched2)
    console.log(launched2);

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
                        <label className="block text-neutral-300 font-semibold mb-1">Position (x,y,z)</label>

                        <div className='grid grid-cols-3 gap-2'>
                        <input
                            type="number"
                            min="0"
                            value={xdistance}
                            onChange={handleNumberInput(setX)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                        <input
                            type="number"
                            min="0"
                            value={ydistance}
                            onChange={handleNumberInput(setY)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                        <input
                            type="number"
                            min="0"
                            value={zdistance}
                            onChange={handleNumberInput(setZ)}
                            className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                        />
                        </div>
                       
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
                             onClick={handleRunSimulation} 
                            className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
                        >
                            Run Simulation
                        </button>
                       
                    </div>
                     <div className="pt-4" id="toglobe">
                        <a href='#globe'>
                        <button
                            type="button"
                            onClick={trackpage}
                            className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
                        >
                            To asteroid launcher
                        </button>
                        
                        </a>
                    </div>
                    <div className="pt-4 hidden" id="toorbit">
                        <a href='#orbit'>
                        <button
                            type="button"
                            onClick={trackpage}
                            className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
                        >
                            To Orbit
                        </button>
                        
                        </a>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default AsteroidDetails;