import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { MdReplay } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Scoreboard from "./Scoreboard";
import Backdrop from "./Backdrop";
function Result(props) {
	const navigate = useNavigate();
	const [summary, setSumarry] = useState();
	const [disableInput, setDisableInput] = useState();
	const goodPoints = JSON.parse(sessionStorage.getItem("score"))["goodPoints"];
	const badPoints = JSON.parse(sessionStorage.getItem("score"))["badPoints"];
	const resultPoints = goodPoints - badPoints;

	useEffect(() => {
		Axios.get(`http://localhost:3000/question/${props.count}`).then((response) => {
			setSumarry(response.data);
			console.log(response.data);
		});
	}, []);

	const [openScoreboard, setOpenScoreboard] = useState();
	const tryAgain = () => {
		window.location.href = "/quiz";
	};
	return (
		<div className="result-wrapper">
			<div className="result">
				<div className="result-details">
					<h4 className="your-score">
						Your score: {resultPoints === 1 ? resultPoints + " " + "point" : resultPoints + " " + "points"}{" "}
					</h4>
					<div className="result-actions">
						<div className="result-actions-btns">
							<AiOutlineHome className="result-actions-btn" onClick={() => navigate("/")} />
							<h3 className="result-actions-text">Home</h3>
						</div>
						<div className="result-actions-btns">
							<MdReplay className="result-actions-btn" onClick={() => tryAgain()} />
							<h3 className="result-actions-text">Try again</h3>
						</div>
						<div className="result-actions-btns" onClick={() => setOpenScoreboard(true)}>
							<GiTrophyCup className="result-actions-btn-cup" />
							<h3 className="result-actions-text">Scoreboard</h3>
						</div>
					</div>

					<label style={{ marginTop: "10px" }}>
						Summary (you answered{" "}
						{goodPoints + badPoints == 1
							? goodPoints + badPoints + " " + "question"
							: goodPoints + badPoints + " " + "questions"}
						)
					</label>
					<div className="summary">
						{summary &&
							summary.map((value, index) => (
								<div className="summary-answer" key={index}>
									{value}
								</div>
							))}
					</div>
				</div>
				{openScoreboard && (
					<Scoreboard
						resultPoints={resultPoints}
						callback={(state) => setOpenScoreboard(state)}
						disableInput={(state) => setDisableInput(state)}
						disableAdd={disableInput}
					/>
				)}
				{openScoreboard && <Backdrop />}
			</div>
		</div>
	);
}

export default Result;
