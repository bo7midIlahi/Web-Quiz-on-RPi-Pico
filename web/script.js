//script to check both players entered their names
const message = document.getElementById("msg");
message.textContent =
  "PLEASE ENTER YOUR NAMES THEN CLICK ON THE BUTTON TO CONFIRM";

function constructInMessage() {
  console.log("CONSTRUCTING");

  //creating new elements
  const choice1 = document.createElement("label");
  const choice2 = document.createElement("label");
  const choice3 = document.createElement("label");
  const br = document.createElement("br");
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

  //clear texts
  label.textContent = "QUESTION";
  labelplayer1.textContent = "YES";
  labelplayer2.textContent = "NO";

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
  /*constructInLeftPanel();
  constructInRightPanel();*/
}
