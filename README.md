# Hzeller Matrix Example

Example of using the **heller-matrix** add-on for Node.
You can find it here https://www.npmjs.com/package/hzeller-matrix

	$ sudo node app.js

This assumes a 32x32 RGB display. To change the width and height use **--width** and **--height** options (or **--size**).

	$ sudo node app.js --width 96 --height 96
	$ sudo node app.js --size 96x96

Or try some animations

	$ sudo node app.js --rain
	$ sudo node app.js --perlin
	$ sudo node app.js --animation animations/32x32/pacman.gif
	$ sudo node app.js --animation animations/32x32/tree.gif

Display text

	$ sudo node app.js --text "Hello World!" --fontName fonts/Roboto.ttf --textColor blue

Display image

	$ sudo node app.js --image images/32x32/emojis/435.png --iterations 2

The size of the display may be specified by the **width** and **height** options.

	$ sudo node app.js --text "Hello World!" --width 96 --height 96
	$ sudo node app.js --image images/96x96/emojis/435.png --iterations 2 --width 96 --height 96

Why not try a random animation with a 32x32 display?

	$ sudo node app.js --animation animations/32x32

Or with a 96x96 display?

	$ sudo node app.js --animation animations/96x96 --width 96 --height 96
