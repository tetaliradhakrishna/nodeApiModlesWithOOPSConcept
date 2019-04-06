let url_config =require('../services/configirations.js');
let DB_CALLS = require('../services/cloudantHttpcalls.js');
let register_userDatabase = '/logins/';
let design_Doc = '_design/s4SolutionsDesDoc/_view/'
let fetch_Query = 'fetchLogin?key=';


exports.createRegisterUser = (data,cb)=>{ 
             // this  accepts  URL + db + collection + data 
           DB_CALLS.createRecord(url_config.urlCloud + register_userDatabase,data, cb)	
};

exports.getLoginData = (data,cb)=>{ 
  // this  accepts  URL + db + collection + data 
DB_CALLS.fetchLoginData(url_config.urlCloud + register_userDatabase + design_Doc + fetch_Query + data , cb)	
};

exports.updateData = (data,cb)=>{ 
  // this  accepts  URL + db + collection + data 
DB_CALLS.updateData(url_config.urlCloud + register_userDatabase +data._id , data , cb)	
};
exports.getAll = (cb)=>{ 
  // this  accepts  URL + db + collection + data 
DB_CALLS.getAll(url_config.urlCloud + register_userDatabase + design_Doc + 'getAllDocs', cb)	
};


