import { main } from "./game.js";

//script to check both players entered their names
const message = document.getElementById("msg");
message.textContent =
  "PLEASE ENTER YOUR NAMES THEN CLICK ON THE BUTTON TO CONFIRM";

function constructInRightPanel(input2) {
  const labelplayer2 = document.getElementById("namePlayer2");
  const container = document.querySelector(".right-panel");

  labelplayer2.remove();

  const element = document.createElement("h2");
  element.textContent = input2.value;
  element.dataset.text = input2.value;
  element.classList.add("glow");
  container.appendChild(element);

  const progress = document.createElement("div");
  progress.id = "progress2";
  progress.class = "progress";

  container.appendChild(progress);
}

function constructInLeftPanel(input1) {
  const labelplayer1 = document.getElementById("namePlayer1");
  const container = document.querySelector(".left-panel");

  labelplayer1.remove();

  const element = document.createElement("h2");
  element.textContent = input1.value;
  element.dataset.text = input1.value;
  element.classList.add("glow");
  container.appendChild(element);

  const progress = document.createElement("div");
  progress.id = "progress1";
  progress.class = "progress";

  container.appendChild(progress);
}

function constructInMessage() {
  console.log("CONSTRUCTING");

  //creating new elements
  const choice1 = document.createElement("label");
  const choice2 = document.createElement("label");
  const choice3 = document.createElement("label");

  //sestting value of new elements
  choice1.textContent = "CHOICE1";
  choice2.textContent = "CHOICE2";
  choice3.textContent = "CHOICE3";

  //setting id for choices
  choice1.id = "choice1";
  choice2.id = "choice2";
  choice3.id = "choice3";

  //add new elements to .messages
  const container = document.querySelector(".messages");

  container.appendChild(choice1);
  container.appendChild(choice2);
  container.appendChild(choice3);
}

function checkInputs() {
  const btn = document.getElementById("OKbtn");

  if (input1.value.trim() && input2.value.trim()) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function confirm() {
  const label = document.getElementById("msg");
  const labelplayer1 = document.getElementById("namePlayer1");
  const labelplayer2 = document.getElementById("namePlayer2");

  const btn = document.getElementById("OKbtn");

  const input1 = document.getElementById("player1");
  const input2 = document.getElementById("player2");
  input1.addEventListener("input", checkInputs);
  input2.addEventListener("input", checkInputs);

  // 👉 VALIDATION
  if (!input1.value.trim() || !input2.value.trim()) {
    label.textContent = "⚠️ BOTH PLAYERS MUST ENTER THEIR NAMES!";
    label.style.color = "red";
    return; // 🚨 STOP HERE
  }

  // reset message style (optional)
  label.style.color = "";

  // putting names
  label.textContent = "QUESTION";
  labelplayer1.textContent = input1.value;
  labelplayer2.textContent = input2.value;

  labelplayer1.dataset.text = input1.value;
  labelplayer2.dataset.text = input2.value;

  labelplayer1.classList.add("glow");
  labelplayer2.classList.add("glow");

  // remove btns
  if (btn) btn.remove();

  // remove inputs
  input1.remove();
  input2.remove();

  constructInMessage();
  constructInLeftPanel(input1);
  constructInRightPanel(input2);

  main(document.getElementById("file").value);
}
window.confirm = confirm; // to make the confirm() global
