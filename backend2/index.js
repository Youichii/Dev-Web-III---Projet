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

/*-------------- */


app.pget('/api/users', (req, res) => { // /users/{user-ID}

    const identifiant = req.body.identifiant 
    
    const sqlInsert = "SELECT `address` FROM `clients` where id = ?" ; 
    db.query(sqlInsert, [identifiant], (err, result) => {
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

app.get('/api/orders/users', (req, res) => { // /orders/users/{user-ID}

    const identifiantClient = req.body.identifiantClient 
    
    const sqlInsert = "SELECT PRO.idProduit, nomProduit, prix, quantite FROM `panier` AS P JOIN `commandes` AS C ON P.idCommande = C.idCommande JOIN `produits` AS PRO ON C.idProduit = PRO.idProduit JOIN `reservation` AS R ON C.idCommande = R.idCommande WHERE idClient = ?"
    db.query(sqlInsert, [identifiantClient], (err, result) => {
      console.log(err)
    })

})

app.put('/api/orders/foods', (req, res) => {

    const idCommande = req.body.idCommande  
    const quantite = req.body.quantite  
    
    const sqlInsert = "UPDATE commandes SET quantite = ? WHERE idCommande = ?"
    db.query(sqlInsert, [quantite, idCommande], (err, result) => {
      console.log(err)
    })
})
