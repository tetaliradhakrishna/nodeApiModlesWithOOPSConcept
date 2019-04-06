let REQURIED_MODULE = require('../services/nodemodules.js');
let config_File = require('../services/configirations.js');
let response_handle = require('../ErrorHandling/errorResponse.js');



exports.createRecord = (url,data,cb)=>{   

     // console.log(url,data);
   REQURIED_MODULE.http({
         uri:url,
         method:"POST",
         headers:config_File.headers,
   	   json:data,
   },(err,res,body)=>{
         if(err){
         	cb(null,err);
         }else{
               if(res.statusCode == 201){
                  cb(null,{code:res.statusCode,message:response_handle.created});
               }if(res.statusCode == 409){
                   cb(null,{code:res.statusCode,message:response_handle.conflit});  
               }
         }
   })
};

exports.fetchLoginData = (url,cb)=>{   

    REQURIED_MODULE.http({
          uri:url,
          method:"GET",
          headers:config_File.headers
    },(err,res,body)=>{
          if(err){
                cb(null,err);
          }else{
                //console.log(body);
                //console.log(res.statusCode,res.statusMessage);
                if(res.statusCode == 200){
                   cb(null,{code:res.statusCode,message:JSON.parse(body)});
                }if(res.statusCode == 409){
                    cb(null,{code:res.statusCode,message:response_handle.conflit});  
                }if(res.statusCode == 400){
                  cb(null,{code:res.statusCode,message:response_handle.bad});  
              }
                
          }
    })
 };

 exports.updateData = (url,data,cb)=>{   

      // console.log(url,data);
    REQURIED_MODULE.http({
          uri:url,
          method:"PUT",
          headers:config_File.headers,
          json:data,
    },(err,res,body)=>{
          if(err){
                cb(null,err);
          }else{
                if(res.statusCode == 201){
                   cb(null,{code:res.statusCode,message:response_handle.update});
                }if(res.statusCode == 409){
                    cb(null,{code:res.statusCode,message:response_handle.conflit});  
                }
               
                
          }
    })
 };

 exports.getAll = (url,cb)=>{   

    REQURIED_MODULE.http({
          uri:url,
          method:"GET",
          headers:config_File.headers
    },(err,res,body)=>{
          if(err){
                cb(null,err);
          }else{
               // console.log(body);
                //console.log(res.statusCode,res.statusMessage);
                if(res.statusCode == 200){
                   cb(null,{code:res.statusCode,message:JSON.parse(body)});
                }if(res.statusCode == 409){
                    cb(null,response_handle.conflit);  
                }if(res.statusCode == 400){
                  cb(null,response_handle.bad);  
              }
                
          }
    })
 };
 