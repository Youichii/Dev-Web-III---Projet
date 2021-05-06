const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

//mysql.createPool
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "Stegosaure915",
  database : 'profilprive'
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

app.get('/api/get/:clientName', (req,res) => {
  const name = req.params.clientName
  const sqlGet = "SELECT * FROM `client` WHERE `ClientID` = ?"
  db.query(sqlGet, name ,(err, result) => {
    res.send(result)
  })
})

app.put('/api/mail', (req, res) => {  
  const clientName = req.body.clientName
  const mail = req.body.mail
  console.log(mail)
  const sqlInsert = "UPDATE `client` SET `Mail` = ? WHERE `client`.`ClientID` = ?;"
  db.query(sqlInsert, [mail, clientName], (err, result) => {
    if(err){
      res.send(err)
    }
  })
})

app.put('/api/phone', (req, res) => {  
  const clientName = req.body.clientName
  const phone= req.body.phone
  const sqlInsert = "UPDATE `client` SET `Phone` = ? WHERE `client`.`ClientID` = ?;"
  db.query(sqlInsert, [phone, clientName], (err, result) => {
    if(err){
      res.send(err)
    }
  })
})

app.put('/api/put', (req, res) => {  
  const username = req.body.username
  const clientName = req.body.clientName  //to take the variable from the html page
  const sqlInsert = "UPDATE `client` SET `Username` = ? WHERE `client`.`ClientID` = ?;"
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
  const sqlInsert = "UPDATE `client` SET `Street` = ?, `Number` = ?, `Zip` = ?, `City` = ? WHERE `client`.`ClientID` = ?;"
  db.query(sqlInsert, [street, number, zipCode, city, clientName], (err, result) => {
    console.log(err)
  })
})




//Connexion
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  key:"userId",
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  cookie: { expires: new Date(Date.now() + 1800000) }
}));
//cookie: { secure: false, expires: 60*60*24 }

//app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());
app.post('/auth/:mail', function(request, response) {
	var username = request.params.mail;
  console.log("avant : ", request.session.loggedin);
	//var password = request.params.pwd;
	if (username) {
		db.query('SELECT * FROM clients WHERE Mail = ? ', [username], function(error, results, fields) {
			if (results.length > 0) {
        console.log("bon username");
				/*request.session.loggedin = true;
        request.session.username = username;

        console.log("le met bien a true : ", request.session.loggedin);
        console.log("session complete : ", request.session);
        request.session.save();
        request.session.connected = true;
				//response.redirect('/homme');
        
        //response.set('Set-Cookie', 'coco=coco_text'); 
        const oneDayToSeconds = 24 * 60 * 60*1000;
        response.cookie('userId', 'mouwa', { maxAge: 1000000000});
        response.cookie('coco', 'perroquet');
        response.send(results);*/

        request.session.user = results ;
        console.log(request.session.user);
        response.send(results);
			} 
      else {
        console.log("mauvais username");

				response.send({result:'ko', msg:'Incorrect Username and/or Password!'});
			}			
			response.end();
		});
	} 
  else {
    console.log("vide username");
		response.send({result:'ko', msg:'Please enter Username and Password!'});
		response.end();
	}
});

app.get('/login', function(request, response){
  //console.log("request login : ", request);
  //console.log("session login : ", request.session);
  //console.log("user login : ", request.session.user);
  if (request.session.user){
    response.send({loggedIn:true, user:request.session.user});
  }
  else {
    response.send({loggedIn:false});
  }
});



