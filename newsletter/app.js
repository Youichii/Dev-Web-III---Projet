var express = require ('express');
var swig = require('swig');
var mailer = require('express-mailer');
var path = require('path');
var app = express();
/** hh **/

/**app.use(express.logger());
app.use(express.bodyParser());**/
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', swig.renderFile);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
    res.render('index');
});

app.post('/contact', function (req, res, next){
    mailer.extend(app, {
        from: req.body.email,
        host: "smtp.gmail.com",
        secureConnection: false,
        port: 465,
        transportMethod : 'SMTP',


    });

    app.mailer.send('email', {
        to: 'kh.noelle@gmail.com',
        subject: req.body.subject,
        message: req.body.message
    }, function(err){
        if(err){
            console.log('il y a une erreur');
            return;
        }
        res.send('Email envoyé !');
    });
});

app.listen(3000);
console.log("App is running !"); 