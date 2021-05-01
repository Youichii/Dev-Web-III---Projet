
const mailer = require("nodemailer");
const { Hello } = require("./newsletter.js");
const { Thanks } = require("./commandes.js");

const getEmailData = (to, name, promo, template) => {
    let data = null;

    switch (template) {
        case "newsletter":
            data = {
                from: "Chick'N'fish <nozak001@gmail.com",
                to,
                subject: `Hello ${name}`,
                promo,
                html: `
                <!DOCTYPE html>
               <html style="margin: 0; padding: 0;">
               
                   <head>
                       <title>Chick'N'Fish</title>
                   </head>
                    <body style="background-color: rgb(14, 13, 13);
                    margin: 10px auto;
                    padding: 10px;
                    width: 100%;
                    height: 100%;
                    box-shadow: 1px 1px 4px 1px lightgrey;">
                        <div>${Hello()}</div>
                        <div className="promo" 
                        style="border: 1px solid red;  
                        width: 50%; 
                        height:40%;
                        text-align:center">
                        <p style="color:white">${promo}</p>
                        </div>
                    </body>
               
                 </html>
                `
            
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
//module.exports = {getEmailData}
module.exports = { sendEmail }