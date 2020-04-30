const Email = require('email-templates')
const { promisify } = require('util');
const ejs = require("ejs");
const nodemailer=require("nodemailer");
const renderFile = promisify(ejs.renderFile).bind(ejs);
  try {
    let recipientData = [  {
      name: "userA",
      email: "User A", //enter email of user A
      token: "UserA"
  },{
    name: "userB",
    email: "user B", //enter email of user B
    token: "userB"
},
];
      
    let message =  getCustomEmail ('forgot', recipientData, null, "Password Reset Link")
    
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
          user:'sender email',
          pass:'1234'
        }
      })
	 } catch (err) {
	console.log(err);
	}	
  async function getCustomEmail (_template, recipientData, sender, subject){

    try {
        for (let i = 0; i < recipientData.length; i++) {
            
            const data = await renderFile(__dirname + `/templates/${_template}/html.ejs`, recipientData[i]);
            var mainOptions = {
                    from:  "sender email",
                    to: recipientData[i].email,
                    subject,
                    html: data
                };
                smtpTransport.sendMail(mainOptions, function(err, info){
        
                  if (err ){
                     console.log(err);
                  }
                  else {
                   console.log(success);
                  }
                });
          }
        } catch (error) {
        console.log(error)
        
    }
}

