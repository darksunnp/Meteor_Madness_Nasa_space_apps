import React, { useState } from "react";
import CanvasPlaceholder from "~/components/CanvasPlaceholder";
import DamageDisplay from "~/components/DamageDisplay";
import Sidebar from "~/components/Sidebar";
import { defaultAsteroid, fetchAsteroids, fetchAsteroidDetails } from "~/data/asteroidData";

export default function Home() {
	const [asteroidData, setAsteroidData] = useState(defaultAsteroid);
	const [asteroids, setAsteroids] = useState<any[]>([]);
	const [selectedId, setSelectedId] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// Example: fetch asteroids for today
	async function loadAsteroids() {
		setLoading(true);
		setError("");
		const today = new Date().toISOString().slice(0, 10);
		const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
		try {
			const data = await fetchAsteroids(today, tomorrow);
			// NeoWs returns an object with dates as keys
			const all = Object.values(data.near_earth_objects).flat();
			setAsteroids(all);
		} catch (e: any) {
			setError(e.message);
		}
		setLoading(false);
	}

	async function handleSelect(id: string) {
		setSelectedId(id);
		setLoading(true);
		setError("");
		try {
			const details = await fetchAsteroidDetails(id);
			setAsteroidData({
				type: details.nature || "Unknown",
				speed: details.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || 0,
				distance: details.close_approach_data?.[0]?.miss_distance?.kilometers || 0,
				size: details.estimated_diameter?.meters?.estimated_diameter_max || 0,
				...details,
			});
		} catch (e: any) {
			setError(e.message);
		}
		setLoading(false);
	}

	React.useEffect(() => {
		loadAsteroids();
	}, []);

	return (
		<div className="flex h-screen gap-4 p-4">
			<div className="w-1/4">
				<Sidebar asteroidData={asteroidData} setAsteroidData={setAsteroidData} />
				<div className="mt-4">
					<button onClick={loadAsteroids} disabled={loading} className="mb-2">Reload Asteroids</button>
					{loading && <div>Loading...</div>}
					{error && <div style={{color:'red'}}>{error}</div>}
					<ul style={{maxHeight:200,overflow:'auto'}}>
						{asteroids.map((ast: any) => (
							<li key={ast.id}>
								<button onClick={() => handleSelect(ast.id)} style={{fontWeight: ast.id===selectedId?'bold':'normal'}}>
									{ast.name} (id: {ast.id})
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="w-1/2">
				<CanvasPlaceholder />
			</div>
			<div className="w-1/4">
				<DamageDisplay asteroidData={asteroidData} />
				{selectedId && (
					<div className="mt-4">
						<h3>Selected Asteroid Details</h3>
						<pre style={{maxHeight:200,overflow:'auto'}}>{JSON.stringify(asteroidData, null, 2)}</pre>
					</div>
				)}
			</div>
		</div>
	);
}
