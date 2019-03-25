
let REQURIED_MODULE = require('../services/nodemodules.js');

 exports.createRecord = (url,dataBase,collection,data,cb)=>{
	//console.log('URL'+ url);
 
REQURIED_MODULE.MongoClient.connect(url, function(err, db) {

		  var dbo = db.db(dataBase);
		  var myobj = data;

		  dbo.collection(collection).insert(myobj, function(err, res) {
		    if (err){
		    	 throw err;
		    	 message = "Oops!.. somthing went wrong " + err;
		    	 cb(null, message);
		    	 } else{
		    		message =  "1 document inserted " + dataBase + collection;
		 		    //console.log(message);
		 		     if( res.result.ok == 1){
		 		    	    //console.log("inside if ");
		 		    	 res ={
		 		    			statusCode:201,
		 		    			statusMessage:"Data submitted successfully."
		 		    	 }
		 		    	 cb(null,res);
		 		     }
		    	 };
		    	 db.close();
		     });
});



};