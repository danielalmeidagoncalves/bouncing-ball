var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// jquery	
app.get('/bower_components/jquery/dist/jquery.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/bower_components/jquery/dist/jquery.min.js'));
});

// semantic-ui js
app.get('/bower_components/semantic/dist/semantic.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/bower_components/semantic/dist/semantic.min.js'));
});

// semantic-ui css
app.get('/bower_components/semantic/dist/semantic.min.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/bower_components/semantic/dist/semantic.min.css'));
});

// ball js
app.get('/ball.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/ball.js'));
});

// ball css
app.get('/ball.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/ball.css'));
});

app.listen(8080);