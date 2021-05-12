const nodemailer = require('nodemailer');
nodemailer.createTestAccount((err, account)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        sescure: false,
        auth:{
            user: "anabel5@ethereal.email",
            pass: "YZ6QezYPZPYSeKX4uv"
        }


    });
});

transporter.send
