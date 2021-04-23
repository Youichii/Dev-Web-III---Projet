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

app.get('/api/get/:cecile', (req,res) => {
  const name = req.params.cecile
  const sqlGet = "SELECT * FROM `client` WHERE `Username` = ?"
  db.query(sqlGet, name ,(err, result) => {
    res.send(result)
  })
})

/*-----*/

app.post('/api/users', (req, res) => {

    const name = req.body.name 
    const firstname = req.body.firstname 
    const address = req.body.address 
    const birthday = req.body.birthday 
    const phone = req.body.phone 
    const mail = req.body.mail 
    const gender = req.body.gender 
    const pwd = req.body.pwd 
    //console.log("name : ", name);
  
    const sqlInsert = "INSERT INTO `clients`(`name`, `firstname`, `address`, `birthday`, `phone`, `mail`, `gender`, `pwd`, numero, postal, ville) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 10, 2030, 'Mons')"
    db.query(sqlInsert, [name, firstname, address, birthday, phone, mail, gender, pwd], (err, result) => {
      console.log(err) ;
      res.send(result);
    })
  }) 