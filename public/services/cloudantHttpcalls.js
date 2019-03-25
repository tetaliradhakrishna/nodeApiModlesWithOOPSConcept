let REQURIED_MODULE = require('../services/nodemodules.js');

exports.createRecord = (url,data,cb)=>{
   
   REQURIED_MODULE.request({
   	uri:url,
   	json:data,
   },(err,res,body)=>{
         if(err){
         	cb(null,err);
         }else{
         	cb(null,res.statusCode);
         }
   })
}