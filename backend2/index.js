const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'nodemysql'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors())  //to avoid CORS policy

app.get('/', (req,res) => {
  res.send("hello");
})

app.post('/api/insert', (req, res) => {

  const username = req.body.Username  //to take the variable from the html page
  
  const sqlInsert = "INSERT INTO `client`(`Username`) VALUES (?)"
  db.query(sqlInsert, [username], (err, result) => {
    console.log(err)
  })
})

/*------------- */

app.get('/api/users', (req, res) => { // /users/{user-ID}

    const identifiant = req.body.identifiant ;
    console.log("id : ", identifiant);

    const sqlInsert = "SELECT `firstname`, `address`, `phone` FROM `clients` where id = ?;";
    db.query(sqlInsert, [identifiant], (err, result) => {
      console.log("erreur : ", err);
      console.log("result : ", result);
    })
})

app.get('/api/orders', (req, res) => {
    
    const sqlInsert = "SELECT * FROM afaire, encours, envoye"
    db.query(sqlInsert, [], (err, result) => {
      console.log(err)
    })
})

app.post('/api/orders', (req, res) => {

    const table = req.body.table
    const commande  = req.body.commande
    
    const sqlInsert = "INSERT INTO `?`(`IDcommande`) VALUES (?)"
    db.query(sqlInsert, [table, commande], (err, result) => {
      console.log(err)
    })
})

app.delete('/api/orders', (req, res) => {

    const table = req.body.table
    const commande  = req.body.commande 
    
    const sqlInsert = "DELETE FROM `?` where `IDcommande` = ?"
    db.query(sqlInsert, [table, commande], (err, result) => {
      console.log(err)
    })
})

