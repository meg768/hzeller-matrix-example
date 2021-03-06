
var args    = require('minimist')(process.argv.slice(2));
var extend  = require('yow').extend;
var sprintf = require('yow').sprintf;
var fs      = require('fs');
var Matrix  = require('hzeller-matrix');


var App = function() {

	var width  = 32;
	var height = 32;

	if (args.size != undefined) {
		var sizes = args.size.split('x');

		if (sizes.length == 2) {
			args.width  = sizes[0];
			args.height = sizes[1];
		}
	}

	if (args.width != undefined)
		width = parseInt(args.width);

	if (args.height != undefined)
		height = parseInt(args.height);

	var matrix  = new Matrix({width:width, height:height});

	this.run = function() {

		function callback() {
			console.log('Done.');
		}

		if (args.fill) {
			var display = matrix.display;

			for (var x = 0; x < matrix.width; x++)
				for (var y = 0; y < matrix.height; y++)
					matrix.display.drawPixel(x, y, 0, 0, 255);

			matrix.display.update();

			setTimeout(function(){}, 2000);
		}

		else if (args.rain) {
			var options = {};

			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {speed      : args.speed});

			if (args.hue) {
				extend(options, {hue : parseInt(args.hue)});

			}


			matrix.runRain(options, callback);
		}

		else if (args.perlin) {
			var options = {};

			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {speed      : args.speed});

			extend(options, {mode       : args.mode});

			matrix.runPerlin(options, callback);
		}

		else if (args.image) {
			var options = {};

			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {speed      : args.speed});

			extend(options, {scroll     : args.scroll});
			extend(options, {pause      : args.pause});
			extend(options, {iterations : args.iterations});

			matrix.runImage(args.image, options, callback);

		}
		else if (args.animation) {
			var options = {};

			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {speed      : args.speed});

			extend(options, {iterations : args.iterations});

			matrix.runAnimation(args.animation, options, callback);

		}
		else if (args.text) {
			var options = {};

			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {speed      : args.speed});

			extend(options, {textColor  : args.textColor});
			extend(options, {fontName   : args.fontName});
			extend(options, {fontSize   : args.fontSize});
			extend(options, {iterations : args.iterations});

			matrix.runText(args.text, options, callback);

		}
		else if (args.clock) {
			var options = {};

			extend(options, {duration   : args.duration});
			matrix.runClock(args.clock, options, callback);

		}
		else {
			matrix.runText('Hello World!');

		}

	};
};


var app = new App();
app.run();
