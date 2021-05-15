//Utulisation de l outil Mailtrap pour tester le transport SMTP

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d8626fcb5dae54",
        pass: "fc6652bf2875f7"
    }
});

const mailOptions= {
    from: '"Test Server" <test@example.com>',
    to: "nozak001@gmail.com",
    subject: "Email Test",
    text: "This is an email test using Mailtrap.io"
};

transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err);
        return next(err);
    }
    console.log("Info: ", info);
    res.json({
      message: "Email successfully sent."
    });
  });