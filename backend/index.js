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



// requête GET dans la table communaute pour importer tout le contenu de la communauté 
app.get('/users', (req, res) =>{
  db.query('select * FROM communaute ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// requête GET dans la table commentaire pour importer tous les commentaires sur la communauté
app.get('/comments', (req, res) =>{
    db.query('select * FROM commentaire ', (err, result) => {
      if(err) throw err ;
      res.send(result);
    })
})


// requête PUT pour UPDATE le satus d'un client
app.put('/status', (req, res) =>{
    const Status = req.body.Status
    const Couleur  = req.body.Couleur 
    const Identifiant= req.body.Identifiant
    
  
    const sqlInsert = " UPDATE communaute SET Couleur = ? , Status = ? WHERE Identifiant = ?;" 
  
    db.query(sqlInsert, [Couleur,Status, Identifiant], (err, result) => {
      if(err) throw err; 
      res.send(result); 
    })
})

// requête POST pour écrire les commentaires du patron dans la base de donnée 
app.post('/comment', (req, res) =>{
    const IdUtilisateur = req.body.IdUtilisateur
    const Commentaire  = req.body.Commentaire
    const IdCommentaire  = req.body.IdCommentaire 

    const sqlInsert = " INSERT INTO `commentaire` (`IdUtilisateur`, `Commentaire`, `IdCommentaire`) VALUES (?, ?, ?);"
  
    db.query(sqlInsert, [IdUtilisateur, Commentaire, IdCommentaire], (err, result) => {
      if(err) throw err;  
      res.send(result); 
    })
})

// requête DELETE pour supprimer un commentaire de la table commentaire 
app.delete('/commentaire', (req, res) => {
    const IdCommentaire  = req.body.IdCommentaire ;

    const sqlInsert = "DELETE FROM `commentaire` WHERE `IdCommentaire` = ?"

    db.query(sqlInsert, [IdCommentaire], (err, result) => {
        if(err) throw err;  
        res.send(result) ;
    })
    
})

    
// Requête GET pour trier le contenu de la communauté sur base de la ville 
app.get('/usersville/:ville', (req, res) =>{
   
    const Ville = req.params.ville
   
    const sqlInsert = "SELECT * FROM `communaute` WHERE `Ville` = ?"

    db.query(sqlInsert,[Ville],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})


app.get('/usersstatus/:status', (req, res) =>{
   
    const Status = req.params.status

    const sqlInsert = "SELECT * FROM `communaute` WHERE `Status` = ?"

    db.query(sqlInsert,[Status],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})


app.get('/userstrie1/:status/:ville/:nom', (req, res) =>{
   
    const Status = req.params.valueStatus
    const Ville = req.params.valueVille
    const Nom = req.params.valueNom
    
    const sqlInsert = " SELECT * FROM `communaute` WHERE `Status` = ? && `Ville` = ? && `Nom` = ? "
   
    db.query(sqlInsert,[Status, Ville, Nom],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})

app.get('/usersnom/:nom', (req,res) =>{

    const Nom = req.params.valueNom
 
    const sqlInsert = "SELECT * FROM `communaute` WHERE `Nom` = ?"

    db.query(sqlInsert,[Nom],(err, result) => {
        if(err) throw err ;
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

// requête GET dans la table communaute pour importer tout le contenu de la communauté 
app.get('/users', (req, res) =>{
  db.query('select * FROM communaute ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// requête GET dans la table commentaire pour importer tous les commentaires sur la communauté
app.get('/comments', (req, res) =>{
    db.query('select * FROM commentaire ', (err, result) => {
      if(err) throw err ;
      res.send(result);
    })
})


// requête PUT pour UPDATE le satus d'un client
app.put('/status', (req, res) =>{
    const Status = req.body.Status
    const Couleur  = req.body.Couleur 
    const Identifiant= req.body.Identifiant
    
  
    const sqlInsert = " UPDATE communaute SET Couleur = ? , Status = ? WHERE Identifiant = ?;" 
  
    db.query(sqlInsert, [Couleur,Status, Identifiant], (err, result) => {
      if(err) throw err; 
      res.send(result); 
    })
})

// requête POST pour écrire les commentaires du patron dans la base de donnée 
app.post('/comment', (req, res) =>{
    const IdUtilisateur = req.body.IdUtilisateur
    const Commentaire  = req.body.Commentaire
    const IdCommentaire  = req.body.IdCommentaire 

    const sqlInsert = " INSERT INTO `commentaire` (`IdUtilisateur`, `Commentaire`, `IdCommentaire`) VALUES (?, ?, ?);"
  
    db.query(sqlInsert, [IdUtilisateur, Commentaire, IdCommentaire], (err, result) => {
      if(err) throw err;  
      res.send(result); 
    })
})

// requête DELETE pour supprimer un commentaire de la table commentaire 
app.delete('/commentaire', (req, res) => {
    const IdCommentaire  = req.body.IdCommentaire ;

    const sqlInsert = "DELETE FROM `commentaire` WHERE `IdCommentaire` = ?"

    db.query(sqlInsert, [IdCommentaire], (err, result) => {
        if(err) throw err;  
        res.send(result) ;
    })
    
})

    
// Requête GET pour trier le contenu de la communauté sur base de la ville 
app.get('/usersville/:ville', (req, res) =>{
   
    const Ville = req.params.ville
   
    const sqlInsert = "SELECT * FROM `communaute` WHERE `Ville` = ?"

    db.query(sqlInsert,[Ville],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})


app.get('/usersstatus/:status', (req, res) =>{
   
    const Status = req.params.status

    const sqlInsert = "SELECT * FROM `communaute` WHERE `Status` = ?"

    db.query(sqlInsert,[Status],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})


app.get('/userstrie1/:status/:ville/:nom', (req, res) =>{
   
    const Status = req.params.valueStatus
    const Ville = req.params.valueVille
    const Nom = req.params.valueNom
    
    const sqlInsert = " SELECT * FROM `communaute` WHERE `Status` = ? && `Ville` = ? && `Nom` = ? "
   
    db.query(sqlInsert,[Status, Ville, Nom],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})

app.get('/usersnom/:nom', (req,res) =>{

    const Nom = req.params.valueNom
 
    const sqlInsert = "SELECT * FROM `communaute` WHERE `Nom` = ?"

    db.query(sqlInsert,[Nom],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})


 


// requête GET dans la table menu pour importer tout le contenu du menu 
app.get('/menu', (req, res) =>{
  db.query('select * FROM menu ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// requête GET dans la table categories pour importer toutes les catégories de menu. 
app.get('/categories', (req, res) =>{
  db.query('select NomCat FROM categories ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// // requête POST pour exporter la commande du client 
// app.post('/orders', (req, res) =>{
//   const id_comm = req.body.id_comm
//   const id_client = req.body.id_client 
//   const contenu = req.body.contenu

//   const sqlInsert = "INSERT INTO repartition VALUES (IdComm = ?,IdClient = ?, Methode = ?, Date = ?, HLivraison = ?, Etat = ?, CommClient = ?, AdresseComplete = ?)"

//   db.query(sqlInsert, [id_comm, id_client, 'coucou', 'caca','pip' ,'Temporaire', contenu, ''], (err, result) => {
//     if(err) throw err; 
//     res.send(result); 
//   })
// })


// POST qui envoie les article dans le panier temporaire
app.post('/intermediateBasket', (req, res) => {
  const IdComm = req.body.IdComm
  const Article = req.body.Article
  const Quantite = req.body.Quantite


  const sqlInsert = "INSERT INTO `sauvegarde` (`id_commande`, `article`, `quantite`) VALUE (?, ?, ?); "
  db.query(sqlInsert, [IdComm, Article, Quantite], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})


// PUT qui change la quantite d'un produit dans la DB 
app.put('/changingquantity', (req, res) =>{
  const IdComm = req.body.IdComm
  const Article = req.body.Article
  const Quantite = req.body.Quantite
  
  const sqlInsert = " UPDATE `sauvegarde` SET `quantite` = ? WHERE `id_commande` = ? && `article` = ? ;" 

  db.query(sqlInsert, [Quantite, IdComm, Article], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})

//GET les infos de la commande en cours
app.get('/loadingBasket', (req, res) =>{
  db.query('select * FROM sauvegarde ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})



 
