import React, { useState } from "react";
import CanvasPlaceholder from "~/components/CanvasPlaceholder";
import DamageDisplay from "~/components/DamageDisplay";
import Sidebar from "~/components/Sidebar";
import { defaultAsteroid } from "~/data/asteroidData";

export default function Home() {
	const [asteroidData, setAsteroidData] = useState(defaultAsteroid);

	return (
		<div className="flex h-screen gap-4 p-4">
			
			<div className="w-1/4">
				<Sidebar asteroidData={asteroidData} setAsteroidData={setAsteroidData} />
			</div>

			
			<div className="w-1/2">
				<CanvasPlaceholder />
			</div>

			
			<div className="w-1/4">
				<DamageDisplay asteroidData={asteroidData} />
			</div>
		</div>
	);
}
