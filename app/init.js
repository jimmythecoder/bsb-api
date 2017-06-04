const csv               = require('csv-parser');
const fs                = require('fs');
const createTableSql    = `
    CREATE TABLE bsb (
    bsbNumber VARCHAR(6) PRIMARY KEY, 
    bankCode VARCHAR(10), 
    bankName VARCHAR(255), 
    address VARCHAR(255), 
    suburb VARCHAR(255), 
    postcode VARCHAR(10), 
    state VARCHAR(100), 
    payments VARCHAR(3) 
)`;
const insertBsbSql      = "INSERT INTO bsb VALUES (?,?,?,?,?,?,?,?)";
const fileHeaders       = ['bsbNumber', 'bankCode', 'bankName', 'address', 'suburb', 'state', 'postcode', 'payments'];

/**
 * Initializes the app by pre-loading the BSB CSV file data into an Sqlite3 memory database table so make searching/retrieving efficent
 * @param {*Database} db Database connection handle
 * @param {*Filename} file Filename of the source BSB csv file we are searching
 */
function init (db, file) {

    return new Promise((resolve, reject) => {

        db.run(createTableSql, function(err) {

            if(err) {
                return reject(err);
            }

            var stmt = db.prepare(insertBsbSql, function(err) {

                if(err) {
                    return reject(err);
                }

                if(!fs.existsSync(file)) {
                    return reject('BSB source file does not exist!');
                }

                fs.createReadStream(file, function(err) {
                    if(err) {
                        return reject(err);
                    }
                })
                .pipe(csv({
                    headers: fileHeaders
                }))
                .on('data', function(data) {
                    stmt.run(data.bsbNumber, data.bankCode, data.bankName, data.address, data.suburb, data.postcode, data.state, data.payments, function(err) {
                        if(err) {
                            return reject(err);
                        }
                    });
                })
                .on('end', function () {
                    stmt.finalize();
                    return resolve();
                })
                .on('error', function(err) {
                    return reject(err);
                });
            });
        
        });
    });
}

module.exports = init;