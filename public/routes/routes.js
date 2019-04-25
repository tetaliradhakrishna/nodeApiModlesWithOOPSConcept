let CONNECT_DB = require('../modules/db.js');
let UTILITIES = require('../utilities/utilities.js')

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

  CONNECT_DB.getLoginData(req.query.id, (err, result) => {
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
  req.body['collection'] = req.body.name;
  CONNECT_DB.updateData(req.body, (err, result) => {
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

  CONNECT_DB.getAll((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })
};


exports.createNewCollection = (req, res) => {

  // console.log(req.body);
  // this route will help to the  create the new collection once the admin is  activate the account 
  // with data  create 

  CONNECT_DB.createNewCollectiond(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.status(result.code).send({ message: result.message });
    }
    res.end();
  })

}