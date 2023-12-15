//Am schimbat handleClick, verifica cum merge skip si ce se intampla daca dai skip la ultima intrebare, seteaza ca atunci cand dai skip sa primesti
// - 0,5 puncte

import React, { useEffect, useState } from "react";
import Backdrop from "../components/Backdrop";
import Result from "./Result";
// import { BsCheckCircleFill } from "react-icons/bs";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { GiPauseButton } from "react-icons/gi";
// import { VscDebugStart } from "react-icons/vsc";
// import { AiFillThunderbolt } from "react-icons/ai";

// import useSound from "use-sound";
import Pause from "./Pause";

function QuizAnswer(props) {
	const [badPoints, setBadPoints] = useState(0);
	const [goodPoints, setGoodPoints] = useState(0);
	const [answerValue, setAnswerValue] = useState();
	const [disableConfirm, setDisableConfirm] = useState(true);
	// const volume = 0.25;
	// const [play] = useSound(sound, {
	// 	sprite: {
	// 		in: [6000, 1000],
	// 		out: [33000, 700],
	// 	},
	// 	volume,
	// });

	sessionStorage.setItem(
		"score",
		JSON.stringify({ goodPoints: goodPoints, badPoints: badPoints })
	);
	const [counter, setCounter] = useState(15);
	const [pause, setPause] = useState(true);

	useEffect(() => {
		counter >= 1 &&
			!props.disableInput &&
			props.next &&
			pause &&
			setTimeout(() => setCounter(counter - 1), 1000);
		if (counter === 0 && !props.disableInput) {
			setBadPoints(badPoints + 1);
			props.setDisableInput(true);
			setDisableConfirm(true);
		}
		badPoints > goodPoints && props.callback(true);
		counter === 0 && badPoints < goodPoints && props.callback(false);
	}, [counter]);

	useEffect(() => {
		if (pause && props.next) {
			setTimeout(() => setCounter(counter - 1), 500);
		}
	}, [pause]);

	useEffect(() => {
		setCounter(15);
		setAnswerValue("");
	}, [props.count]);

	// counter === 0 &&
	// 	props.disableInput &&
	// play({
	// 	id: answerValue ? "out" : "out",
	// });

	function handleClick(value) {
		setAnswerValue(value);
		setDisableConfirm(false);
	}

	const handleSubmit = () => {
		if (answerValue === undefined) {
			setDisableConfirm(true);
			props.setDisableInput(false);
		}
		if (answerValue === props.correct_answer && counter > 0) {
			setGoodPoints(goodPoints + 1);
		} else if (answerValue !== props.correct_answer && counter > 0) {
			setBadPoints(badPoints + 1);
		}
		setDisableConfirm(true);
		props.setDisableInput(true);
		props.callback(false);
	};
	useEffect(() => {
		if (badPoints > goodPoints) {
			props.callback(true);
		} else if (
			badPoints <= goodPoints &&
			props.disableInput &&
			disableConfirm
		) {
			props.callback(false);
		} else {
			props.callback(true);
		}
	}, [disableConfirm]);

	const handlePause = () => {
		setPause(!pause);
	};

	return (
		<div className="answer-container">
			<div className="timer"> Time left: {counter}</div>

			<div className="pause-btn" onClick={handlePause}>
				{/* {pause ? <GiPauseButton /> : <VscDebugStart />} */}
			</div>

			<div
				className="timer-animation"
				style={
					window.innerWidth > 400 && window.innerWidth < 700
						? { width: (window.innerWidth / 19) * `${counter}` }
						: window.innerWidth > 700 && window.innerWidth < 900
						? { width: (window.innerWidth / 22) * `${counter}` }
						: window.innerWidth > 900 && window.innerWidth < 1200
						? { width: (window.innerWidth / 25.5) * `${counter}` }
						: { width: (window.innerWidth / 44) * `${counter}` }
				}
			></div>
			<div className="anaswer-array">
				{props.answers &&
					props.answers.map((value, index) => (
						<button
							className="answer-btns"
							key={index}
							value={value}
							onClick={() => {
								handleClick(value);
							}}
							disabled={props.disableInput}
							// style={
							// 	props.disableInput &&
							// 	answerValue === value &&
							// 	answerValue === props.correct_answer
							// 		? { backgroundColor: "#D4EDDA" }
							// 		: props.disableInput &&
							// 		  answerValue !== value &&
							// 		  value === props.correct_answer
							// 		? { backgroundColor: "#D4EDDA" }
							// 		: props.disableInput &&
							// 		  answerValue === value &&
							// 		  answerValue !== props.correct_answer
							// 		? { backgroundColor: "#F8D7DA" }
							// 		: !props.disableInput && answerValue === value
							// 		? { outline: "1px solid black" }
							// 		: {}
							// }
						>
							<div
								className="answer-letter"
								// style={
								// 	!props.disableInput && answerValue === value
								// 		? { backgroundColor: "blue" }
								// 		: props.disableInput && answerValue === value
								// 		? { opacity: "0" }
								// 		: props.disableInput &&
								// 		  answerValue !== value &&
								// 		  value === props.correct_answer
								// 		? { opacity: "0" }
								// 		: { backgroundColor: "gray" }
								// }
							>
								{String.fromCharCode(index + 65)}
							</div>
							{value
								.replace(/&uuml;/g, "u")
								.replace(/&Uuml;/g, "U")
								.replace(/&amp;/g, " and ")
								.replace(/&#039;/g, "'")
								.replace(/&quot;/g, '"')
								.replace(/&ouml;/g, "o")
								.replace(/&ldquo;/g, '"')
								.replace(/&eacute;/g, "e")}
							{/* <BsCheckCircleFill
								className="check-animation"
								style={
									props.disableInput &&
									answerValue === value &&
									answerValue === props.correct_answer
										? { color: "green" }
										: props.disableInput &&
										  answerValue !== value &&
										  value === props.correct_answer
										? { color: "green" }
										: { opacity: "0" }
								}
							/>
							<AiFillCloseCircle
								className="check-animation"
								style={
									props.disableInput &&
									answerValue === value &&
									answerValue !== props.correct_answer
										? { color: "red", fontSize: "24px" }
										: { opacity: "0" }
								}
							/> */}
						</button>
					))}
			</div>
			<div className="confirm-btn-wrapper">
				<div className="score">
					Score:{" "}
					<span style={goodPoints - badPoints > 0 ? { color: "green" } : {}}>
						{goodPoints - badPoints}
					</span>
				</div>
				<button
					className="confirm-btn"
					onClick={() => {
						handleSubmit();
						// play({
						// 	id: answerValue === props.correct_answer ? "in" : "out",
						// });
					}}
					disabled={disableConfirm}
				>
					Confirm
				</button>
			</div>
			<div
				className={
					props.disableInput && answerValue === props.correct_answer
						? `brilliant-point`
						: `hiddend-brilliant-point`
				}
			>
				{" "}
				+1 Brilliant point
			</div>
			<div
				className={
					props.disableInput && answerValue !== props.correct_answer
						? `dummy-point`
						: `hiddend-brilliant-point`
				}
			>
				{" "}
				+1 dummy point
			</div>
			<div style={{ position: "absolute", color: "black" }}>
				lala {props.correct_answer}
			</div>
			{goodPoints < badPoints && <Backdrop />}
			{goodPoints < badPoints && <Result count={props.count} />}
			{!pause && <Pause pause={(state) => setPause(state)} />}
		</div>
	);
}
export default QuizAnswer;
