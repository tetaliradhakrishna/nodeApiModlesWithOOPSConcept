let currentDate = function () {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    //console.log(dateAndTime);

    return datetime;
}
let convertDateToInteger = function (data) {
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

let convertIntegerToDate = function (data) {
    //Need to convert the date integer into date format yyyy-mm-dd
    var dateString = '' + data;
    var dateFormat = dateString.substr(0, 4) + "-" + dateString.substr(4, 2) + "-" + dateString.substr(6, 2);
    return new Date(dateFormat);
};

let stringToInteger = function (val) {
    //console.log("val",val);
    var converted = parseInt(val);
    return converted;
}


let uniqueArryaData = function (val) {
    return val.filter(function (value, index) { return val.indexOf(value) == index })

}
let comparingTwoArrays = function (val1, val2) {
    return val1.filter(function (n) { return !this.has(n._id) }, new Set(val2))
}
let fetchCurrentCountData = function () {
    let start = parseInt($.datepicker.formatDate('y', new Date()));
    let end = start + 1;
    return current_year = start + '-' + end;
}

module.exports = {
    currentDate: currentDate,
    convertDateToInteger: convertDateToInteger,
    convertIntegerToDate: convertIntegerToDate,
    stringToInteger: stringToInteger,
    uniqueArryaData: uniqueArryaData,
    comparingTwoArrays: comparingTwoArrays,
    fetchCurrentCountData: fetchCurrentCountData
}