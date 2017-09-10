var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('lobby',['lobby']);
var app = express();

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/data', function(req, res){
	console.log('I am getting a GET req');
	db.lobby.find(function(err, doc){
		console.log(doc);
		res.json(doc);
	});
});

app.post('/addData', function(req,  res){
	console.log('I am getting a POST req');
	db.lobby.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/removeData/:id', function(req, res){
	var id=req.params.id;
	console.log(id);
	db.lobby.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.listen(8080);
console.log('server is running bitch!');
