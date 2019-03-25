let CONNECT_DB = require('../modules/db.js');

exports.signUp = (req,res)=>{

    //console.log(req.body);
    CONNECT_DB.createRegisterUser(req.body,(err,result)=>{
          if(err){
	          res.send(err);
          }else{
          	res.send(result);
          }
    })
} 

exports.login = (req,res)=>{

    console.log(req.body);
	res.send('hites');
}

