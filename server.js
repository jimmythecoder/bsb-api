const express 		= require('express');
const bodyParser 	= require('body-parser');
const helmet 		= require('helmet');
const sqlite3 		= require('sqlite3').verbose();
const server 		= express();
const cors          = require('./app/cors');

var db              = new sqlite3.Database(':memory:');
var createDatabase 	= require('./app/createDatabase')(db, './db/bsb.csv');
var bsbRouter 	    = require('./app/bsbRouter')(db);

server.use(helmet());
server.use(bodyParser.json());
server.use(cors);
server.use('/api/v1/bsb', bsbRouter);

server.get('/', function(req, res, next) {
	res.send("BSB API");
});

server.use(function (err, req, res, next) {
  console.error(err);
  res.status(400).send(err);
})

server.listen(8080, function () {
  	console.log('BSB service started on port 8080');
});

process.on('exit', function() {
    db.close();
});

process.on('SIGINT', function() {
    process.exit(2);
});
