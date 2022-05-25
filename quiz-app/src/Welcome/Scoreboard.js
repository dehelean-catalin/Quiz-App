import React, { useState, useEffect } from "react";
import Axios from "axios";
function scoreboard(props) {
	const [username, setUsername] = useState();
	const [formValues, setFormValues] = useState("");
	const [disableBtn, setDisableBtn] = useState(props.disableAdd);

	const handleChange = (e) => {
		setFormValues(e.target.value);
	};
	console.log(username);
	useEffect(() => {
		Axios.get(`http://localhost:3000/users`).then((response) => {
			setUsername(response.data);
			console.log(response.data);
		});
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		setDisableBtn(true);
		props.disableInput(true);

		const users = {
			name: formValues,
			points: props.resultPoints,
		};
		Axios.put("http://localhost:3000/users", users)
			.then((response) => {
				Axios.get(`http://localhost:3000/users`).then((response) => {
					setUsername(response.data);
					console.log(response.data);
				});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};
	return (
		<div className="scoreboard">
			<button className="close-scoreboard" onClick={() => props.callback(false)}>
				X
			</button>
			<h4 className="your-score">Scoreboard</h4>

			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Points</th>
					</tr>

					{username &&
						username.map((value, index) => (
							<tr key={index}>
								<td>
									{index + 1}. {value.name}
								</td>
								<td>{value.points}</td>
							</tr>
						))}
				</tbody>
			</table>
			<form className="scoreboard-form" onSubmit={handleSubmit}>
				<input
					type="text"
					className="scoreboard-user"
					placeholder="Add your name"
					value={formValues}
					onChange={handleChange}
					required
					disabled={disableBtn}
				/>
				<button type="submit" disabled={disableBtn}>
					confirm
				</button>
			</form>
		</div>
	);
}

export default scoreboard;
