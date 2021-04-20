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

/*----- */

app.get('/api/users', (req, res) => {

  const mail = req.body.mail 
  const pwd = req.body.pwd  
  
  const sqlInsert = "SELECT id from clients where mail = ? and pwd = ?"
  db.query(sqlInsert, [mail, pwd], (err, result) => {
    console.log(err)
  })
})

