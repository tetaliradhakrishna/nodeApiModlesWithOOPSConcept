
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

	console.log(url, data);

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
				backStatus = {
					code: 200,
					message: res
				}
				cb(null, backStatus);
			}

			db.close();
		});
	});


};


exports.getAllRecords = (url, dataBase, collection, cb) => {
	REQURIED_MODULE.MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
		//console.log('why this calling ');
		if (err) throw err;
		var dbo = db.db(dataBase);
		var cursor = dbo.collection(collection).find();

		// Execute the each command, triggers for each document
		let FinalData = [];
		cursor.each(function (err, item) {

			if (item !== null) {
				FinalData.push(item);
				//console.log('still pushing....');
			} else {
				console.log('no more records')
				backStatus = {
					code: 200,
					message: FinalData
				}
				cb(null, backStatus);
			}
			db.close();
		});


		// If the item not is null then the cursor is exhausted/empty and closed

	});
};

exports.updateData = (url, dataBase, collection,id,data, cb) => {
	console.log('updating');
	REQURIED_MODULE.MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dataBase);
		// this is the  existing name feild  
		var myquery = { _id:id };
		// new values passing to the db and updating. 
		var newvalues = { $set: data};
		dbo.collection(collection).updateOne(myquery, newvalues, function(err, res) {
		  if (err) throw err;
		  console.log("1 document updated");
		  backStatus = {
			code: 200,
			message: 'updated'
		}
		  cb(null,backStatus)
		  db.close();
		});
	  });

}