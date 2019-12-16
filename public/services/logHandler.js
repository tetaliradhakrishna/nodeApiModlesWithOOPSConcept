const NODE_MODULES = require('./nodemodules.js');
const UTILIES = require('./utilities.js');
const CONFIGIRATION = require('./configirations.js');


// Config
const DATA_BASE = "s4Solutions";
const DATA_BASE_COLLECTION = "geoLogs";


exports.logs = (msg, state, clientguid) => {
    // Scope block 
    let CURRENT_DATE = new Date();

    NODE_MODULES.MongoClient.connect(CONFIGIRATION.MONGO_DB, function (err, db) {

        var dbo = db.db(DATA_BASE);
        var myobj = {
            msg: msg,
            state: state,
            clientguid: clientguid,
            createdData: CURRENT_DATE,
            dateSearch: UTILIES.convertDateToInteger(CURRENT_DATE)
        }
        dbo.collection(DATA_BASE_COLLECTION).insertMany([myobj], function (err, res) {
            if (err) console.error(" weeb hook http error => ", err)
            else console.log("WebHook Requested to process", res.result)

            // Once store the data close the DB.connection
            db.close();
        });
    });

}

exports.success = "success";
exports.error = "error";
exports.info = "info";