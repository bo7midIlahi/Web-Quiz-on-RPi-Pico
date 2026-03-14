//script to check both players entered their names
const message = document.getElementById("msg");
message.textContent =
  "PLEASE ENTER YOUR NAMES THEN CLICK ON THE BUTTON TO CONFIRM";

function construct() {
  console.log("CONSTRUCTING");
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
  labelplayer2.textContent = "YES";

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

  construct();
}
