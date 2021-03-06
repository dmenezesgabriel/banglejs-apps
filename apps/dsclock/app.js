require("Font7x11Numeric7Seg").add(Graphics);

var intervalRef = null;

function drawTime() {
  var d = new Date();
  var size = Math.floor(g.getWidth() / (7 * 6));
  var x = g.getWidth() / 2 - size * 6,
    y = g.getHeight() / 2 - size * 7;
  g.reset().clearRect(0, y, g.getWidth(), y + size * 12 + 8);
  g.setFont("7x11Numeric7Seg", size).setFontAlign(1, -1);
  g.drawString(d.getHours(), x, y);
  g.setFontAlign(-1, -1);
  if (d.getSeconds() & 1) g.drawString(":", x, y);
  g.drawString(("0" + d.getMinutes()).substr(-2), x + size * 4, y);
  // draw seconds
  g.setFont("7x11Numeric7Seg", size / 2);
  g.drawString(("0" + d.getSeconds()).substr(-2), x + size * 18, y + size * 7);
  // date
  var s = d.toString().split(" ").slice(0, 4).join(" ");
  g.setFont("6x8", 2).setFontAlign(0, -1);
  g.drawString(s, g.getWidth() / 2, y + size * 12);
}

function startdraw() {
  Bangle.setUI("clock");
  Bangle.drawWidgets();
  intervalRef = setInterval(drawTime, 1000);
  drawTime();
}

function stopdraw() {
  clearInterval(intervalRef);
}

// Required to show apple notifications
var SCREENACCESS = {
  withApp: true,
  request: function () {
    this.withApp = false;
    stopdraw(); //clears redraw timers etc"
  },
  release: function () {
    this.withApp = true;
    startdraw(); //redraw app screen, restart timers etc
  },
};
//

// Only update when display turns on
if (process.env.BOARD != "SMAQ3")
  // hack for Q3 which is always-on
  Bangle.on("lcdPower", function (on) {
    // Required to show apple notifications
    if (!SCREENACCESS.withApp) return;
    if (on) {
      startdraw();
    } else {
      stopdraw();
    }
    //
  });

g.clear();
Bangle.loadWidgets();
startdraw();
setButtons();
