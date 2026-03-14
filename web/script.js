//script to check both players entered their names
const message = document.getElementById("msg");
message.textContent =
  "PLEASE ENTER YOUR NAMES THEN CLICK ON THE BUTTON TO CONFIRM";

function constructInRightPanel() {
  const container = document.querySelector(".right-panel");

  //creating health bar
  const progress = document.createElement("progress");
  progress.id = "progress";
  progress.value = 100;

  //showing health bar
  container.appendChild(progress);
}

function constructInLeftPanel() {
  const container = document.querySelector(".left-panel");

  //creating health bar
  const progress = document.createElement("progress");
  progress.id = "progress";
  progress.value = 100;

  //showing health bar
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
  choice1.id = "choice";
  choice2.id = "choice";
  choice3.id = "choice";

  //add new elements to .messages
  const container = document.querySelector(".messages");

  container.appendChild(choice1);
  container.appendChild(choice2);
  container.appendChild(choice3);
}

function confirm() {
  const label = document.getElementById("msg");
  const labelplayer1 = document.getElementById("namePlayer1");
  const labelplayer2 = document.getElementById("namePlayer2");

  const btn = document.getElementById("OKbtn");

  const input1 = document.getElementById("player1");
  const input2 = document.getElementById("player2");

  //putting names
  label.textContent = "QUESTION";
  labelplayer1.textContent = input1.value;
  labelplayer2.textContent = input2.value;

  //setting data-sets because the glow in css depends on it
  labelplayer1.dataset.text = input1.value;
  labelplayer2.dataset.text = input2.value;

  //glowing names
  labelplayer1.classList.add("glow");
  labelplayer2.classList.add("glow");

  //remove btns
  if (btn) {
    btn.remove();
  }

  //remove inputs
  if (input1) {
    input1.remove();
  }

  if (input2) {
    input2.remove();
  }

  constructInMessage();
  constructInLeftPanel();
  constructInRightPanel();
}