/*app.get('/homme', function(request, response) {
  console.log("bienvenue home");
  console.log("sess : ", request.session.loggedin, " ", request.session.username) ;
  console.log("session complete apres : ", request.session);
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} 
  else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/

app.get('/deco', function(request, response) {
  console.log("deconnexion");
  //request.session = null;
  request.session.destroy();
  response.send({loggedIn:false});
});

app.get('/api/users/:mail/:pwd', (req, res) => {

  const mail = req.params.mail ;
  const pwd = req.params.pwd  ;
  
  const sqlInsert = "SELECT IdClient from clients where Mail = ? and Mdp = ?";
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
  
    const sqlInsert = "INSERT INTO `clients`(`Nom`, `Prenom`, `Rue`, `Anniversaire`, `Gsm`, `Mail`, `Genre`, `Mdp`, `Numero`, `Zip`, `Ville`, `Newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [name, firstname, rue, birthday, phone, mail, gender, pwd, numero, postal, ville, neswletter], (err, result) => {
      console.log(err) ;
      res.send(result);
    })
  }) 
  
  
 app.get('/api/orders', (req, res) => {
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

app.put('/api/orders', (req, res) => {
    const type = req.body.type
    const commande  = req.body.commande
    
    const sqlInsert = 'UPDATE reservations SET IdEtat = ? where IdCommande = ?';
    db.query(sqlInsert, [type, commande], (err, result) => {
      console.log("erreur : ", err);
      res.send(result) ;
    })
})

app.delete('/api/orders', (req, res) => {
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

app.get('/api/panier/:idCommande', (req, res) => {
  const idCommande  = req.params.idCommande 

  const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Produit, Quantite \
  FROM `commandes` AS C  \
  JOIN `menu` AS ME ON C.IdProduit = ME.IdProduit   \
  WHERE C.IdCommande = ?";
  db.query(sqlInsert, [idCommande], (err, result) => {
    console.log("erreur : ", err) ;
    res.send(result) ;
  })
})

app.get('/api/users/:idClient', (req, res) => {
    const identifiant = req.params.idClient 
    
    const sqlInsert = "SELECT Rue, Numero, Zip, Ville FROM `clients` where IdClient = ?" ; 
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
    SET IdEtat = 'AFA', DateCom=NOW(), HLivree = ?, IdMethode = ?, Commentaire = ?, Rue = ?, Numero = ?, Zip = ?, Ville = ? \
    WHERE IdCommande = ?" ;

    db.query(sqlInsert, [hSelec, methode, commentaire, rue, numero, postal, ville, commande], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/api/orders/users/:identifiantClient', (req, res) => { 
    const identifiantClient = req.params.identifiantClient ;

    const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Quantite, Prix, Produit \
    FROM commandes AS C  \
    JOIN menu AS ME ON C.IdProduit = ME.IdProduit  \
    JOIN reservations AS RE ON C.IdCommande = RE.IdCommande \
    WHERE IdClient = ?";
    db.query(sqlInsert, [identifiantClient], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })

})

app.put('/api/orders/foods', (req, res) => {
    const idCommande = req.body.idCommande
    const idProduit = req.body.idProduit    
    const quantite = req.body.quantite  

    const sqlInsert = "UPDATE commandes SET Quantite = ? WHERE IdCommande = ? and IdProduit = ?" ;
    db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.get('/api/hours', (req, res) => {
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

// ------------- Code Cécile--------------------------------------------------------------------------------------------------

// Code de la page Communauté ------------------------------------------------------------------------------------------------

// requête GET dans la table communaute pour importer tout le contenu de la communauté 
app.get('/users', (req, res) =>{
  db.query('select * FROM clients ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// requête GET dans la table commentaire pour importer tous les commentaires sur la communauté
app.get('/comment', (req, res) =>{
    db.query('select * FROM `commentaires`', (err, result) => {
      if(err) throw err ;
      res.send(result);
    })
})

// requête POST pour écrire les commentaires du patron dans la base de donnée 
app.post('/comment', (req, res) =>{
  const IdClient  = req.body.IdClient
  const Commentaire  = req.body.Commentaire

  const sqlInsert = " INSERT INTO `commentaires` (`IdClient`, `Commentaire`) VALUES (?, ?);"

  db.query(sqlInsert, [IdClient, Commentaire], (err, result) => {
    if(err) throw err;  
    res.send(result); 
  })
})

// requête DELETE pour supprimer un commentaire de la table commentaire 
app.delete('/comment', (req, res) => {
  const Commentaire  = req.body.Commentaire ;
  const IdClient = req.body.IdClient

  const sqlInsert = "DELETE FROM `commentaires` WHERE `Commentaire` = ? && `IdClient`=?"

  db.query(sqlInsert, [Commentaire, IdClient], (err, result) => {
      if(err) throw err;  
      res.send(result) ;
  })
  
})


// requête PUT pour UPDATE le satus d'un client
app.put('/status', (req, res) =>{
    const Status = req.body.Status
    const IdClient= req.body.IdClient
    
  
    const sqlInsert = " UPDATE clients SET `Status`= ? WHERE IdClient = ?;" 
  
    db.query(sqlInsert, [Status, IdClient], (err, result) => {
      if(err) throw err; 
      res.send(result); 
    })
})

// Requête GET pour trier le contenu de la communauté sur base de la ville 
app.get('/usersville/:ville', (req, res) =>{
   
    const Ville = req.params.ville
   
    const sqlInsert = "SELECT * FROM `clients` WHERE `Ville` = ?"

    db.query(sqlInsert,[Ville],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})

// Requête GET pour trier le contenu de la communauté sur base du status
app.get('/usersstatus/:status', (req, res) =>{
   
    const Status = req.params.status

    const sqlInsert = "SELECT * FROM `clients` WHERE `Status` = ?"

    db.query(sqlInsert,[Status],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})

// Requête GET pour trier le contenu de la communauté sur base du nom
app.get('/usersnom/:nom', (req,res) =>{

  const Nom = req.params.nom

  const sqlInsert = "SELECT * FROM `clients` WHERE `Nom` = ?"

  db.query(sqlInsert,[Nom],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})

// Requête GET pour trier le contenu de la communauté sur base de la ville et du status 
app.get('/userstrie1/:ville/:status', (req, res) =>{
   
  const Status = req.params.valueStatus
  const Ville = req.params.valueVille
   
  const sqlInsert = " SELECT * FROM `Clients` WHERE `Status` = ? && `Ville` = ?  "
 
  db.query(sqlInsert,[Status, Ville],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})


// Requête GET pour trier le contenu de la communauté sur base du status et du nom 
app.get('/userstrie1/:status/:nom', (req, res) =>{
   
  const Status = req.params.valueStatus
  const Nom = req.params.valueNom
  
  const sqlInsert = " SELECT * FROM `Clients` WHERE `Status` = ? && `Nom` = ? "
 
  db.query(sqlInsert,[Status, Nom],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})


// Requête GET pour trier le contenu de la communauté sur base de la ville et du nom 
app.get('/userstrie1/:ville/:nom', (req, res) =>{
   
  const Ville = req.params.valueVille
  const Nom = req.params.valueNom
  
  const sqlInsert = " SELECT * FROM `Clients` WHERE `Ville` = ? && `Nom` = ? "
 
  db.query(sqlInsert,[Ville, Nom],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})


// Requête GET pour trier le contenu de la communauté sur base de la ville, du nom et du status 
app.get('/userstrie1/:status/:ville/:nom', (req, res) =>{ 
   
    const Status = req.params.valueStatus
    const Ville = req.params.valueVille
    const Nom = req.params.valueNom
    
    const sqlInsert = " SELECT * FROM `Clients` WHERE `Status` = ? && `Ville` = ? && `Nom` = ? "
   
    db.query(sqlInsert,[Status, Ville, Nom],(err, result) => {
        if(err) throw err ;
        res.send(result);
    })
})



// Code pour la carte Menu  --------------------------------------------------------------------------------------------------


// requête GET dans la table menu pour importer tout le contenu du menu 
app.get('/menu', (req, res) =>{
  db.query('select * FROM menu ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// requête GET dans la table categories pour importer toutes les catégories de menu. 
app.get('/categories', (req, res) =>{
  db.query('select NomCategorie FROM categories ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

//GET les infos de la commande en cours
app.get('/loadingBasket/:IdCommande', (req, res) =>{

  const IdCommande = req.params.id_comm

  const sqlInsert = 'select * FROM commandes WHERE `IdCommande` = ?'
  db.query(sqlInsert,[IdCommande], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

// POST pour exporter la commande du client 
// app.post('/orders', (req, res) =>{ 
//   const Ville = null 
//   const Zip = null
//   const Numero = null 
  

//   const sqlInsert = "INSERT INTO reservations (`IdCommande` = ?,`IdClient` = ?, `IdEtat` = ?, `IdMethode`= ?, `DateCommande`= ?, `HLivree`= ?, `Commentaire`= ?, `Rue`= ?, `Numero`= ?, `Zip`= ?, `Ville`= ?) VALUES (?,?,?,?,?,?,?)  "

//   db.query(sqlInsert, [IdCommande, IdClient, IdEtat, IdMethode, DateCommande, HLivree, Commentaire, Rue, Ville, Zip, Numero], (err, result) => {
//     if(err) throw err; 
//     res.send(result); 
//   })
// })


// POST qui envoie les article dans le panier temporaire
app.post('/intermediateBasket', (req, res) => {
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
  console.log("changer la quantite")
  const IdCommande = req.body.IdCommande
  const IdProduit = req.body.IdProduit
  const Quantite = req.body.Quantite
  
  const sqlInsert = " UPDATE `commandes` SET `Quantite` = ? WHERE `IdCommande` = ? && `IdProduit` = ? ;" 

  db.query(sqlInsert, [Quantite, IdCommande, IdProduit], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})


// Page Historique -------------------------------------------------------------------------------------------------------

//GET les infos des commandes terminé

app.get('/historical', (req, res) =>{

  const IdCommande = req.params.id_comm

  const sqlInsert = 'select * FROM reservations WHERE `idEtat` = "H"'
  db.query(sqlInsert,[IdCommande], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

app.get('/historical', (req, res) =>{

  const IdCommande = req.params.id_comm

  const sqlInsert = 'select DateCommande FROM reservations WHERE `idEtat` = "H"'
  db.query(sqlInsert,[IdCommande], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})