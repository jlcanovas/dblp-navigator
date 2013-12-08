var express = require('express');
var app = express();
app.use(express.urlencoded());
var path = require('path');
var request = require('request');
var xmldoc = require('xmldoc');

function searchAuthors(topic) {
    request('http://dblp.uni-trier.de/search/author?xauthor='+topic, function(error, res, body) {
        if(!error && res.statusCode == 200) {
            var document = new xmldoc.XmlDocument(body);
            var result = [];
            for(var i = 0; i < document.children.length; i++) {
                var author = document.children[i];
                console.log("Found " + author.val);
                result.push({ name : author.val, urlpt : author.attr.urlpt });
            }
            console.log("Size IN" + result.length);
            return result;
        }
    });
    console.log("Going out");
};

function findCoauthors(urlpt) {
    request('http://dblp.uni-trier.de/pers/xc/'+urlpt, function(error, res, body) {
        if(!error && res.statusCode == 200) {
            var document = new xmldoc.XmlDocument(body);
            var result = [];
            for(var i = 0; i < document.children.length; i++) {
                var author = document.children[i];
                result.push(author);
            }
            return result;
        }
    });
}

function findPublications(urlpt) {
    request('http://dblp.uni-trier.de/pers/xk/'+urlpt, function(error, res, body) {
        if(!error && res.statusCode == 200) {
            var document = new xmldoc.XmlDocument(body);
            var result = [];
            for(var i = 0; i < document.children.length; i++) {
                var author = document.children[i];
                result.push(author);
            }
            return result;
        }
    });
}

function buildGraphNode(label, cluster) {
    return '"node" : { ' +
        '"label" : ' + label + ', ' +
        '"x" : ' + Math.random() + ', ' +
        '"y" : ' + Math.random() + ', ' +
        '"color" : rgb( '+ Math.round(Math.random()*256)+','+ Math.round(Math.random()*256)+','+ Math.round(Math.random()*256)+'),' + ' ' +
        '"cluster" : ' + cluster + '}';
}

app.post('/search', function(req, res){
    var topicSearch = req.body.authorName;

    var graphInfo;
    var authors = searchAuthors(topicSearch);
    if(typeof authors != "undefined" && authors != null && authors.length > 0) {
        var author = authors[0] // TODO consider the rest
        graphInfo = '[ { ' + buildGraphNode(author.val, "A");
    } else {
        console.log("No authors found");
    }

    graphInfo += ' } ]';
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', graphInfo.length);
    res.end(graphInfo);
});
app.use(express.static(path.resolve(__dirname, 'client')));
app.listen(80);
console.log('Listening on port 80');