let currentQuestion = null; /*store current question to access it globally*/
let healthBar1HR = 100;
let healthBar2HR = 100;

export function main() {
  //export to make the function accessible from script.js
  console.log("main function");
  loadQuestions("html").then((q) => showquestion(q, 0));
  timer(); //1 -> left player && -1 ->right player
}

async function loadQuestions(topic) {
  try {
    console.log("loading", topic);
    const response = await fetch(`../questions/${topic}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

function changeAnswer(playerID, choice) {
  const element = document.getElementById(playerID);

  element.textContent = document.getElementById(`choice${choice}`).textContent;

  element.dataset.choice = choice; // store choice number
}

function getAnswers() {
  document.addEventListener("keydown", function (event) {
    // Choice 1
    if (event.code === "KeyA" || event.key.toLowerCase() === "a") {
      console.log("Choice 1 selected");
      changeAnswer("answerPlayer1", 1);
    }

    // Choice 2
    if (event.code === "KeyZ" || event.key.toLowerCase() === "z") {
      console.log("Choice 2 selected");
      changeAnswer("answerPlayer1", 2);
    }

    // Choice 3
    if (event.code === "KeyE" || event.key.toLowerCase() === "e") {
      console.log("Choice 3 selected");
      changeAnswer("answerPlayer1", 3);
    }

    //player 2
    //choice1
    if (event.code === "KeyK" || event.key.toLowerCase() === "k") {
      console.log("Choice 1 selected");
      changeAnswer("answerPlayer2", 1);
    }

    // Choice 2
    if (event.code === "KeyL" || event.key.toLowerCase() === "l") {
      console.log("Choice 2 selected");
      changeAnswer("answerPlayer2", 2);
    }

    // Choice 3
    if (event.code === "KeyM" || event.key.toLowerCase() === "m") {
      console.log("Choice 3 selected");
      changeAnswer("answerPlayer2", 3);
    }
  });
}

function createAnswerLocation() {
  const leftPanel = document.querySelector(".left-panel");
  const rightPanel = document.querySelector(".right-panel");

  const answerPlayer1 = document.createElement("h2");
  answerPlayer1.id = "answerPlayer1";
  answerPlayer1.textContent = "";
  leftPanel.appendChild(answerPlayer1);

  const answerPlayer2 = document.createElement("h2");
  answerPlayer2.id = "answerPlayer2";
  answerPlayer2.textContent = "";
  rightPanel.appendChild(answerPlayer2);

  getAnswers();
}

function correctAnswer(answerElement) {
  const playerChoice = Number(answerElement.dataset.choice);
  const rightAnswer = document.getElementById(
    `choice${currentQuestion.correct_answer}`
  );
  Object.assign(rightAnswer.style, {
    backgroundColor: "lightgreen",
  });

  if (!playerChoice) return false;

  return playerChoice === currentQuestion.correct_answer;
}

function checkAnswer() {
  const answerPlayer1 = document.getElementById("answerPlayer1");
  const answerPlayer2 = document.getElementById("answerPlayer2");
  const healthBar1 = document.getElementById("progress1");
  const healthBar2 = document.getElementById("progress2");

  // PLAYER 1
  if (correctAnswer(answerPlayer1)) {
    Object.assign(answerPlayer1.style, {
      color: "green",
      backgroundColor: "lightgreen",
    });
  } else {
    healthBar1HR = Math.max(0, healthBar1HR - 20); // reduce 20%
    healthBar1.style.width = healthBar1HR + "%";

    Object.assign(answerPlayer1.style, {
      color: "red",
      backgroundColor: "pink",
    });
  }

  // PLAYER 2
  if (correctAnswer(answerPlayer2)) {
    Object.assign(answerPlayer2.style, {
      color: "green",
      backgroundColor: "lightgreen",
    });
  } else {
    healthBar2HR = Math.max(0, healthBar2HR - 20); // reduce 20%
    healthBar2.style.width = healthBar2HR + "%";

    Object.assign(answerPlayer2.style, {
      color: "red",
      backgroundColor: "pink",
    });
  }
}

export function timer() {
  const element = document.querySelector(".messages");

  const clock = document.createElement("h2");
  clock.id = "clock";

  let time = 3;

  clock.textContent = time;
  element.appendChild(clock);
  createAnswerLocation();

  const interval = setInterval(() => {
    time--;
    clock.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      clock.textContent = "Time's up!";
      checkAnswer();
    }
  }, 1000);
}

function showquestion(q, i) {
  console.log("inside showquestion()");

  currentQuestion = q[i]; // store current question

  const questions = document.getElementById("msg");
  questions.textContent = currentQuestion.question;

  for (let index = 0; index < currentQuestion.choices.length; index++) {
    const element = document.getElementById(`choice${index + 1}`);
    element.textContent = currentQuestion.choices[index];
  }
}

loadQuestions("css").then((q) => console.log(q));
loadQuestions("js").then((q) => console.log(q));
