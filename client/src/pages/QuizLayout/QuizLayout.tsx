import { Outlet } from "react-router";

export function QuizLayout() {
	return (
		<main className="container">
			<Outlet />
		</main>
	);
}
