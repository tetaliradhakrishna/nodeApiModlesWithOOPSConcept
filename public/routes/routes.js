let CONNECT_DB = require('../modules/db.js');
let UTILITIES = require('../utilities/utilities.js')
let NODE_DEPENDENCY = require('../services/nodemodules.js');
let NODE_MAILER = require('../services/mailerService.js');

let IMAGE_UPLOAD = require('../utilities/imageUpload.js');
let CONFIG = require('../services/configirations.js');


exports.signUp = (req, res) => {

  // console.log(req.body);
  req.body['createdDate'] = UTILITIES.currentDate();
  CONNECT_DB.createRegisterUser(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
      //Email Logic
      NODE_MAILER.sendEmail(req.body.email)
    }
    res.end();
  })

}

exports.login = (req, res) => {
  //console.log(req.query.id)

  CONNECT_DB.getLoginData(req.query.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      //console.log(result)
      res.status(result.code).send(result.message);
    }
    res.end();
  })

};

exports.update = (req, res) => {
  // console.log(req.body)
  req.body['ModifiedDate'] = UTILITIES.currentDate();
  CONNECT_DB.updateData(req.body, req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};

exports.getAll = (req, res) => {
  //console.log(req.query.collection)
  // admin send login db calltion if org level  send org level collection 
  //HardCoded COllection Names
  CONNECT_DB.getAll(req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  });
};


exports.deleteRecord = (req, res) => {

  // for delete just pass the  Id 
  CONNECT_DB.delete(req.query.id, req.query.collection, (err, result) => {
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

  req.body['createdDate'] = UTILITIES.currentDate();
  
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
  CONNECT_DB.checkUserExists(req.query.username, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send(result.message);
    }
    res.end();
  })
};

exports.geoCoords = (req, res) => {
  // get the geo coords 
  // based on the mcc/ mnc /lac/ cell id 
  // numbers should be in the number format
  console.log("req" + JSON.stringify(req.body));
  console.log(CONFIG.OPEN_CELLER_ID_URL)

  NODE_DEPENDENCY.http({
    "async": true,
    "crossDomain": true,
    "url": CONFIG.OPEN_CELLER_ID_URL,
    "method": "POST",
    "headers": {},
    "processData": false,
    json: {
      "token": CONFIG.OPEN_CELLER_ID_TOKEN,
      // "radio":"gsm",
      "mcc": req.body.mcc,
      "mnc": req.body.mnc,
      "cells": [
        {
          "lac": req.body.lac,
          "cid": req.body.cid
        }
      ]
    }

  }, (err, response, body) => {
    //console.log(err);
    //console.log(response)
    //console.log(body);
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(body)
      console.log("req" + JSON.stringify(body));
    }

  })

}
exports.activateUserEmail = (req, res) => {
  // console.log(req.body)

  CONNECT_DB.activateUserEmail(req.body, req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};
exports.uploadImage = (req, res) => {
  //Get the Image File Details to be saved in Mongodb...
  console.log("Calling")
  IMAGE_UPLOAD.upload(req, res, (err) => {
    if (err) {
      console.log("Error" + err)
    } else {
      req.file['createdDate'] = UTILITIES.currentDate();
      req.file['simNumber'] = req.file.originalname.split(".jpg")[0];
      console.log("req data from ionic -->" + JSON.stringify(req.file))
      CONNECT_DB.createNewCollection(req.file, req.query.collection, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.status(result.code).send({ message: result.message });
        }
        res.end();
      })
    }
  });
};
exports.fetchUserbasedRecords = (req, res) => {
  // this will  fetch the login abse user 
  console.log(req.query.recordBelongsTo, req.query.collection)
  CONNECT_DB.fetchTheRecords(req.query.recordBelongsTo, req.query.collection, "contactBelongsTo", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};

// sim info

exports.simdata = (req, res) => {
  //console.log(req.query.simNumber)

  CONNECT_DB.fetchTheRecords(req.query.simNumber, req.query.collection, "simNumber", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      //console.log(result)
      res.status(result.code).send(result.message);
    }
    res.end();
  })

};

exports.updateWithSimData = (req, res) => {
  console.log(req.body)
  req.body['ModifiedDate'] = UTILITIES.currentDate();
  CONNECT_DB.updateData(req.body, req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};

exports.createNewSimUser = (req, res) => {

  CONNECT_DB.createNewCollection(req.body, req.query.collection, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
}

exports.fetchEmpImagesData = (req, res) => {
  //console.log(req.query.id)
  // fetch images 
  console.log("images data", req.query.id, req.query.collection)
  CONNECT_DB.fetchTheRecords(req.query.id, req.query.collection, "simNumber", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })

}


let convertnamesTogeoCoords = require('../services/geoCoords.js') //convertNameToCoords


// convert names to geo coords
exports.convertGeoCords = (req, res) => {

  // this is the sync function wait 1 min and process the next value 

console.log("req.query.to",req.query.to,req.query.from);

  url  = "https://maps.googleapis.com/maps/api/directions/json?origin="+ 
          req.query.from +"&destination=" +req.query.to + "&key=" + CONFIG.GOOGLE_API_KEY;

console.log(url);

   NODE_DEPENDENCY.http({
     uri: url,   
     method:""
   },(error,response,body)=>{
           if(error){
             console.log(error);
             
           }else{
             console.log(response.statusCode);
            let parse = JSON.parse(body);
             //console.log(body);
             console.log( "-------------- ",parse);
             res.status(200).send({ message:parse.routes  });
            
           }
   })
  // getOneByOne();
  // async function getOneByOne() {
  //   let coords = {
  //     from: await convertnamesTogeoCoords.convertNameToCoords(req.query.from),
  //     to: await convertnamesTogeoCoords.convertNameToCoords(req.query.to)
  //   }
  //   res.status(200).send({ message: coords });
  // }
}




//89918540400106693985