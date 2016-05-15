
var args    = require('minimist')(process.argv.slice(2));
var extend  = require('yow').extend;
var sprintf = require('yow').sprintf;
var fs      = require('fs');
var Matrix  = require('hzeller-matrix');
var matrix  = new Matrix({width:32, height:32});

var App = function() {
	
	this.run = function() {

		if (args.rain) {
			var options = {};
			
			extend(options, {duration   : args.duration});
			extend(options, {delay      : args.delay});
				
			matrix.runRain(options);
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
		else
			console.log('Nothing to do!');

	};
};


var app = new App();	
app.run();



