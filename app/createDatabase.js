const csv           = require('csv-parser');
const fs            = require('fs');

function createDatabase (db, file) {

    db.run(`CREATE TABLE bsb (
        bsbNumber VARCHAR(6) PRIMARY KEY, 
        bankCode VARCHAR(10), 
        bankName VARCHAR(255), 
        address VARCHAR(255), 
        suburb VARCHAR(255), 
        postcode VARCHAR(10), 
        state VARCHAR(100), 
        payments VARCHAR(3)
    )`, function() {

        var stmt = db.prepare("INSERT INTO bsb VALUES (?,?,?,?,?,?,?,?)", function() {

            fs.createReadStream(file)
            .pipe(csv({
                headers: ['bsbNumber', 'bankCode', 'bankName', 'address', 'suburb', 'state', 'postcode', 'payments']
            }))
            .on('data', function(data) {
                stmt.run(data.bsbNumber, data.bankCode, data.bankName, data.address, data.suburb, data.postcode, data.state, data.payments);
            }).on('end', function () {
                stmt.finalize();
            });
        });
    
    });

}

module.exports = createDatabase;