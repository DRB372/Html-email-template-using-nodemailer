require('dotenv').config();

const nodemailer = require('nodemailer');
 const hbs = require('nodemailer-express-handlebars');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sender@gmail.com', // TODO: your gmail account 
        pass: '1122' // TODO: your gmail password
    }
});

// Step 2
// transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: "./views/"
// }));
const handlebarOptions = {
    viewEngine: {
      extName: '.hbs',
      partialsDir: 'some/path',
      layoutsDir: './views/',
      defaultLayout: 'index.hbs',
    },
    viewPath: './views/',
    extName: '.hbs',
  };
  
  transporter.use('compile', hbs(handlebarOptions));

// Step 3
let mailOptions = {
    from: 'sender@gmail.com', // TODO: email sender
    to: 'reciever@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    template: 'index',
    context: {
        name: 'Tommyadeniyi'
    } // send extra values to template
};

// Step 4
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log(err);
    }
    return log('Email sent!!!');
});