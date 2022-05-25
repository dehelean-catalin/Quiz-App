import React, { useEffect, useState } from "react";
import Axios from "axios";
import QuizArray from "./QuizArray";
import { useNavigate } from "react-router-dom";
import Result from "./Result";

function Quiz() {
	const [question, setQuestion] = useState();
	// const navigate = useNavigate();
	const amount = JSON.parse(sessionStorage.getItem("options"))["amount"];
	const category = JSON.parse(sessionStorage.getItem("options"))["category"];
	const difficulty = JSON.parse(sessionStorage.getItem("options"))["difficulty"];
	const type = JSON.parse(sessionStorage.getItem("options"))["type"];
	const [openResult, setOpenResult] = useState();
	const [counter, setCounter] = useState();
	var token, token1, token2;
	const initialValue = `&amount=${amount}`;

	category !== "any" ? (token = initialValue.concat("&category=", category)) : (token = initialValue);
	difficulty !== "any" ? (token1 = token.concat("&difficulty=", difficulty)) : (token1 = token);
	type !== "any" ? (token2 = token1.concat("&type=", type)) : (token2 = token1);
	// console.log(token2);

	useEffect(() => {
		Axios.get(`https://opentdb.com/api.php?${token2}`)
			.then((response) => {
				response.data.response_code === 0 ? setQuestion(response.data.results) : alert("to much");
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	question &&
		Axios.post("http://localhost:3000/question", question)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	// console.log(counter);
	return (
		<div className="quiz">
			{question && !openResult && (
				<QuizArray
					arrayList={question}
					callback={(state) => setOpenResult(state)}
					counter={(state) => setCounter(state)}
				/>
			)}
			{openResult && <Result count={counter} />}
		</div>
	);
}

export default Quiz;
