const casper = require('casper').create({
	verbose: true,
	//logLevel: 'debug',
	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
	pageSettings: {},
	viewportSize: {
		width: 1024,
		height: 768
	},
	timeout: 120000
});

const bank = casper.cli.get(0);
const aba = casper.cli.get(1);
const state = casper.cli.get(2);
const fileName = casper.cli.get(3);

const url = 'https://www.frbservices.org/EPaymentsDirectory/fedwireResults.html?bank=' + bank + '&aba=' + 
aba + '&state=' + state + '&city=+&securities=true&_securities=on&_securities=on&funds=true&_funds=on&_funds=on&submitButton=Search&referredBy=searchFedwirePage';

console.log('Url: ' + url);

casper.start(url, function () {
	console.log("Url loaded");

	if (this.exists('#agree_terms_use')) {

		this.echo('agree_terms_use exists');
		this.click('#agree_terms_use');

		this.waitForSelector('footer', function () {
			this.echo('Result loaded');
			this.capture(fileName);
		}, function () {
			this.echo('Timeouted');
			this.capture(fileName);
		}, 5000);

	} else {
		this.echo('agree_terms_use does not exist');
		this.capture(fileName);
	}
});

casper.run();
