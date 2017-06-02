const express       = require('express');
var router          = express.Router();

module.exports = function(db) {

    router.param('bsbNumber', function(req, res, next, bsbNumber) {

        if(!/^\d{3}\-?\d{3}$/.test(bsbNumber)) {
            return next('Invalid BSB number');
        }

        db.get("SELECT * FROM bsb WHERE bsbNumber = $bsbNumber", {'$bsbNumber': bsbNumber}, function(err, row) {

            if(!row || err) {
                return next('Not found');
            }

            req.bsb = row;
            next();
        });
    });

    router.get('/:bsbNumber', function(req, res, next) {
        res.json(req.bsb);
    });

    return router;
}
