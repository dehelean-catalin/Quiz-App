import React, { useState } from "react";

function Options(props) {
	const initialValues = {
		amount: 10,
		category: "any",
		difficulty: "any",
		type: "any",
	};
	const [formValues, setFormValues] = useState(initialValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		props.callback({ ...formValues, [name]: value });
		setFormValues({ ...formValues, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		props.saveBtn(false);
		sessionStorage.setItem("options", JSON.stringify(formValues));
	};

	return (
		<form className="options-form" onSubmit={handleSubmit}>
			<button className="close-options" onClick={() => props.saveBtn(true)}>
				X
			</button>
			<label className="form-label" htmlFor="amount">
				Number of questions
			</label>
			<input
				type="number"
				name="amount"
				className="form-action"
				min="1"
				max="50"
				value={formValues.amount}
				onChange={handleChange}
			/>

			<label className="form-label" htmlFor="amount">
				Select your category
			</label>
			<select name="category" value={formValues.category} onChange={handleChange}>
				<option value="any">Any Category</option>
				<option value="9">General Knowledge</option>
				<option value="10">Entertainment: Books</option>
				<option value="11">Entertainment: Film</option>
				<option value="12">Entertainment: Music</option>
				<option value="13">Entertainment: Musicals and Theatres</option>
				<option value="14">Entertainment: Television</option>
				<option value="15">Entertainment: Video Games</option>
				<option value="16">Entertainment: Board Games</option>
				<option value="17">Science and Nature</option>
				<option value="18">Science: Computers</option>
				<option value="19">Science: Mathematics</option>
				<option value="20">Mythology</option>
				<option value="21">Sports</option>
				<option value="22">Geography</option>
				<option value="23">History</option>
				<option value="24">Politics</option>
				<option value="25">Art</option>
				<option value="26">Celebrities</option>
				<option value="27">Animals</option>
				<option value="28">Vehicles</option>
				<option value="29">Entertainment: Comics</option>
				<option value="30">Science: Gadgets</option>
				<option value="31">Entertainment: Japanese Anime and Manga</option>
				<option value="32">Entertainment: Cartoon and Animations</option>
			</select>

			<label className="form-label" htmlFor="amount">
				Chose the difficulty
			</label>
			<select name="difficulty" value={formValues.difficulty} onChange={handleChange}>
				<option value="any">Any Difficulty</option>
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
			</select>

			<label className="form-label">Chose the type</label>
			<select name="type" value={formValues.type} onChange={handleChange}>
				<option value="any">Any Type</option>
				<option value="multiple">Multiple Choice</option>
				<option value="boolean">True / False</option>
			</select>
			<button className="form-options-btn" type="submit">
				Save
			</button>
		</form>
	);
}

export default Options;
