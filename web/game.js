export function main() {
  //export to make the function accessible from script.js
  console.log("main function");
  loadQuestions("html").then((q) => showquestion(q, 0));
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
// usage

function showquestion(q, i) {
  const questions = document.getElementById("msg");
  questions.textContent = q[i].question;
  const choices = document.getElementById("choice");
  console.log(`choices = ${choices.textContent}`);
}

loadQuestions("css").then((q) => console.log(q));
loadQuestions("js").then((q) => console.log(q));
