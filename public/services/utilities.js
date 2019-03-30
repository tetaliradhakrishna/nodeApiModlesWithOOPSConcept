var nodeModules = require('../services/nodemodules.js');

var convertDateToInteger = function (data) {
  if (data == undefined || data == null || data == "") {
    return Number();

  } else {


    var dateToConvert = new Date(data);
    // month should return with a leading zero incase of single digit number
    var month = (dateToConvert.getMonth() + 1) <= 9 ? '0' + (dateToConvert.getMonth() + 1) : (dateToConvert.getMonth() + 1);
    var day = dateToConvert.getDate() <= 9 ? '0' + dateToConvert.getDate() : dateToConvert.getDate();
    var formattedDate = dateToConvert.getFullYear().toString() + month + day;
    return Number(formattedDate); //This will convert the date string into number, in order to store in database
  }
};
var convertIntegerToDate = function (data) {
  //Need to convert the date integer into date format yyyy-mm-dd
  var dateString = '' + data;
  var dateFormat = dateString.substr(0, 4) + "-" + dateString.substr(4, 2) + "-" + dateString.substr(6, 2);
  return new Date(dateFormat);
};
var stringToInteger = function (val) {
  //console.log("val",val);
   return parseInt(val);
};
var uniqueArryaData = function (val) {
  //console.log(val);

  return val.filter(function (value, index) {
    return val.indexOf(value) == index
  })
}
var comparingTwoArrays = function (val1, val2) {
  return val1.filter(function (n) {
    return !this.has(n._id)
  }, new Set(val2))
}
let unMatchedTwoArrayResults = function(check,data){
  return check.filter( function(n) { return !this.has(n) }, new Set(data) )
    
}


var shortCodeCoverted = function (val,callback) {
 
  nodeModules.shortUrl.short(val, function (err, url) {
    if(err){
      callback(null,err);
    }else{
      //console.log('@@2',url);
      callback(null,url);
    } 
  });
};
var dateAndTime = function(){
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getFullYear() + " @ " +
    currentdate.getHours() + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds();
    //console.log(dateAndTime);

    return datetime;
}

var parseBody = function(val) {
  return JSON.parse(val) 
}
var stringifyBody = function(val) {
  return JSON.stringify(val) 
};

let integerToparseString =function(val){
  return toString(val)
};
let upercaseToLowerCase = function (val) {
return val.toLowerCase();  
}
let removeWhiteSpaceIn = function (val){
  
if((val.indexOf(' ') >= 0) ===true){
  return val.replace(/\s/g, "");
     
}
else{
  return val;
}
};
module.exports = {
  
  convertDateToInteger: convertDateToInteger,
  convertIntegerToDate: convertIntegerToDate,
  stringToInteger: stringToInteger,
  integerToparseString:integerToparseString,
  uniqueArryaData: uniqueArryaData,
  comparingTwoArrays: comparingTwoArrays,
  shortCodeCoverted: shortCodeCoverted,
  dateAndTime:dateAndTime,
  parseBody:parseBody,
  stringifyBody:stringifyBody,
  unMatchedTwoArrayResults:unMatchedTwoArrayResults,
  upercaseToLowerCase:upercaseToLowerCase,
  removeWhiteSpaceIn:removeWhiteSpaceIn
  

};