import React from "react";
import { asteroidTypes } from "../data/asteroidData";

interface DamageDisplayProps {
	asteroidData: { type: string; speed: number; distance: number; size: number };
}

const DamageDisplay: React.FC<DamageDisplayProps> = ({ asteroidData }) => {
	const typeMultiplier =
		asteroidTypes.find((t) => t.label === asteroidData.type)?.multiplier || 1;

	// Simple dummy formula factoring size
	const damagePercent = Math.min(
		100,
		Math.round(
			(asteroidData.speed * 2 + 100 / (asteroidData.distance / 10) + asteroidData.size / 10) * typeMultiplier
		)
	);

	return (
		<div className="flex flex-col bg-white p-6 shadow-lg rounded-lg w-full">
			<h2 className="text-2xl font-bold mb-4">Impact Analysis</h2>
			<p className="text-lg mb-2">
				🚀 Type: <strong>{asteroidData.type}</strong>
			</p>
			<p className="text-lg mb-2">
				💨 Speed: <strong>{asteroidData.speed} km/s</strong>
			</p>
			<p className="text-lg mb-2">
				📏 Distance: <strong>{asteroidData.distance} km</strong>
			</p>
			<p className="text-lg mb-4">
				🔹 Size: <strong>{asteroidData.size} m</strong>
			</p>
			<hr className="my-4" />
			<p className="text-3xl font-bold text-red-600">
				💥 Estimated Damage: {damagePercent}%
			</p>
		</div>
	);
};

export default DamageDisplay;
