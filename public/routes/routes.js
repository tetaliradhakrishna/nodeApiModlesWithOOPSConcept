let CONNECT_DB = require('../modules/db.js');
let UTILITIES = require('../utilities/utilities.js')
let NODE_DEPENDENCY = require('../services/nodemodules.js');
exports.signUp = (req, res) => {

  // console.log(req.body);
  req.body['createdDate'] = UTILITIES.currentDate();
  CONNECT_DB.createRegisterUser(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })

}

exports.login = (req, res) => {
  //console.log(req.query.id)

  CONNECT_DB.getLoginData(req.query.id,(err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send(result.message);
    }
    res.end();
  })

};

exports.update = (req, res) => {
  // console.log(req.body)
  req.body['ModifiedDate'] = UTILITIES.currentDate();
  req.body['collection'] = req.body.company;
  CONNECT_DB.updateData(req.body,req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};

exports.getAll = (req, res) => {
  //console.log(req.query.id)
  // admin send login db calltion if org level  send org level collection 
  //HardCoded COllection Names
  CONNECT_DB.getAll("emp",(err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};


exports.deleteRecord =(req,res) =>{

  // for delete just pass the  Id 
  CONNECT_DB.delete(req.query.id,req.query.collection,(err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })

}

exports.createNewCollection = (req, res) => {
  

  // console.log(req.body);
  // this route will help to the  create the new collection once the admin is  activate the account 
  // with data  create 

  CONNECT_DB.createNewCollection(req.body, req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
}
exports.checkUserExists = (req, res) => {
  //console.log(req.query.id)
  CONNECT_DB.checkUserExists(req.query.username,(err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send(result.message);
    }
    res.end();
  })
};

exports.geoCoords = (req,res)=>{
  // get the geo coords 
  // based on the mcc/ mnc /lac/ cell id 
  // numbers should be in the number format
 console.log("req"+req)
  NODE_DEPENDENCY.http ({
   "async": true,
   "crossDomain": true,
   "url": "https://us1.unwiredlabs.com/v2/process.php",
   "method": "POST",
   "headers": {},
   "processData": false,
   json: { 
   "token":"64fc55fde26009",
   // "radio":"gsm",
   "mcc":req.body.mcc,
   "mnc":req.body.mnc,
   "cells":[
      {
         "lac":req.body.lac,
         "cid":req.body.cid
      }
   ]
 }
 
  },( err,response,body )=>{
    //console.log(err);
    //console.log(response)
   //console.log(body);
   if(err){
     res.send(err);
   }else{
     res.status(200).send(body)
   }
  
  })
 
 } 