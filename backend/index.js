const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const nodemailer =require('nodemailer')

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'profilprive'
})

const db_test= mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'testapi'
})

app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))  //to avoid CORS policy

app.get('/api/client/:clientName', (req,res) => {
  const name = req.params.clientName
  const sqlGet = "SELECT * FROM `clients` WHERE `IdClient` = ?"
  db.query(sqlGet, name ,(err, result) => {
    res.send(result)
  })
})

app.put('/api/mail', (req, res) => {  
  const clientName = req.body.clientName
  const mail = req.body.mail
  console.log(mail)
  const sqlInsert = "UPDATE `clients` SET `Mail` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [mail, clientName], (err, result) => {
    if(err){
      res.send(err)
    }
  })
})

app.put('/api/phone', (req, res) => {  
  const clientName = req.body.clientName
  const phone= req.body.phone
  const sqlInsert = "UPDATE `clients` SET `Gsm` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [phone, clientName], (err, result) => {
    if(err){
      res.send(err)
    }
  })
})

app.put('/api/username', (req, res) => {  
  const username = req.body.username
  const clientName = req.body.clientName  //to take the variable from the html page
  const sqlInsert = "UPDATE `clients` SET `Pseudo` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [username, clientName], (err, result) => {
  })
})

app.put('/api/adress', (req, res) => {
  const clientName = req.body.clientName  
  const street = req.body.street
  const number = req.body.number 
  const zipCode = req.body.zipCode
  const city = req.body.city
  console.log(clientName, street, number, zipCode, city)
  const sqlInsert = "UPDATE `clients` SET `Rue` = ?, `Numero` = ?, `Zip` = ?, `Ville` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [street, number, zipCode, city, clientName], (err, result) => {
  })
})



// requête GET dans la table communaute pour importer tout le contenu de la communauté 
app.get('/users', (req, res) =>{
  db.query('select * FROM clients ', (err, result) => {
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

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  key:"userId",
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  cookie: { expires: new Date(Date.now() + 1800000) }
}));

app.get('/api/connect-users/:mail/:pwd', function(request, response) {
  console.log("get /api/connect-users/:mail/:pwd");
	var username = request.params.mail;
  //console.log("avant : ", request.session.loggedin);
	var password = request.params.pwd;
	if (username && password) {
		db.query('SELECT IdClient FROM clients WHERE Mail = ? and Mdp = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
        console.log("bon username");
        request.session.user = results ;
        //console.log("user : ", request.session.user);
        response.send(results);
			} 
      else {
        console.log("mauvais username");
				response.send({message:'ko', msg:'Incorrect Username and/or Password!'});
			}			
			response.end();
		});
	} 
  else {
    console.log("vide username");
		response.send({message:'ko', msg:'Please enter Username and Password!'});
		response.end();
	}
});

app.get('/api/connexion', function(request, response){
  console.log("get /api/connexion");
  if (request.session.user){
    response.send({loggedIn:true, user:request.session.user});
  }
  else {
    response.send({loggedIn:false});
  }
});

app.get('/api/deconnexion', function(request, response) {
  console.log("deconnexion");
  request.session.destroy();
  response.send({loggedIn:false});
});


//Connexion
/*app.get('/api/users/:mail/:pwd', (req, res) => {
  const mail = req.params.mail ;
  const pwd = req.params.pwd  ;
  
  const sqlInsert = "SELECT IdClient from clients where Mail = ? and Mdp = ?";
  db.query(sqlInsert, [mail, pwd], (err, result) => {
    console.log(err);
    res.send(result) ;
  })
})*/

