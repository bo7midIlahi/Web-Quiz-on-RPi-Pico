export function main() {
  //export to make the function accessible from script.js
  console.log("main function");
  loadQuestions("html").then((q) => showquestion(q, 0));
  timer();
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

export function timer() {
  const element = document.querySelector(".messages");

  const clock = document.createElement("h2");
  clock.id = "clock";

  let time = 10;

  clock.textContent = time;
  element.appendChild(clock);

  const interval = setInterval(() => {
    time--;
    clock.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      clock.textContent = "Time's up!";
    }
  }, 1000);
}

function showquestion(q, i) {
  console.log("inside showquestion()");
  const questions = document.getElementById("msg");
  questions.textContent = q[i].question;

  console.log(`choice = ${q[i].choices[i]}`);

  for (let index = 0; index < q.length; index++) {
    const element = document.getElementById(`choice${index + 1}`);
    element.textContent = q[i].choices[index];
  }
}

loadQuestions("css").then((q) => console.log(q));
loadQuestions("js").then((q) => console.log(q));
