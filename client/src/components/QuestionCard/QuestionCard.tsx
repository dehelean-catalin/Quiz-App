import styles from "./QuestionCard.module.css";

function QuestionCard() {
	return <div>QuestionCard</div>;
}

type HeaderProps = {
	title: string;
	points: string;
	additionalInfo?: string;
};

export function QuestionHeader({ title, points, additionalInfo }: HeaderProps) {
	return (
		<header className={styles.header}>
			<h3>{title}</h3>
			<span>{additionalInfo}</span>
			<p>{points} points</p>
		</header>
	);
}

export default QuestionCard;
