var api = require("./src/api.js").app;
const fs = require("fs");
const questionPath = "./src/question.json";
const usersPath = "./src/users.json";

api.get("/", function (request, response) {
	response.json("NodeJS REST API");
});

api.get("/question", function (request, response) {
	response.json(getQuestion());
});

api.get("/question/:id", function (request, response) {
	response.json(getNumberOfQuestion(request.params.id));
});

api.put("/users", function (request, response) {
	let usersarray = getUsers();
	usersarray.push(request.body);

	try {
		fs.writeFileSync(usersPath, JSON.stringify(usersarray));
	} catch (err) {
		console.error(err);
	}

	response.json(usersarray);
});

api.get("/users", function (request, response) {
	response.json(getUsers());
});

api.post("/question", function (request, response) {
	try {
		fs.writeFileSync(questionPath, JSON.stringify(request.body));
	} catch (err) {
		console.error(err);
	}

	response.json(request.body);
});

api.listen(3000, function () {
	console.log("Server running @ localhost:3000");
});

function getQuestion() {
	let question = [];
	try {
		question = JSON.parse(fs.readFileSync(questionPath, "utf8"));
	} catch (err) {
		console.error(err);
		return false;
	}
	return question;
}
function getUsers() {
	let users = [];
	try {
		users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
	} catch (err) {
		console.error(err);
		return false;
	}
	users.sort((a, b) => b.points - a.points);

	return users;
}

function getNumberOfQuestion(id) {
	let question = getQuestion();
	let arrayOfQuestions = [];
	for (var i = 0; i <= id; i++) {
		arrayOfQuestions.push(question[i].question);
	}
	return arrayOfQuestions;
}
