export function main() {
  //export to make the function accessible from script.js
  console.log("main function");
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

loadQuestions("html").then((q) => console.log(q));
loadQuestions("css").then((q) => console.log(q));
loadQuestions("js").then((q) => console.log(q));
