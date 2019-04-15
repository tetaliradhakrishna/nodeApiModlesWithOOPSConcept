let CONNECT_DB = require('../modules/db.js');

exports.signUp = (req, res) => {

  // console.log(req.body);
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
  //console.log(req.query.id)

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

