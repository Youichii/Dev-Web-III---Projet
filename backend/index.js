const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors =  require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'Stegosaure915',
    database:'profilprive'
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.get('/api/users', (req, res)=>{
    const sqlSelect = "SELECT * FROM Clients";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
        console.log(result)

    });
});

app.get('/api/age-stat', (req, res)=>{
    const sqlSelect = "SELECT Genre, COUNT (*) FROM Clients group by Genre";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
        console.log(result)
    });
});

app.get('/api/localisation-stat', (req, res)=>{
    const sqlSelect = "SELECT Ville, COUNT (*) FROM Clients group by Ville";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
        console.log(result)
    });
});

app.listen(3000, ()=>{
    console.log('go to localhost:3000/users')
});