import { FormEvent, useState } from "react";
import { Question } from "../types/quizTestTypes";
import styles from "./QuestionCard.module.css";

type Props = { value: Question; onNext: () => void };

export function QuestionCard({ value, onNext }: Props) {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	function handleClick(index: string) {
		if (selectedOptions.includes(index)) {
			const filteredOptions = selectedOptions.filter(
				(option) => option != index
			);
			setSelectedOptions(filteredOptions);
		} else {
			setSelectedOptions([...selectedOptions, index]);
		}
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onNext();
	}

	return (
		<form className="card" onSubmit={handleSubmit}>
			<header>
				<h1>{value.title}</h1>
			</header>
			<div className={styles.container}>
				{value.options.map(({ option, id }) => (
					<label htmlFor={`option-${id}`} className="block tag">
						<input
							id={`option-${id}`}
							type="checkbox"
							key={id}
							onClick={() => handleClick(id)}
						/>
						{option}
					</label>
				))}
			</div>
			<footer>
				<button type="submit">Next</button>
			</footer>
		</form>
	);
}
