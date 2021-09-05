// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// Position on screen
const X = 190;
const Y = 130;

function draw() {
  // work out how to display the current time
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var time = hour + ":" + ("0" + minute).substr(-2);

  // Reset the state of the graphics library
  g.reset();
  // Draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg", 5);
  g.setFontAlign(1, 1); // align right bottom
  g.drawString(time, X, Y, true /*clear background*/);
  // Draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg", 2);
  g.drawString(
    ("0" + date.getSeconds()).substr(-2),
    X + 30,
    Y,
    true /*clear background*/
  );
  // Draw the date, in a normal font
  g.setFont("6x8", 2);
  g.setFontAlign(0, 1); // align center bottom
  // Pad the date - this clears the background
  var dateStr = "    " + require("locale").date(date) + "    ";
  g.drawString(dateStr, g.getWidth() / 2, Y + 20, true /*clear background*/);
}

// Clear the screen once, at startup
g.clear();
// Draw immediately at first
draw();
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on("lcdPower", (on) => {
  if (secondInterval) {
    clearInterval(secondInterval);
    secondInterval = undefined;
  }
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); //draw immediately
  }
});

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();

// Show launcher when middle button is pressed
setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });
