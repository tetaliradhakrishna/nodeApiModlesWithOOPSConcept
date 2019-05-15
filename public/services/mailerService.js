let nodemailer = require('nodemailer');
let toEmail;

exports.sendEmail = (email,cb)=>{ 
    // this  accepts  URL + db + collection + data 
    console.log('User Email-->'+email)    
    toEmail=email;

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'simpliifyit@gmail.com',
          pass: 'simple123'
        }
      });
    
      var mailOptions = {
        from: 'simpliifyit@gmail.com',
        to: toEmail,
        subject: 'Email Verification Link',
        html: '<h1>Please Click the below Link to Activate Your Account!</h1><b><a href="http://localhost:4200/EmailVerification/'+toEmail+'">Activate</a></b>' // html body
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send(err);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info.response);
        }
      });
  };


 