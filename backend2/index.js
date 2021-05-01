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

app.get('/api/get/:cecile', (req,res) => {
  const name = req.params.cecile
  const sqlGet = "SELECT * FROM `client` WHERE `Username` = ?"
  db.query(sqlGet, name ,(err, result) => {
    res.send(result)
  })
})

/*-----*/

app.post('/api/users', (req, res) => {

    const name = req.body.name ;
    const firstname = req.body.firstname ;
    const birthday = req.body.birthday ;
    const phone = req.body.phone ;
    const mail = req.body.mail ;
    const gender = req.body.gender ;
    const pwd = req.body.pwd ;
    const rue = req.body.rue ;
    const numero = req.body.numero ;
    const postal = req.body.postal ;
    const ville = req.body.ville ;
    const neswletter = req.body.nwsletter ;

    console.log("news : ", neswletter);
  
    const sqlInsert = "INSERT INTO `clients`(`nom`, `prenom`, `rue`, `anniversaire`, `gsm`, `mail`, `genre`, `mdp`, `numero`, `postal`, `ville`, `newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [name, firstname, rue, birthday, phone, mail, gender, pwd, numero, postal, ville, neswletter], (err, result) => {
      console.log(err) ;
      res.send(result);
    })
  }) 

app.get('/api/users/:mail/:pwd', (req, res) => {

  const mail = req.params.mail ;
  const pwd = req.params.pwd  ;
  
  const sqlInsert = "SELECT idClient from clients where mail = ? and mdp = ?";
  db.query(sqlInsert, [mail, pwd], (err, result) => {
    console.log(err);
    res.send(result) ;
  })
})




app.get('/api/users/:idClient', (req, res) => {
    const identifiant = req.params.idClient 
    
    const sqlInsert = "SELECT rue, numero, postal, ville FROM `clients` where idClient = ?" ; 
    db.query(sqlInsert, [identifiant], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.post('/api/orders', (req, res) => {
    const commande  = req.body.commande ;
    const methode  = req.body.methode ;
    const commentaire  = req.body.commentaire ;
    const hSelec  = req.body.hSelec ;
    const rue  = req.body.rue ;
    const numero  = req.body.numero ;
    const postal  = req.body.postal ;
    const ville  = req.body.ville ;

    const sqlInsert = "UPDATE reservations \
    SET idEtat = 'AFA', dateCom=NOW(), hLivree = ?, idMethode = ?, commentaire = ?, rue = ?, numero = ?, postal = ?, ville = ? \
    WHERE idCom = ?" ;

    db.query(sqlInsert, [hSelec, methode, commentaire, rue, numero, postal, ville, commande], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {
    const commande  = req.body.commande 
    
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


app.get('/api/orders/users/:identifiantClient', (req, res) => { 
    const identifiantClient = req.params.identifiantClient ;

    const sqlInsert = "SELECT C.idCom, C.idProd, quantite, prix, produit \
    FROM commandes AS C  \
    JOIN menu AS ME ON C.idProd = ME.idProduit  \
    JOIN reservations AS RE ON C.idCom = RE.idCom \
    WHERE idClient = ?";
    db.query(sqlInsert, [identifiantClient], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })

})

app.put('/api/orders/foods', (req, res) => {
    const idCommande = req.body.idCommande
    const idProduit = req.body.idProduit    
    const quantite = req.body.quantite  

    const sqlInsert = "UPDATE commandes SET quantite = ? WHERE idCom = ? and idProd = ?" ;
    db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/api/hours', (req, res) => {
    const sqlInsert = "SELECT hLivree \
    FROM reservations \
    GROUP BY hLivree  \
    HAVING COUNT(hLivree)  > 0";
    db.query(sqlInsert, [], (err, result) => {
      console.log("err : ", err);
      console.log("result : ", result) ;
      res.send(result) ;
    })
})


