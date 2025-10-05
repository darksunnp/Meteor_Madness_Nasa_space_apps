// src/Components/AsteroidDetails.jsx
import { useEffect, useState } from 'react';
import useAsteroidStore from '../other/useAsteroidStore';

function AsteroidDetails() {
  const {
    asteroids,
    loadingAsteroids,
    fetchAsteroids,
    fetchAsteroidDetails,
    selectedAsteroid,

    // fields bound to inputs
    speed, xdistance, ydistance, zdistance, size,
    setSpeed, setX, setY, setZ, setSize,

    // simulation
    runSimulation,
    launched2, setLaunched2
  } = useAsteroidStore();

  const [selectedName, setSelectedName] = useState(selectedAsteroid?.name || '');

  useEffect(() => {
    fetchAsteroids(); // load once on mount
  }, []);

  useEffect(() => {
    if (selectedAsteroid?.name) setSelectedName(selectedAsteroid.name);
  }, [selectedAsteroid]);

  const handleAsteroidSelect = (e) => {
    const name = e.target.value;
    setSelectedName(name);
    if (name) fetchAsteroidDetails(name);
  };

  const handleRunSimulation = () => {
    // runSimulation sets launched & toggles launched2 in the store
    runSimulation();
    // optional console debugging:
    console.log('Run pressed — store should now have launched=true');
  };

  const handleNumberInput = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || Number(value) >= 0) {
      setter(Number(value));
    }
  };

  // keep original page toggling logic (unchanged)
  let onOrbit = false;
  function trackpage() {
    onOrbit = !onOrbit;
    if (onOrbit) {
      document.getElementById("toorbit").classList.remove("hidden");
      document.getElementById("toglobe").classList.add("hidden");
      document.getElementById("position").style.display = "none";
      document.getElementById("run_button").innerHTML = "Confirm changes";
    } else {
      document.getElementById("toorbit").classList.add("hidden");
      document.getElementById("toglobe").classList.remove("hidden");
      document.getElementById("position").style.display = "block";
      document.getElementById("run_button").innerHTML = "Run simulation";
    }
  }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-md mx-auto bg-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold border-b border-neutral-700 pb-2">Asteroid Details</h2>

        <form className="space-y-4">
          {/* --- Dropdown: loading UX + cached list --- */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">Select Asteroid</label>
            <select
              value={selectedName}
              onChange={handleAsteroidSelect}
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              {loadingAsteroids ? (
                <option value="">Loading asteroids...</option>
              ) : (
                <>
                  <option value="">-- Choose an asteroid --</option>
                  {asteroids.map((ast) => (
                    <option key={ast.name} value={ast.name}>
                      {ast.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* --- Speed --- */}
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

          {/* --- Position --- */}
          <div id='position'>
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

          {/* --- Size --- */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">Size (Km)</label>
            <input
              type="number"
              min="0"
              value={size}
              onChange={handleNumberInput(setSize)}
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>

          {/* --- Run Simulation Button --- */}
          <div className="pt-4" >
            <button
              id='run_button'
              type="button"
              onClick={handleRunSimulation}
              className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
            >
              Run Simulation
            </button>
          </div>

          <div className="pt-4" id="toglobe" >
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