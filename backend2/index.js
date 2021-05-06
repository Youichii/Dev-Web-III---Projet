const express = require('express');
const bodyParser = require ('body-parser');
const mysql = require ('mysql');
const app = express();
const cors = require ('cors');
const nodemailer = require('nodemailer');

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'Stegosaure915',
    database:'profilprive'
});

db.getConnection(function(err){
    if (err) throw err;
    console.log("db connecté")
});

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));


app.get('/api/users', (req, res)=>{
    
    const sqlGet = "SELECT Prenom, Mail  FROM Clients";
    db.query(sqlGet, (err, result)=>{
        res.send(result);
        console.log(result)

    });
});

app.listen(3000, ()=>{
    console.log('go to localhost:3000/users')
});

//-------- Envoyer des emails ----------------------

// créer le transporter et verifier s'il peut envoyer des mails 

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "nozak001@gmail.com",
        pass:"hellodev0"
    }
});

transporter.verify((err, success)=>{
    err? console.log (err)
    : console.log(`=====Pret à envoyé des mail: ${success}======`);
});

//faire passer les options au transporter et pouvoir enfaire des requêtes

app.post("/envoye", function (req, res){
    let mailOptions ={
        from: "nozak001@gmail.com",
        to: "nozak001@gmail.com",
        subject: "test mail",
        text:`${req.body.emailer.message}`
    };


    transporter.sendMail(mailOptions, function (err, data){
        if (err) {
            res.json({
                status:"fail"
            });
        }else {
            console.log ("=====Email envoyé avec succes !===== ");
            res.json ({status: "Email envoyé"});

        }
    }); 
});