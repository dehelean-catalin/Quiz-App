import { GoClock, GoGoal } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { QuizSummary } from "../../types/quizType";
import styles from "./QuizCard.module.css";

type Prop = {
	value: QuizSummary;
};

export function QuizCard({ value }: Prop) {
	return (
		<NavLink to={value.id} className={`card ${styles.container}`}>
			<p className={styles.title}>{value.title}</p>

			<p className={styles.description}>{value.description}</p>
			<div>
				<span className={`${styles.difficulty} ${styles[value.difficulty]}`}>
					{value.difficulty}
				</span>
				<span className={styles.tag}>
					<GoGoal />
					{value.numberOfQuestions}
				</span>
				<span className={styles.tag}>
					<GoClock />
					{value.duration}min
				</span>
			</div>
		</NavLink>
	);
}
