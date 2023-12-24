import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./config/axios.config";
import { CreateQuiz } from "./features/create-quiz/CreateQuiz";
import LandingPage from "./features/landing/LandingPage";
import { Questions } from "./features/questions/Questions";
import QuizOverview from "./features/quiz-overview/QuizOverview/QuizOverview";
import { Quizzes } from "./features/quizzes/Quizzes/Quizzes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { QuizLayout } from "./pages/QuizLayout/QuizLayout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.LANDING} element={<LandingPage />} />
				<Route path={ROUTES.QUIZ} element={<QuizLayout />}>
					<Route index element={<Quizzes />} />
					<Route path="create" element={<CreateQuiz />} />
					<Route path=":id" element={<QuizOverview />} />
					<Route path={`:id/${ROUTES.QUESTIONS}`} element={<Questions />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
