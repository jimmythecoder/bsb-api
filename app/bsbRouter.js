const express   = require('express');
const router    = express.Router();

module.exports = function(db) {

    router.param('bsbNumber', function(req, res, next, bsbNumber) {

        if(!/^\d{3}\-?\d{3}$/.test(bsbNumber)) {
            return next({status: 400, message: 'Invalid BSB number'});
        }

        if(bsbNumber.indexOf('-') === -1) {
            bsbNumber = `${bsbNumber.substr(0,3)}-${bsbNumber.substr(3)}`;
        }

        db.get("SELECT * FROM bsb WHERE bsbNumber = $bsbNumber", {'$bsbNumber': bsbNumber}, function(err, row) {

            if(!row || err) {
                return next({status: 404, message:'Not found'});
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
