// The quiz's questions and answers, js.script

let questions = [
	{
		prompt: `Which are Javascript data types?`,
        choices: [
			"boolean, objects, strings",
			"troolean, arrays, strings",
			"strings, figures, noodles",
			"objects, functions, lists",
		],
		answer: "boolean, objects, strings",
	},

	{
		prompt: `How do you call a
				function named 
				myFunction?`,
        choices: [
			"call myFunction()",
			"myFunction()",
			"call function myFunction",
			"Call.myFunction",
		],
		answer: "myFunction()",
	},

	{
		prompt: `How does a for loop
				start?`,
        choices: [
			"for (i = 0; i <= 5; ii",
			"for (i = 0 == i <= 5)",
			"for (i = 0; i <= 5; i++)",
			"for (i <= 5; i++)",
		],
		answer: "for (i = 0; i <= 5; i++)",
	},

	{
		prompt: `Which of the following is 
				a logical operator in JavaScript?`,
        choices: ["=", "&&", "%", "+"],
		answer: "&&",
	},

	{
		prompt: `What is the outcome of 4+2+"8"?`,
        choices: ["14","68","22","428"],
		answer: "68",
	},
];

// Dom Elements

let questionsEl =
	document.querySelector(
		"#questions"
	);
let timerEl =
	document.querySelector("#timer");
let choicesEl =
	document.querySelector("#choices");
let submitBtn = document.querySelector(
	"#submit-score"
);
let startBtn =
	document.querySelector("#start");
let nameEl =
	document.querySelector("#name");
let feedbackEl = document.querySelector(
	"#feedback"
);
let reStartBtn =
	document.querySelector("#restart");

// starting point
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz and hide head page
function quizStart() {
	timerId = setInterval(
		clockTick,
		1000
	);
	timerEl.textContent = time;
	let landingScreenEl =
		document.getElementById(
			"start-screen"
		);
	landingScreenEl.setAttribute(
		"class",
		"hide"
	);
	questionsEl.removeAttribute(
		"class"
	);
	getQuestion();
}

// Loop through array of questions and answers, and create list with buttons
function getQuestion() {
	let currentQuestion =
		questions[currentQuestionIndex];
	let promptEl =
		document.getElementById(
			"question-text"
		);
	promptEl.textContent =
		currentQuestion.prompt;
	choicesEl.innerHTML = "";
	currentQuestion.choices.forEach(
		function (choice, i) {
			let choiceBtn =
				document.createElement(
					"button"
				);
			choiceBtn.setAttribute(
				"value",
				choice
			);
			choiceBtn.textContent =
				i + 1 + ". " + choice;
			choiceBtn.onclick =
				questionClick;
			choicesEl.appendChild(
				choiceBtn
			);
		}
	);
}

// Check for right answer if right or wrong, go to next question

function questionClick() {
	if (
		this.value !==
		questions[currentQuestionIndex]
			.answer
	) {
		time -= 10;
		if (time < 0) {
			time = 0;
		}
		timerEl.textContent = time;
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`;
		feedbackEl.style.color = "purple";
	} else {
		feedbackEl.textContent =
			"Correct!";
		feedbackEl.style.color =
			"Aqua";
	}
	feedbackEl.setAttribute(
		"class",
		"feedback"
	);
	setTimeout(function () {
		feedbackEl.setAttribute(
			"class",
			"feedback hide"
		);
	}, 2000);
	currentQuestionIndex++;
	if (
		currentQuestionIndex ===
		questions.length
	) {
		quizEnd();
	} else {
		getQuestion();
	}
}

// End quiz, stop timer and show final score

function quizEnd() {
	clearInterval(timerId);
	let endScreenEl =
		document.getElementById(
			"quiz-over"
		);
	endScreenEl.removeAttribute(
		"class"
	);
	let endScoreEl =
		document.getElementById(
			"score-end"
		);
	endScoreEl.textContent = time;
	questionsEl.setAttribute(
		"class",
		"hide"
	);
}

// End quiz if run out of time

function clockTick() {
	time--;
	timerEl.textContent = time;
	if (time <= 0) {
		quizEnd();
	}
}

// Save score and user name in local storage

function saveHighscore() {
	let name = nameEl.value.trim();
	if (name !== "") {
		let highscores =
			JSON.parse(
				window.localStorage.getItem(
					"highscores"
				)
			) || [];
		let newScore = {
			score: time,
			name: name,
		};
		highscores.push(newScore);
		window.localStorage.setItem(
			"highscores",
			JSON.stringify(highscores)
		);
		alert(
			"Your Score has been Submitted"
		);
	}
}

// Save users' score after pressing enter

function checkForEnter(event) {
	if (event.key === "Enter") {
		saveHighscore();
		alert(
			"Your Score has been Submitted"
		);
	}
}
nameEl.onkeyup = checkForEnter;

// Save users' score when you click submit

submitBtn.onclick = saveHighscore;

// Start quiz when you click start quiz

startBtn.onclick = quizStart;
