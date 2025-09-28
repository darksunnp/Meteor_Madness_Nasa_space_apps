import {
	Outlet,
	Links,
	Meta,
	ScrollRestoration,
	Scripts,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [];

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="bg-gray-100 text-gray-900">
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
