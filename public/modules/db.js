let url = "mongodb://localhost:27017/";
let DB_CALLS = require('../services/mongoDbhttpCalls.js');


exports.createRegisterUser = (data,cb)=>{ 
	         // this  accepts  URL + db + collection + data 
           DB_CALLS.createRecord(url ,'userReg','newSignUp', data, cb)	
};
