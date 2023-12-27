import { NavLink } from "react-router-dom";
import QuizList from "../components/QuizList";
import styles from "./QuizDashboard.module.css";

export function Quizzes() {
	return (
		<div className={styles.container}>
			<header>
				<h1>Quizzes</h1>
				<NavLink to="create">Create</NavLink>
			</header>

			<QuizList />
		</div>
	);
}
