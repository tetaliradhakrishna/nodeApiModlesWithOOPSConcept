let url_config =require('../services/configirations.js');
let CLOUDANT_DB_CALLS = require('../services/cloudantHttpcalls.js');
let MONGO_DB_CALLS = require('../services/mongoDbhttpCalls.js');
// collection 
let register_userDatabase = 'dblogins';
// DB Name
let Data_Base = "s4Solutions";
let design_Doc = '_design/s4SolutionsDesDoc/_view/'
let fetch_Query = 'fetchLogin?key=';


exports.createRegisterUser = (data,cb)=>{ 
             // this  accepts  URL ,db , collection , data 
             MONGO_DB_CALLS.createRecord(url_config.MONGO_DB,Data_Base,register_userDatabase,data, cb)	
};

exports.getLoginData = (data,cb)=>{ 
  // this  accepts  URL + db + collection + data 

  MONGO_DB_CALLS.fetchLoginData(url_config.MONGO_DB ,Data_Base,register_userDatabase,data, cb)	
};

exports.updateData = (data,collection,cb)=>{ 
  // this  accepts  URL + db + collection + data 
  MONGO_DB_CALLS.updateData(url_config.MONGO_DB ,Data_Base ,collection ,data._id , data , cb)	
};
exports.getAll = (collection,cb)=>{ 
  // this  accepts  URL + db + collection + data 
  // couch get veiw call design_Doc + 'getAllDocs'
  MONGO_DB_CALLS.getAllRecords(url_config.MONGO_DB, Data_Base , collection , cb)	
};

exports.delete = (id,collection,cb)=>{ 
  // this  accepts  URL + db + collection + data 
  // couch get veiw call design_Doc + 'getAllDocs'
  MONGO_DB_CALLS.delete(url_config.MONGO_DB, Data_Base , collection , id, cb)	
};


exports.createNewCollection = (data,collection,cb)=>{ 
  // this  accepts  URL ,db , collection , data 
  MONGO_DB_CALLS.createRecord(url_config.MONGO_DB,Data_Base,collection,data, cb)	
};


