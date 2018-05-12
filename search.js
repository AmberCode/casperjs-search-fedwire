var casper = require('casper').create({
	verbose: true,
	logLevel: 'debug',
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
	pageSettings: {},
	viewportSize: {
		width: 1024,
		height: 768
	}
});

//Params
var timeout = casper.cli.get(0);
var url = casper.cli.get(1);
var fileName = casper.cli.get(2);

casper.options.timeout = timeout;

casper.start(url, function () {
	console.log("Url loaded");

	if (this.exists('#agree_terms_use')) {

		this.echo('agree_terms_use exists');
		this.click('#agree_terms_use');

		casper.wait(5000, function() {
			this.echo('Capturing...');
			this.capture(fileName);
		});

	} else {
		this.echo('agree_terms_use does not exist');
		this.capture(fileName);
	}
});

casper.run();
