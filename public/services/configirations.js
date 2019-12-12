
module.exports = {
   
   urlCloud:process.env.COUCH_API,
   headers:{ 'Content-Type':'application/json;charset=utf-8'},
   COUCH_HOST:process.env.COUCH_HOST,
   COUCH_PROTOCAL:'http',
   COUCH_PORT:process.env.COUCH_PORT,
   COUCH_USERNAME:'',
   COUCH_PASSWORD:'',
   MONGO_DB:process.env.MONGO_HOST,
   OPEN_CELLER_ID_TOKEN : process.env.OPEN_CELLER_ID_TOKEN,
   OPEN_CELLER_ID_URL:process.env.OPEN_CELLER_ID_URL,
   GOOGLE_API_KEY:process.env.GOOGLE_API_KEY, 
   WEB_URL:process.env.WEB_URL

}