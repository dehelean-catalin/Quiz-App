import { FormEvent, useState } from "react";
import { Question } from "../types/quizTestTypes";
import styles from "./QuestionCard.module.css";

type Props = { value: Question; onNext: () => void; count: string };

const INITIAL_STATE: string[] = [];

export function QuestionCard({ value, onNext, count }: Props) {
	const [selectedOptions, setSelectedOptions] =
		useState<string[]>(INITIAL_STATE);

	const nextBtnDisabled = !selectedOptions.length;

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

		if (nextBtnDisabled) return;

		setSelectedOptions(INITIAL_STATE);
		onNext();
	}

	return (
		<form className={`card m-auto ${styles.container}`} onSubmit={handleSubmit}>
			<header>
				<h1>{value.title}</h1>
			</header>
			<section>
				{value.options.map(({ option, id }) => (
					<label htmlFor={`option-${id}`} className="block tag">
						<input
							id={`option-${id}`}
							type="checkbox"
							key={id}
							onClick={() => handleClick(id)}
							checked={selectedOptions.includes(id)}
						/>
						{option}
					</label>
				))}
			</section>
			<footer>
				{count} questions
				<button type="submit" disabled={nextBtnDisabled}>
					Next
				</button>
			</footer>
		</form>
	);
}
