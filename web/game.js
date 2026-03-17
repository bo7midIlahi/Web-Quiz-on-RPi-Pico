let currentQuestion = null; /*store current question to access it globally*/

let questionNumber = 0;
let questionsList = [];

let healthBar1HR = 100;
let healthBar2HR = 100;

let player1Name = "";
let player2Name = "";
let player1Time = null;
let player2Time = null;
let scorePlayer1 = 0;
let scorePlayer2 = 0;

let startTime = null;

export function main(file) {
  console.log("main function");

  document.getElementById("file").remove();

  console.log(`player1: ${document.querySelectorAll(".glow")[0].textContent}`);
  player1Name = document.querySelectorAll(".glow")[0].textContent;

  console.log(`player2: ${document.querySelectorAll(".glow")[1].textContent}`);
  player2Name = document.querySelectorAll(".glow")[1].textContent;

  loadQuestions(file).then((q) => {
    questionsList = q; // store all questions
    createScoreUI();
    startGame(); // start loop
  });
}

function startGame() {
  if (questionNumber >= questionsList.length) {
    console.log("Game finished!");
    return;
  }
  showquestion(questionsList, questionNumber);
  timer();
  const answerPlayer1 = document.getElementById("answerPlayer1");
  const answerPlayer2 = document.getElementById("answerPlayer2");
  Object.assign(answerPlayer1.style, {
    color: "grey",
    backgroundColor: "",
  });
  Object.assign(answerPlayer2.style, {
    color: "grey",
    backgroundColor: "",
  });
}

function checkGameOver() {
  if (healthBar1HR <= 0 && healthBar2HR <= 0) {
    showWinner("Draw");
    return true;
  }

  if (healthBar1HR <= 0) {
    showWinner(player2Name);
    return true;
  }

  if (healthBar2HR <= 0) {
    showWinner(player1Name);
    return true;
  }

  return false;
}

function saveToLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  leaderboard.push({
    player1: player1Name,
    player2: player2Name,
    score1: scorePlayer1,
    score2: scorePlayer2,
    winner:
      scorePlayer1 > scorePlayer2
        ? player1Name
        : scorePlayer2 > scorePlayer1
        ? player2Name
        : "Draw",
  });

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showWinner(winner) {
  saveToLeaderboard();

  document.body.innerHTML = "";

  const screen = document.createElement("div");
  screen.style.display = "flex";
  screen.style.flexDirection = "column";
  screen.style.justifyContent = "center";
  screen.style.alignItems = "center";
  screen.style.height = "100vh";
  screen.style.fontSize = "2rem";

  const text = document.createElement("h1");
  text.textContent = `${winner} wins! 🏆`;

  const button = document.createElement("button");
  button.textContent = "Restart";
  button.onclick = () => location.reload();

  screen.appendChild(text);
  screen.appendChild(button);

  // leaderboard
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const list = document.createElement("ul");

  leaderboard
    .slice(-5)
    .reverse()
    .forEach((game) => {
      const item = document.createElement("li");
      item.textContent = `${game.player1} (${game.score1}) vs ${game.player2} (${game.score2}) → ${game.winner}`;
      list.appendChild(item);
    });

  screen.appendChild(list);

  document.body.appendChild(screen);
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
  element.dataset.choice = choice;

  const now = Date.now();

  if (playerID === "answerPlayer1" && !player1Time) {
    player1Time = now;
  }

  if (playerID === "answerPlayer2" && !player2Time) {
    player2Time = now;
  }
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

function createScoreUI() {
  const leftPanel = document.querySelector(".left-panel");
  const rightPanel = document.querySelector(".right-panel");

  const score1 = document.createElement("h3");
  score1.id = "score1";
  score1.textContent = "Score: 0";

  const score2 = document.createElement("h3");
  score2.id = "score2";
  score2.textContent = "Score: 0";

  leftPanel.appendChild(score1);
  rightPanel.appendChild(score2);
}

function checkAnswer(responseTime = 3) {
  const answerPlayer1 = document.getElementById("answerPlayer1");
  const answerPlayer2 = document.getElementById("answerPlayer2");
  const healthBar1 = document.getElementById("progress1");
  const healthBar2 = document.getElementById("progress2");

  let p1 = player1Time ? player1Time - startTime : Infinity;
  let p2 = player2Time ? player2Time - startTime : Infinity;

  const p1Correct = correctAnswer(answerPlayer1);
  const p2Correct = correctAnswer(answerPlayer2);

  // PLAYER 1
  if (p1Correct) {
    let bonus = Math.max(0, Math.floor((3 - responseTime) * 5));
    scorePlayer1 += 10 + bonus;

    Object.assign(answerPlayer1.style, {
      color: "green",
      backgroundColor: "lightgreen",
    });
  } else {
    healthBar1HR = Math.max(0, healthBar1HR - 20);
    healthBar1.style.width = healthBar1HR + "%";
    healthBar1.style.backgroundColor = "red";
    setTimeout(() => {
      healthBar1.style.backgroundColor = "green";
    }, 300);

    Object.assign(answerPlayer1.style, {
      color: "red",
      backgroundColor: "pink",
    });
  }

  // PLAYER 2
  if (p2Correct) {
    let bonus = Math.max(0, Math.floor((3 - responseTime) * 5));
    scorePlayer2 += 10 + bonus;

    Object.assign(answerPlayer2.style, {
      color: "green",
      backgroundColor: "lightgreen",
    });
  } else {
    healthBar2HR = Math.max(0, healthBar2HR - 20);
    healthBar2.style.width = healthBar2HR + "%";
    healthBar2.style.backgroundColor = "red";
    setTimeout(() => {
      healthBar2.style.backgroundColor = "green";
    }, 300);

    Object.assign(answerPlayer2.style, {
      color: "red",
      backgroundColor: "pink",
    });
  }

  // SPEED BONUS (ONLY IF CORRECT)
  if (p1Correct && p1 < p2) {
    scorePlayer1 += 5;
  } else if (p2Correct && p2 < p1) {
    scorePlayer2 += 5;
  }

  // update UI
  document.getElementById("score1").textContent = `Score: ${scorePlayer1}`;
  document.getElementById("score2").textContent = `Score: ${scorePlayer2}`;

  if (checkGameOver()) return;
}

function resetUI() {
  player1Time = null;
  player2Time = null;
  // reset answers text
  document.getElementById("answerPlayer1").textContent = "";
  document.getElementById("answerPlayer2").textContent = "";

  // reset stored choices
  document.getElementById("answerPlayer1").dataset.choice = "";
  document.getElementById("answerPlayer2").dataset.choice = "";

  // reset colors of choices
  for (let i = 1; i <= 3; i++) {
    const choice = document.getElementById(`choice${i}`);
    choice.style.backgroundColor = "";
  }
}

export function timer() {
  const element = document.querySelector(".messages");

  let clock = document.getElementById("clock");

  // prevent multiple clocks
  if (!clock) {
    clock = document.createElement("h2");
    clock.id = "clock";
    element.appendChild(clock);
  }

  let time = 3;
  clock.textContent = time;

  if (!document.getElementById("answerPlayer1")) {
    createAnswerLocation();
  }

  startTime = Date.now();
  const interval = setInterval(() => {
    time--;
    clock.textContent = time;

    if (time <= 0) {
      clearInterval(interval);

      clock.textContent = "Time's up!";
      let responseTime = (Date.now() - startTime) / 1000;
      checkAnswer(responseTime);

      //GO TO NEXT QUESTION
      setTimeout(() => {
        if (checkGameOver()) return;

        questionNumber++;
        resetUI();
        startGame();
      }, 2000); //small delay so user see correct answer
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
