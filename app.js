
var args    = require('minimist')(process.argv.slice(2));
var extend  = require('yow').extend;
var sprintf = require('yow').sprintf;
var fs      = require('fs');
var Matrix  = require('hzeller-matrix');

var matrix  = new Matrix({width:32, height:32});

var App = function() {
	
	this.run = function() {

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
				
			matrix.runRain(options);
		}
		else if (args.image) {
			var options = {};
			
			extend(options, {scroll     : args.scroll});
			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			extend(options, {hold       : args.hold});
			
			matrix.runImage(args.image, options);
			
		}
		else if (args.animation) {
			var options = {};
			
			extend(options, {iterations : args.iterations});
			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
			
			matrix.runAnimation(args.animation, options);
			
		}
		else if (args.text) {
			var options = {};
			
			extend(options, {textColor : args.textColor});
			extend(options, {fontName  : args.fontName});
			extend(options, {fontSize  : args.fontSize});
			extend(options, {duration  : args.duration});
			extend(options, {delay     : args.delay});
			
			matrix.runText(args.text, options);
		}
		else {
			matrix.runText('Hello World!');
			
		}

	};
};


var app = new App();	
app.run();



