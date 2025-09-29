export const asteroidTypes = [
	{ label: "Iron", multiplier: 1.5 },
	{ label: "Stony", multiplier: 1.2 },
	{ label: "Carbonaceous", multiplier: 1.0 },
];

export const defaultAsteroid = {
	type: "Iron",
	speed: 10,       // km/s
	distance: 100,   // km
	size: 100,       // meters
};

// NASA NeoWs API helpers
const API_KEY = "msAY493IhVmfHxJVHSQQDBjiqmM55NbOpsMe02gx"; // Replace with your own key for production
const BASE_URL = "https://api.nasa.gov/neo/rest/v1";

export async function fetchAsteroids(startDate: string, endDate: string) {
	const url = `${BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
	const response = await fetch(url);
	if (!response.ok) throw new Error("Failed to fetch asteroids");
	return response.json();
}

export async function fetchAsteroidDetails(asteroidId: string) {
	const url = `${BASE_URL}/neo/${asteroidId}?api_key=${API_KEY}`;
	const response = await fetch(url);
	if (!response.ok) throw new Error("Failed to fetch asteroid details");
	return response.json();
}
