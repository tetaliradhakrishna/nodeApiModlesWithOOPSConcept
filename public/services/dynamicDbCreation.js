/**
 * Based on the admin approve this will create the database and view call to the data 
 * 
 */

let sysConfigData = require('../services/configirations.js');
let utilities = require('../services/utilities.js');
let requriedNodeModules = require('./nodemodules.js');

const couch = new requriedNodeModules.NodeCouchDb({
    host: sysConfigData.COUCH_HOST,
    protocol: sysConfigData.COUCH_PROTOCAL,
    port: sysConfigData.COUCH_PORT,
    auth: {
        user: sysConfigData.COUCH_USERNAME,
        pass: sysConfigData.COUCH_PASSWORD
    }
});


module.exports = {

    createDataBase: function (data, callback) {
            
        var NEW_DB = utilities.removeWhiteSpaceIn(utilities.upercaseToLowerCase(data));

        console.log('databasename',NEW_DB);
        couch.createDatabase(NEW_DB).then((res) => {
            //console.log('data', res);
            callback(null,NEW_DB);
            viewCall();
        }, err => {
            //console.log(err);
            console.log(err.body.reason)
            
            callback(null,NEW_DB);
            viewCall();
            // request error occured
        });
        function viewCall(){

            couch.insert(NEW_DB, {
                "_id":sysConfigData.VIEW_ID,
                "views": {
                    'alldocs': {
                        "map": "function (doc) {  emit(doc);}"
                    }
                },
                "language": "javascript"
            });
        }
       
    },
    
    

}

