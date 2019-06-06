var multer  = require('multer');
var path  = require('path');

//Image Upload Code Starts
/*Set the Storage Engine*/
const storage=multer.diskStorage({
    destination: './public/uploads/',
    filename:function(req,file,cb){
      //console.log("FIle-->"+file);  
      //console.log("FIleName-->"+file.fieldname);  
      cb(null,file.fieldname +'-'+ Date.now() +path.extname(file.originalname));
    }
  });
  /*Init the Upload Variable*/
  exports.upload=multer({
    storage: storage
  }).single('myImage');
  
  //Image Upload Code Ends