var express = require('express');
var app = express();

var request = require('request');

app.get('/hello', function(req, res) {
	request('http://dblp.uni-trier.de/search/author?xauthor=Schek', function(error, res, body) {
		if(!error && res.statusCode == 200) {
			console.log(body)
		}
	});

	var myBody = 'Hello World!';
	res.setHeader('Content-type', 'text/plain');
	res.setHeader('Content-length', myBody.length);
	res.end(myBody);
});

app.listen(8000);
console.log('Listening on port 8000');