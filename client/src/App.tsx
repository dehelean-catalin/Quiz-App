import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { QuizDashboard } from "./features/quiz-dashboard/QuizDashboard/QuizDashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<QuizDashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
