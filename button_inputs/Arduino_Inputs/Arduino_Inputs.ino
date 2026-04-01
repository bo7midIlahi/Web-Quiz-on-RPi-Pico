#include <Keyboard.h>

const int buttonPinK = 2; // Pin connected to button
const int buttonPinL = 3; // Pin connected to button
const int buttonPinM = 4; // Pin connected to button

void setup() {
  pinMode(buttonPinK, INPUT_PULLUP); // Use internal pull-up
  pinMode(buttonPinL, INPUT_PULLUP); // Use internal pull-up
  pinMode(buttonPinM, INPUT_PULLUP); // Use internal pull-up

  Serial.begin(115200);
  Keyboard.begin();
}

void loop() {
  if (digitalRead(buttonPinK) == LOW) {
    Serial.println("A");
    Keyboard.write(65);
  }
  if (digitalRead(buttonPinL) == LOW) {
    Serial.println("Z");
    Keyboard.write(90);
  }
  if (digitalRead(buttonPinM) == LOW) {
    Serial.println("E");
    Keyboard.write(69);
  }else{
    Serial.println("NOTHING");
  }
  delay(50);
}