app.post('/api/users', (req, res) => {
    console.log("post /api/users");
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
  
    const sqlInsert = "INSERT INTO `clients`(`Nom`, `Prenom`, `Rue`, `Anniversaire`, `Gsm`, `Mail`, `Genre`, `Mdp`, `Numero`, `Zip`, `Ville`, `Newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [name, firstname, rue, birthday, phone, mail, gender, pwd, numero, postal, ville, neswletter], (err, result) => {
      console.log(err) ;
      res.send(result);
    })
  }) 
  
  
 app.get('/api/orders', (req, res) => {
  console.log("get /api/orders");
    const sqlInsert = "SELECT RE.IdEtat, RE.IdCommande, RE.IdClient, CL.Prenom, CL.Gsm, RE.IdEtat, RE.HLivree, RE.DateCom, RE.Commentaire, RE.IdMethode, RE.Rue, RE.Numero, RE.Zip, RE.Ville, cast(sum(CO.Quantite * ME.Prix) AS DECIMAL(10, 1)) as Prix  \
    FROM reservations AS RE  \
    JOIN clients AS CL ON RE.IdClient = CL.IdClient  \
    JOIN commandes AS CO ON RE.IdCommande = CO.IdCommande  \
    JOIN menu AS ME ON CO.IdProduit = ME.IdProduit \
    GROUP BY RE.IdCommande" ;
    db.query(sqlInsert, [], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.put('/api/orders/states', (req, res) => {
  console.log("put /api/orders/states");
    const type = req.body.type
    const commande  = req.body.commande
    
    const sqlInsert = 'UPDATE reservations SET IdEtat = ? where IdCommande = ?';
    db.query(sqlInsert, [type, commande], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {
  console.log("delete /api/orders");
    const commande  = req.body.commande ;

    const sqlInsert1 = "DELETE FROM `commandes` where `IdCommande` = ?;";
    db.query(sqlInsert1, [commande], (err, result) => {
      console.log("erreur : ", err)
      //res.send(result) ;
    })
    const sqlInsert2 = "DELETE FROM `reservations` where `IdCommande` = ?;";
    db.query(sqlInsert2, [commande], (err, result) => {
      console.log("erreur : ", err)
      res.send(result) ;
    })
})

/*app.get('/api/panier/:idCommande', (req, res) => {
  const idCommande  = req.params.idCommande ;

  const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Produit, Quantite \
  FROM `commandes` AS C  \
  JOIN `menu` AS ME ON C.IdProduit = ME.IdProduit   \
  WHERE C.IdCommande = ?";
  db.query(sqlInsert, [idCommande], (err, result) => {
    console.log("erreur : ", err) ;
    res.send(result) ;
  })
})*/


app.get('/api/users/:idClient/address', (req, res) => {
    const identifiant = req.params.idClient ;
    console.log("get /api/users/:idClient");

    const sqlInsert = "SELECT Rue, Numero, Zip, Ville FROM `clients` where IdClient = ?" ; 
    db.query(sqlInsert, [identifiant], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.put('/api/orders', (req, res) => {
  console.log("put /api/orders");
    const commande  = req.body.commande ;
    const methode  = req.body.methode ;
    const commentaire  = req.body.commentaire ;
    const hSelec  = req.body.hSelec ;
    const rue  = req.body.rue ;
    const numero  = req.body.numero ;
    const postal  = req.body.postal ;
    const ville  = req.body.ville ;

    const sqlInsert = "UPDATE reservations \
    SET IdEtat = 'AFA', DateCom=NOW(), HLivree = ?, IdMethode = ?, Commentaire = ?, Rue = ?, Numero = ?, Zip = ?, Ville = ? \
    WHERE IdCommande = ?" ;

    db.query(sqlInsert, [hSelec, methode, commentaire, rue, numero, postal, ville, commande], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/api/orders/users/:identifiantCommande', (req, res) => { 
  console.log("get /api/orders/users/:identifiantCommande");
    const identifiantCommande = req.params.identifiantCommande ;

    const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Quantite, Prix, Produit \
    FROM commandes AS C  \
    JOIN menu AS ME ON C.IdProduit = ME.IdProduit  \
    JOIN reservations AS RE ON C.IdCommande = RE.IdCommande \
    WHERE C.IdCommande = ?";
    db.query(sqlInsert, [identifiantCommande], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })

})

app.put('/api/orders/:idCommande/foods/:idProduit', (req, res) => {
  console.log("put /api/orders/foods");
    const idCommande = req.params.idCommande;
    const idProduit = req.params.idProduit; 
    const quantite = req.body.quantite;  

    const sqlInsert = "UPDATE commandes SET Quantite = ? WHERE IdCommande = ? and IdProduit = ?" ;
    db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/api/hours', (req, res) => {
  console.log("get /api/hours");
    const sqlInsert = "SELECT HLivree \
    FROM reservations \
    GROUP BY HLivree  \
    HAVING COUNT(HLivree)  > 5";
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

app.post('/api/orders', (req, rest)=> {
  const IdCommande = req.body.IdCommande
  const IdClient = req.body.IdClient

  const sqlInsert = 'INSERT INTO reservations (IdClient, IdMethode, DateCom, HLivree, IdEtat, Commentaire, Rue, Numero, Zip, Ville )  VALUES (?,?,?,?,?,?,?,?,?,? )'
  db.query(sqlInsert,[IdClient, null, null, null, 'PAN', null,  null, null, null, null], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})


// POST qui envoie les article dans le panier temporaire
app.post('/api/intermediateBasket', (req, res) => {
  console.log("ajouter un nouvel article")
  const IdCommande = req.body.IdCommande
  const IdProduit = req.body.IdProduit
  const Quantite = req.body.Quantite

  const sqlInsert = "INSERT INTO `commandes` (`IdCommande`, `IdProduit`, `Quantite`) VALUE (?, ?, ?); "
  db.query(sqlInsert, [IdCommande, IdProduit, Quantite], (err, result) => {
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








/*-----------------------------------------------*/
/*API test*/

//Connexion
app.get('/apitest/connect-users/:mail/:pwd', (req, res) => {

  const mail = req.params.mail ;
  const pwd = req.params.pwd  ;
  
  const sqlInsert = "SELECT IdClient from clients where Mail = ? and Mdp = ?";
  db_test.query(sqlInsert, [mail, pwd], (err, result) => {
    console.log(err);
    res.send(result) ;
  })
})

app.post('/apitest/users', (req, res) => {

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

  const sqlInsert = "INSERT INTO `clients`(`Nom`, `Prenom`, `Rue`, `Anniversaire`, `Gsm`, `Mail`, `Genre`, `Mdp`, `Numero`, `Zip`, `Ville`, `Newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  db_test.query(sqlInsert, [name, firstname, rue, birthday, phone, mail, gender, pwd, numero, postal, ville, neswletter], (err, result) => {
    console.log(err) ;
    res.send(result);
  })
}) 
  
 app.get('/apitest/orders', (req, res) => {
  const sqlInsert = "SELECT RE.IdEtat, RE.IdCommande, RE.IdClient, CL.Prenom, CL.Gsm, RE.IdEtat, RE.HLivree, RE.DateCom, RE.Commentaire, RE.IdMethode, RE.Rue, RE.Numero, RE.Zip, RE.Ville, cast(sum(CO.Quantite * ME.Prix) AS DECIMAL(10, 1)) as Prix  \
  FROM reservations AS RE  \
  JOIN clients AS CL ON RE.IdClient = CL.IdClient  \
  JOIN commandes AS CO ON RE.IdCommande = CO.IdCommande  \
  JOIN menu AS ME ON CO.IdProduit = ME.IdProduit \
  GROUP BY RE.IdCommande" ;
  db_test.query(sqlInsert, [], (err, result) => {
    console.log("erreur : ", err);
    res.send(result) ;
  })
})

app.put('/apitest/orders/states', (req, res) => {
  const type = req.body.type
  const commande  = req.body.commande
  
  const sqlInsert = 'UPDATE reservations SET IdEtat = ? where IdCommande = ?';
  db_test.query(sqlInsert, [type, commande], (err, result) => {
    console.log("erreur : ", err);
    res.send(result) ;
  })
})

app.delete('/apitest/orders', (req, res) => {
  const commande  = req.body.commande ;

  const sqlInsert1 = "DELETE FROM `commandes` where `IdCommande` = ?;";
  db_test.query(sqlInsert1, [commande], (err, result) => {
    console.log("erreur : ", err)
  })
  const sqlInsert2 = "DELETE FROM `reservations` where `IdCommande` = ?;";
  db_test.query(sqlInsert2, [commande], (err, result) => {
    console.log("erreur : ", err)
    res.send(result) ;
  })
})

app.get('/apitest/users/:idClient/address', (req, res) => {
  const identifiant = req.params.idClient 
  
  const sqlInsert = "SELECT Rue, Numero, Zip, Ville FROM `clients` where IdClient = ?" ; 
  db_test.query(sqlInsert, [identifiant], (err, result) => {
    console.log("err : ", err);
    res.send(result) ;
  })
})

app.put('/apitest/orders', (req, res) => {
    const commande  = req.body.commande ;
    const methode  = req.body.methode ;
    const commentaire  = req.body.commentaire ;
    const hSelec  = req.body.hSelec ;
    const rue  = req.body.rue ;
    const numero  = req.body.numero ;
    const postal  = req.body.postal ;
    const ville  = req.body.ville ;
    console.log("methode : ", methode);

    const sqlInsert = "UPDATE reservations \
    SET IdEtat = 'AFA', DateCom=NOW(), HLivree = ?, IdMethode = ?, Commentaire = ?, Rue = ?, Numero = ?, Zip = ?, Ville = ? \
    WHERE IdCommande = ?" ;

    db_test.query(sqlInsert, [hSelec, methode, commentaire, rue, numero, postal, ville, commande], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/apitest/orders/users/:identifiantCommande', (req, res) => { 
  const identifiantCommande = req.params.identifiantCommande ;

  const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Quantite, Prix, Produit \
  FROM commandes AS C  \
  JOIN menu AS ME ON C.IdProduit = ME.IdProduit  \
  JOIN reservations AS RE ON C.IdCommande = RE.IdCommande \
  WHERE C.IdCommande = ? ";
  db_test.query(sqlInsert, [identifiantCommande], (err, result) => {
    console.log("err : ", err);
    res.send(result) ;
  })
})

app.put('/apitest/orders/:idCommande/foods/:idProduit', (req, res) => {
  const idCommande = req.params.idCommande;
  const idProduit = req.params.idProduit;  
  const quantite = req.body.quantite;

  const sqlInsert = "UPDATE commandes SET Quantite = ? WHERE IdCommande = ? and IdProduit = ?" ;
  db_test.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
    console.log("err : ", err);
    console.log("resl :" , result.changedRows);
    res.send(result) ;
  })
})

app.get('/apitest/hours', (req, res) => {
  const sqlInsert = "SELECT HLivree \
  FROM reservations \
  GROUP BY HLivree  \
  HAVING COUNT(HLivree)  > 5";
  db_test.query(sqlInsert, [], (err, result) => {
    console.log("err : ", err);
    console.log("result : ", result) ;
    res.send(result) ;
  })
})

app.get('/apitest/users', (req, res) =>{
  db_test.query('select * FROM clients ', (err, result) => {
    console.log("err : ", err);
    res.send(result);
  })
})
 
app.post('/apitest/orders', (req, res)=> {
  const IdClient = req.body.IdClient;
  const IdCommande = req.body.IdCommande;

  const sqlInsert = 'INSERT INTO reservations (IdCommande, IdClient, IdMethode, DateCom, HLivree, IdEtat, Commentaire, Rue, Numero, Zip, Ville )  VALUES (8,?,?,?,?,?,?,?,?,?,?)'
  db_test.query(sqlInsert,[IdClient, null, null, null, 'PAN', null,  null, null, null, null], (err, result) => {
    console.log("err : ", err);
    res.send(result);
  })
})

app.post('/apitest/intermediateBasket', (req, res) => {
  console.log("ajouter un nouvel article")
  const IdCommande = req.body.IdCommande;
  const IdProduit = req.body.IdProduit;
  const Quantite = req.body.Quantite;

  let commandeMax ;
  db_test.query("SELECT MAX(IdCommande) as max FROM reservations",[], (err, resultmax) => {
    commandeMax = resultmax[0].max ;
    const sqlInsert = "INSERT INTO `commandes` (`IdCommande`, `IdProduit`, `Quantite`) VALUE (?, ?, ?); "
    db_test.query(sqlInsert, [commandeMax, IdProduit, Quantite], (err, result) => {
      console.log("err : ", err);
      res.send(result); 
    })
  });
})


//----------API NEWSLETTER------------------

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "nozak001@gmail.com",
        pass:"hellodev0"
    }
});

transporter.verify((err, success)=>{
    err? console.log (err)
    : console.log(`=====Pret à envoyé des mail: ${success}======`);
});

//faire passer les options au transporter et pouvoir enfaire des requêtes

app.post("/envoye", function (req, res){
    const listMail = [];

    const sqlGet = "SELECT Prenom,  Mail FROM Clients";
    db.query(sqlGet, (err, result)=>{
        res.send(result);
        result.forEach(Clients => {
            listMail.push(Clients.Mail);
            clientPrenom = Clients.Prenom;
            return listMail, clientPrenom;
            
            
        })

    });

    let mailOptions ={
        from: "Chick'N'Fish nozak001@gmail.com",
        to: listMail,
        subject:`${req.body.emailer.subject}` ,
        html:`<html>
                <body>
                    <h1>Comment vas-tu aujourd'hui ?</h1>
                    <p> ${req.body.emailer.corps}</p>
                    <h2>${req.body.emailer.message}</h2>
                </body>`
    };


    transporter.sendMail(mailOptions, function (err, data){
        if (err) {
            res.json({
                status:"fail"
            });
        }else {
            console.log ("=====Email envoyé avec succes !===== ");
            res.json ({status: "Email envoyé"});

        }
    }); 
});