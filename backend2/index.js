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


app.get('/api/orders', (req, res) => {
    const sqlInsert = "SELECT idEncours, typeCommande, AF.idCommande, heure_passee, id, CL.firstname, CL.phone, Lieu, CL.address, CL.numero, CL.postal, CL.ville, heure_reservee, commentaire, cast(sum(CO.quantite * PR.prix) AS DECIMAL(10, 1)) as price \
                    FROM encours AS AF \
                    JOIN reservation AS RE ON AF.idCommande = RE.idCommande \
                    JOIN clients AS CL ON RE.idClient = CL.id \
                    JOIN commandes AS CO ON AF.idCommande = CO.idCommande \
                    JOIN produits AS PR ON CO.idProduit = PR.idProduit \
                    GROUP BY idEncours, CO.idCommande" ;
    db.query(sqlInsert, [], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.post('/api/orders', (req, res) => {
    const type = req.body.type
    const commande  = req.body.commande
    
    const sqlInsert = "UPDATE encours SET typeCommande = ? where idCommande = ?;"
    db.query(sqlInsert, [type, commande], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {
    const commande  = req.body.commande ;

    const sqlInsert = "DELETE FROM `encours` where `IDcommande` = ?"
    db.query(sqlInsert, [commande], (err, result) => {
      console.log("erreur : ", err)
      res.send(result) ;
    })
})

app.get('/api/panier/:idCommande', (req, res) => {
  const idCommande  = req.params.idCommande 
  
  const sqlInsert = "SELECT C.idCommande, PRO.idProduit, nomProduit, quantite \
                  FROM `commandes` AS C \
                  JOIN `produits` AS PRO ON C.idProduit = PRO.idProduit  \
                  WHERE C.idCommande = ?"
  db.query(sqlInsert, [idCommande], (err, result) => {
    console.log("erreur : ", err) ;
    res.send(result) ;
  })
})


