import React from "react";
import { Link, Outlet } from "react-router";

const App: React.FC = () => {
	return (
		<div className="h-screen flex flex-col bg-gray-100">
			<header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
				<h1 className="text-xl font-bold">🌍 Asteroid Impact Simulator</h1>
				<nav className="space-x-4">
					<Link to="/" className="hover:underline">
						Simulator
					</Link>
					<Link to="/about" className="hover:underline">
						About
					</Link>
				</nav>
			</header>
			<main className="flex flex-1 overflow-hidden">
				<Outlet />
			</main>
		</div>
	);
};

export default App;
