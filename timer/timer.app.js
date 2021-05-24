var counter = 10;
var counterInterval;

function outOfTime() {
  if (counterInterval) return;
  E.showMessage("Out of Time", "Timer");
  Bangle.buzz();
  // Bangle.beep(time, freq)
  Bangle.beep(200, 4000).then(() =>
    new Promise((resolve) => setTimeout(resolve, 200)).then(() =>
      Bangle.beep(200, 3000)
    )
  );
  // Recursive call to run it again 10 seconds later
  setTimeout(outOfTime, 10000);
}

function countDown() {
  // Decrement operators (subtracts one) from it's operand and returns a value.
  counter--;
  // Check if countdown has finished
  if (counter <= 0) {
    clearInterval(counterInterval);
    counterInterval = undefined;
    setWatch(startTimer, BTN2);
    outOfTime();
    return;
  }
  // Clear watch screen
  g.clear();
  g.setFontAlign(0, 0); // center font
  g.setFont("6x8", 8); // bitmap font, 8x magnified
  // Draw the current counter value
  g.drawString(counter, 120, 120);
  // optional - this keeps the watch LCD lit up
  g.flip();
}

function startTimer() {
  // Reset counter
  counter = 10;
  countDown();
  if (!counterInterval) {
    counterInterval = setInterval(countDown, 1000);
  }
}

startTimer();
