import { Outlet } from "react-router";

export function QuizLayout() {
	return (
		<main className="min-w-full">
			<Outlet />
		</main>
	);
}
