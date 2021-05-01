
const mailer = require("nodemailer");
const { Hello } = require("./newsletter.js");
const { Thanks } = require("./commandes.js");

//lancement k

const getEmailData = (to, name, promo, template) => {
    let data = null;

    switch (template) {
        case "newsletter":
            data = {
                from: "Chick'N'fish <nozak001@gmail.com",
                to,
                subject: `Hello ${name}`,
                promo,
                html: `<body style="background-color: grey; height: 1500; width: 800">
                <p style="color: white">${Hello()}</p>
                <p style="color: red ">${promo}</p></body>`
            
            }
            break;

        case "commandes":
            data = {
                from: "Chick'N'Fish <nozak001@gmail.com>",
                to,
                subject: `Hello ${name}`,
                html: `<body>${Thanks()}</body>`
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, promo, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "nozak001@gmail.com",
            pass: "hellodev0"
        }
    })

    const mail = getEmailData(to, name, promo, type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}

module.exports = { sendEmail }