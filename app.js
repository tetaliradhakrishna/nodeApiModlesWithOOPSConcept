let REQURIED_MODULE = require('./public/services/nodemodules.js');

let app = REQURIED_MODULE.express();
// it will get process env varables 
//https://www.npmjs.com/package/dotenv
/**
 * For this crate a .env file and give the key and value  
 * Call the below  path it will  call the procee varabiles
 */
require('dotenv').config()

app.use(REQURIED_MODULE.express.static(__dirname + '/public'));
app.use(REQURIED_MODULE.bodyParser.urlencoded({
  extended: true
}));

// get the app environment from Cloud Foundry
let appEnv = REQURIED_MODULE.cfenv.getAppEnv();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// our Angular code is sending JSON data, but your Express app is parsing it as
// URL encoded data.
app.use(REQURIED_MODULE.bodyParser.json());

let routes = require('./public/routes/routes.js');

app.post('/signUp',routes.signUp);
app.get('/login',routes.login);
app.put('/update',routes.update);
app.get('/getAll',routes.getAll);


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
// app.listen(3000, 'localhost', function() { //test locally
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

