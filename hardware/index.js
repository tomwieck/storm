pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function() {
  // Define our hardware.
  // It's a 12px ring connected to pin 6.
  strip = new pixel.Strip({
    board: this,
    controller: "FIRMATA",
    strips: [ {pin: 6, length: 30}, ],
    gamma: 2.8,
  });

  // Just like DOM-ready for web developers.
  strip.on("ready", function() {
    // Set the entire strip to pink.
    strip.color('#ffffff');

    // Send instructions to NeoPixel.
    strip.show();

    let i = 0;
    while(i < 75) {
      i++
    }

    var stdin = process.openStdin();
    stdin.addListener("data", function(d) {
      // note:  d is an object, and when converted to a string it will
      // end with a linefeed.  so we (rather crudely) account for that
      // with toString() and then trim()
      console.log("you entered: [" +
          d.toString().trim() + "]");
    });
  });

  // Allows for command-line experimentation!
  this.repl.inject({
    strip: strip
  });
});