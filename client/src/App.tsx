import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { ROUTES } from "./config/routes";
import { AttemptForm } from "./features/attemps/AttemptForm/AttemptForm";
import { AttemptResult } from "./features/attemps/AttemptResult/AttemptResult";
import { LoginPage } from "./features/auth/LoginPage";
import { SignUpPage } from "./features/auth/SignUpPage";
import { CreateQuiz } from "./features/create-quiz/CreateQuiz";
import LandingPage from "./features/landing/LandingPage";
import QuizOverview from "./features/quiz-overview/QuizOverview/QuizOverview";
import { Quizzes } from "./features/quizzes/Quizzes/Quizzes";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { QuizLayout } from "./pages/QuizLayout/QuizLayout";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path={ROUTES.LANDING} element={<LandingPage />} />
				<Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
				<Route path={ROUTES.LOGIN} element={<LoginPage />} />
				<Route path={ROUTES.QUIZ} element={<QuizLayout />}>
					<Route index element={<Quizzes />} />
					<Route path="create" element={<CreateQuiz />} />
					<Route path=":id" element={<QuizOverview />} />
					<Route
						path={`:id/${ROUTES.QUESTIONS}/:attemptId`}
						element={<AttemptForm />}
					/>
					<Route path={`:attemptId/results`} element={<AttemptResult />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
