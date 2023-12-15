import React, { useEffect, useState } from "react";

import QuizAnswer from "./QuizAnswer";
function QuizArray(props) {
	const [count, setCount] = useState(0);
	const [item, setItem] = useState(props.arrayList[count]);
	const [disableInput, setDisableInput] = useState(false);
	const [answers, setAnswers] = useState();

	const [nextAnswer, setNextAnswer] = useState(true);
	const endOfQuiz = JSON.parse(sessionStorage.getItem("options"))["amount"];

	useEffect(() => {
		const answersArray = [...item.incorrect_answers];
		answersArray.push(item.correct_answer);
		// answersArray.sort((_, _) => 0.5 - Math.random());
		setAnswers(answersArray);
	}, [count]);

	const increment = () => {
		if (count + 1 >= endOfQuiz) {
			props.callback(true);
		} else {
			setDisableInput(false);
			setCount(count + 1);
			setItem(props.arrayList[count + 1]);
			setNextAnswer(!nextAnswer);
		}
		props.counter(count); //seteaza counterul pt a afisa intrebarile din result cand termini testul cu bine
	};
	// const handleSkip = () => {
	// 	setDisableInput(true);
	// 	setCount(count + 1);
	// 	setItem(props.arrayList[count + 1]);
	// 	setNextAnswer(nextAnswer);
	// 	props.counter(count);
	// };
	return (
		<div className="quiz-container">
			<div className="quiz-container-top">
				<div className="quiz-number">
					Question {count + 1}/{props.arrayList.length}
				</div>
				<div
					className="quiz-question"
					style={
						item.difficulty === "easy"
							? { backgroundColor: "#C1FFC1" }
							: item.difficulty === "medium"
							? { backgroundColor: "#FFD699" }
							: { backgroundColor: "#F46D75" }
					}
				>
					<div
						className="quiz-question-block"
						style={
							item.question.length > 70
								? { fontSize: "14px" }
								: item.question.length > 100
								? { fontSize: "12px" }
								: {}
						}
					>
						{item.question
							.replace(/&quot;/g, '"')
							.replace(/&#039;/g, "'")
							.replace(/&eacute;/g, "e")
							.replace(/&shy;/g, " ")
							.replace(/&pi;/g, "pi")}
					</div>
					<div
						className="quiz-difficulty"
						style={
							item.difficulty === "easy"
								? { color: "green" }
								: item.difficulty === "medium"
								? { color: "orange" }
								: { color: "red" }
						}
					>
						{item.difficulty}
					</div>
				</div>
			</div>
			<div className="quiz-answer">
				<QuizAnswer
					setDisableInput={setDisableInput}
					disableInput={disableInput}
					answers={answers}
					correct_answer={item.correct_answer}
					callback={(state) => setNextAnswer(state)}
					count={count}
					question={item.question}
					next={nextAnswer}
				/>
			</div>

			<div className="next-btn-wraper">
				<button
					className="next-btn"
					type="submit"
					onClick={() => {
						increment();
					}}
					disabled={nextAnswer}
				>
					Next
				</button>
				{/* <div
					className="skip-btn"
					onClick={() => {
						increment();
					}}
				>
					<BsFillSkipForwardFill />
				</div> */}
			</div>
		</div>
	);
}
export default QuizArray;
