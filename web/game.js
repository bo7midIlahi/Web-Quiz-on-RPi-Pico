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
