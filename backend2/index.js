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

/*-------------- */


app.get('/api/users/:idClient', (req, res) => {

    const identifiant = req.params.idClient 
    //console.log("id : ", identifiant) ;
    
    const sqlInsert = "SELECT `address` FROM `clients` where id = ?" ; 
    db.query(sqlInsert, [identifiant], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })
})

app.post('/api/orders', (req, res) => {

    const commande  = req.body.commande ;
    const type = req.body.type; 

    const sqlInsert = "INSERT INTO encours (IDcommande, typeCommande) VALUES (?, ?)"
    db.query(sqlInsert, [commande, type], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {

    const commande  = req.body.commande 
    
    const sqlInsert = "DELETE FROM panier where `IDcommande` = ?"
    db.query(sqlInsert, [commande], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })
})

app.delete('/api/orders/del', (req, res) => {

    const commande  = req.body.commande 
    
    const sqlInsert = "DELETE FROM commandes where `IDcommande` = ?"
    db.query(sqlInsert, [commande], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })
})

app.get('/api/orders/users/:identifiantClient', (req, res) => { 

    const identifiantClient = req.params.identifiantClient ;
    //console.log("id : ", identifiantClient) ;
    //console.log("req : ", req) ;
    
    //const sqlInsert = "SELECT PRO.idProduit, nomProduit, prix, quantite FROM `panier` AS P JOIN `commandes` AS C ON P.idCommande = C.idCommande JOIN `produits` AS PRO ON C.idProduit = PRO.idProduit JOIN `reservation` AS R ON C.idCommande = R.idCommande WHERE idClient = ?"
    const sqlInsert = "SELECT C.idCommande, C.idProduit, quantite, prix, nomProduit \
    FROM commandes AS C \
    JOIN produits AS PR ON C.idProduit = PR.idProduit \
    JOIN RESERVATION AS RE ON C.idCommande = RE.idCommande \
    WHERE idClient = ?" 
    db.query(sqlInsert, [identifiantClient], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })

})

app.put('/api/orders/foods', (req, res) => {

    const idCommande = req.body.idCommande
    const idProduit = req.body.idProduit    
    const quantite = req.body.quantite  

    const sqlInsert = "UPDATE commandes SET quantite = ? WHERE idCommande = ? and idProduit = ?"
    db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
      console.log("err : ", err);
      //console.log("result : ", result) ;
      res.send(result) ;
    })
})
