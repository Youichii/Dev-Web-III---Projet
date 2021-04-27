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


app.get('/api/orders', (req, res) => {
    const sqlInsert = "SELECT RE.idEtat, RE.idCom, RE.idClient, CL.prenom, CL.gsm, RE.idEtat, RE.hLivree, RE.dateCom, RE.commentaire, RE.idMethode, RE.rue, RE.numero, RE.postal, RE.ville, cast(sum(CO.quantite * ME.prix) AS DECIMAL(10, 1)) as prix \
    FROM reservations AS RE \
    JOIN clients AS CL ON RE.idClient = CL.idClient \
    JOIN commandes AS CO ON RE.idCom = CO.idCom \
    JOIN menu AS ME ON CO.idProd = ME.idProduit \
    GROUP BY RE.idCom" ;
    db.query(sqlInsert, [], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.put('/api/orders', (req, res) => {
    const type = req.body.type
    const commande  = req.body.commande
    
    const sqlInsert = 'UPDATE reservations SET idEtat = ? where idCom = ?';
    db.query(sqlInsert, [type, commande], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {
    const commande  = req.body.commande ;

    const sqlInsert1 = "DELETE FROM `commandes` where `idCom` = ?;";
    db.query(sqlInsert1, [commande], (err, result) => {
      console.log("erreur : ", err)
      //res.send(result) ;
    })
    const sqlInsert2 = "DELETE FROM `reservations` where `idCom` = ?;";
    db.query(sqlInsert2, [commande], (err, result) => {
      console.log("erreur : ", err)
      res.send(result) ;
    })
})

app.get('/api/panier/:idCommande', (req, res) => {
  const idCommande  = req.params.idCommande 

  const sqlInsert = "SELECT C.idCom, C.idProd, produit, quantite \
  FROM `commandes` AS C  \
  JOIN `menu` AS ME ON C.idProd = ME.idProduit   \
  WHERE C.idCom = ?";
  db.query(sqlInsert, [idCommande], (err, result) => {
    console.log("erreur : ", err) ;
    res.send(result) ;
  })
})


