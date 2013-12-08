var express = require('express');
var app = express();
var path = require('path');


var request = require('request');

app.get('/search', function(req, res){
    request('http://dblp.uni-trier.de/search/author?xauthor=Schek', function(error, res, body) {
		if(!error && res.statusCode == 200) {
			console.log(body)
		}
	});
    var body = '[ ' +
        '{ "node" : { "label" : "1", "x" : ' + Math.random() + ', "y" : ' + Math.random() + ', "color" : "#358753", "cluster" : "A"} } , ' +
        '{ "node" : { "label" : "2", "x" : ' + Math.random() + ', "y" : ' + Math.random() + ', "color" : "#358753", "cluster" : "A"} } , ' +
        '{ "node" : { "label" : "3", "x" : ' + Math.random() + ', "y" : ' + Math.random() + ', "color" : "#358753", "cluster" : "B"} } , ' +
        '{ "node" : { "label" : "4", "x" : ' + Math.random() + ', "y" : ' + Math.random() + ', "color" : "#358753", "cluster" : "B"} } , ' +
        '{ "edge" : { "name" : "12", "source" : "1", "target" : "2" } } ,' +
        '{ "edge" : { "name" : "34", "source" : "3", "target" : "4" } } ,' +
        '{ "edge" : { "name" : "23", "source" : "2", "target" : "3" } } ' +
        '] ';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});
app.use(express.static(path.resolve(__dirname, 'client')));




app.listen(80);
console.log('Listening on port 80');