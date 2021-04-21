const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'projetdev'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors())  

app.get('/menu', (req, res) =>{
  db.query('select * FROM menu ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})