const nodemailer = require('nodemailer');

module.exports = {
    send: async() =>{
        const transporter = nodemailer.createTransport({});
        await transporter.sendMail({to: 'nozak001@gmail.com', from: 'nozak001@gmail.com'});
    },
};