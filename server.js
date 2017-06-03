const express 		= require('express');
const bodyParser 	= require('body-parser');
const helmet 		= require('helmet');
const sqlite3 		= require('sqlite3').verbose();
const server 		= express();
const cors          = require('./app/cors');
const sourceFile    = './db/bsb.csv';

var db              = new sqlite3.Database(':memory:');
var init 	        = require('./app/init');
var bsbRouter 	    = require('./app/bsbRouter')(db);

server.use(helmet());           // Secure the express app
server.use(bodyParser.json());  // Parse JSON requests
server.use(cors);               // Allow cross domain usage of the API
server.use('/api/v1/bsb', bsbRouter); // Configure our API routes

/**
 * Global error handler
 */
server.use(function (err, req, res, next) {
    if(err.status) {
        res.status(err.status).json({message: err.message});
    } else {
        console.error(err);
        res.status(500).send('Server error');
    }
});

/**
 * Start the app
 */
init(db, sourceFile).then(function() {
    server.listen(8080, function () {
        console.log('BSB service started on port 8080');
    });
}, (err) => {
    console.error('Failed to initialize:', err);
});

/**
 * Cleanup on exit
 */
process.on('exit', function() {
    db.close();
});

process.on('SIGINT', function() {
    process.exit(2); // Calls above exit function
});
