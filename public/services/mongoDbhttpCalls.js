
let REQURIED_MODULE = require('../services/nodemodules.js');

exports.createRecord = (url, dataBase, collection, data, cb) => {
	//console.log('URL'+ url);

	REQURIED_MODULE.MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

		let dbo = db.db(dataBase);
		let myobj = data;
		let backStatus;
		dbo.collection(collection).insertOne(myobj, function (err, res) {
			if (err) {

				backStatus = {
					code: 400,
					message: "Oops!.. somthing went wrong " + err
				}

				cb(null, backStatus);
			} else {
				if (res.result.ok == 1) {
					console.log("inside if ");
					backStatus = {
						code: 201,
						message: "Data submitted successfully."
					}
					cb(null, backStatus);
				}
			};
			db.close();
		});
	});
};

exports.fetchLoginData = (url, dataBase, collection, data, cb) => {

	console.log(url,data);
	
	REQURIED_MODULE.MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

		let dbo = db.db(dataBase);
		let myobj = { _id: data };
		let backStatus;

		dbo.collection(collection).findOne(myobj, function (err, res) {
			if (err) {

				backStatus = {
					code: 400,
					message: "Oops!.. somthing went wrong " + err
				}

				cb(null, backStatus);
			} else {
			
					//console.log('res',res);
					backStatus ={
						code:200,
						message:res
					}
					cb(null, backStatus);
				}
		
			db.close();
		});
	});


};
