let NODE_DEPENDENCY = require('./nodemodules.js');
let CONFIG = require('./configirations.js');

exports.convertNameToCoords = (data) => {

    var options = {
        provider: 'google',
        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: CONFIG.GOOGLE_API_KEY, // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    let geocoder = NODE_DEPENDENCY.NodeGeocoder(options);
    // Using callback with promiss 
    return new Promise(function (resolve, reject) {
        setTimeout(function () {

            geocoder.geocode(data, function (err, res) {
                if (err) {
                    reject(new Error('Ooops, something broke!', error));
                } else {
                    resolve(res);
                }
            });

        }, 1000)
    }) // new promise closed 

} 