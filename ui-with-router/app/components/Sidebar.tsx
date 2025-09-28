import React from "react";
import InputField from "./InputField";
import { asteroidTypes } from "../data/asteroidData";

interface SidebarProps {
	asteroidData: {
		type: string;
		speed: number;
		distance: number;
		size: number;
	};
	setAsteroidData: React.Dispatch<
		React.SetStateAction<{ type: string; speed: number; distance: number; size: number }>
	>;
}

const Sidebar: React.FC<SidebarProps> = ({ asteroidData, setAsteroidData }) => {
	const handleChange = (field: string, value: string | number) => {
		setAsteroidData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="flex flex-col bg-white p-6 shadow-lg rounded-lg">
			<h2 className="text-2xl font-bold mb-6">Asteroid Details</h2>

			<div className="mb-4">
				<label className="block text-gray-700 font-semibold mb-1">Type</label>
				<select
					value={asteroidData.type}
					onChange={(e) => handleChange("type", e.target.value)}
					className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					{asteroidTypes.map((t) => (
						<option key={t.label} value={t.label}>
							{t.label}
						</option>
					))}
				</select>
			</div>

			<InputField
				label="Speed (km/s)"
				value={asteroidData.speed}
				onChange={(val) => handleChange("speed", val)}
			/>

			<InputField
				label="Distance (km)"
				value={asteroidData.distance}
				onChange={(val) => handleChange("distance", val)}
			/>

			<InputField
				label="Size (m)"
				value={asteroidData.size}
				onChange={(val) => handleChange("size", val)}
			/>
		</div>
	);
};

export default Sidebar;
