const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'profilprive'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors())  //to avoid CORS policy

app.get('/api/get/:clientName', (req,res) => {
  const name = req.params.clientName
  const sqlGet = "SELECT * FROM `client` WHERE `ClientID` = ?"
  db.query(sqlGet, name ,(err, result) => {
    res.send(result)
    console.log(result)
  })
})

app.put('/api/put', (req, res) => {  
  const username = req.body.username
  const clientName = req.body.clientName  //to take the variable from the html page
  console.log(username, clientName)
  const sqlInsert = "UPDATE `client` SET `Username` = ? WHERE `client`.`ClientID` = ?;"
  db.query(sqlInsert, [username, clientName], (err, result) => {
    console.log(err)
    console.log(result)
  })
})

app.get('/api/avis', (req, res)=>{
  const sqlGet="SELECT Avis, idClients from Avis";
  db.query(sqlGet, (err, result)=>{
    res.send(result)
    console.log(result)
  })
})