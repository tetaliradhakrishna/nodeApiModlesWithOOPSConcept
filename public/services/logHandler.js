const NODE_MODULES = require('./nodemodules.js');
const UTILIES = require('./utilities.js');
const CONFIGIRATION = require('./configirations.js');

exports.logs = (msg, state, clientguid) => {
    // Scope block 
    let CURRENT_DATE = new Date();

    NODE_MODULES.http({
        uri: CONFIGIRATION.WEB_URL,
        method: 'POST',
        headers: CONFIGIRATION.headers,
        json: {
            msg: msg,
            state: state,
            clientguid: clientguid,
            createdData: CURRENT_DATE,
            dateSearch: UTILIES.convertDateToInteger(CURRENT_DATE)
        }
    }, (err, res, body) => {
        if (err) console.error(" weeb hook http error => ", err)
        else console.log("WebHook Requested to process",res.statusCode)
    })


}
