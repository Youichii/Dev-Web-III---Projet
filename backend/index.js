const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

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


//Profil Privé

app.get('/api/client/:clientName', (req,res) => {
  const name = req.params.clientName
  const sqlGet = "SELECT * FROM `clients` WHERE `IdClient` = ?"
  db.query(sqlGet, name ,(err, result) => {
    console.log(result)
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


//Modification des informations

app.get('/api/coord/horaires', (req,res) => {
  const sqlGet = "SELECT * FROM `horaires`"
  db.query(sqlGet,(err, result) => {
    res.send(result)
  })
})

app.put('/api/coord/horaires', (req,res) => {
  const lundi = req.body.Lundi
  const mardi = req.body.Mardi
  const mercredi = req.body.Mercredi
  const jeudi = req.body.Jeudi
  const vendredi = req.body.Vendredi
  const samedi = req.body.Samedi
  const dimanche = req.body.Dimanche
  const sqlGet = "UPDATE `horaires` SET `Lundi` = COALESCE(?, `Lundi`), `Mardi` = COALESCE(?, `Mardi`), `Mercredi` = COALESCE(?,`Mercredi`), `Jeudi` = COALESCE(?, `Jeudi`), `Vendredi` = COALESCE(?, `Vendredi`), `Samedi` = COALESCE(?, `Samedi`), `Dimanche`= COALESCE(?, `Dimanche`) WHERE `horaires`.`IdHoraire` = 1;"
  db.query(sqlGet, [lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche], (err, result) => {
  })
  
})

app.put('/api/coord/mail', (req,res) => {
  const mailRest = req.body.mailRest
  const sqlGet = "UPDATE `coordonnees` SET `Mail` = ? WHERE `coordonnees`.`IdRest` = 1;"
  db.query(sqlGet, mailRest, (err,result) => {
    console.log(err)
  })
})

app.put('/api/coord/tel', (req, res) => {
  const telRest = req.body.telRest
  const sqlGet = "UPDATE `coordonnees` SET `Gsm` = ? WHERE `coordonnees`.`IdRest` = 1;"
  db.query(sqlGet, telRest, (err,result) => {
  })
})

app.put('/api/coord/map', (req, res) => {
  const mapRest = req.body.mapRest
  const sqlGet = "UPDATE `coordonnees` SET `Map` = ? WHERE `coordonnees`.`IdRest` = 1;"
  db.query(sqlGet, mapRest, (err,result) => {
  })
})

app.put('/api/coord/address', (req, res) => {
  const streetRest = req.body.streetRest
  const numberRest = req.body.numberRest
  const zipCodeRest = req.body.zipCodeRest
  const cityRest = req.body.cityRest
  const sqlGet = "UPDATE `coordonnees` SET `Rue` = ?, `Numero` = ?, `Zip` = ?, `Ville` = ? WHERE `coordonnees`.`IdRest` = 1;"
  db.query(sqlGet, [streetRest, numberRest, zipCodeRest, cityRest], (err, result) => {

  })
})

app.post('/api/menu',(req, res) => {
  const categorie = req.body.categorie
  const produit = req.body.produit
  const prix = req.body.prix
  const description = req.body.description
  const sqlGet = "INSERT INTO `menu`(`IdCategorie`, `Produit`, `Prix`, `Description`) VALUES (?,?,?,?);"
  db.query(sqlGet, [categorie, produit, prix, description ], (err, result) => {
    if(err){
      res.send(err)
      console.log(err)
    }
  })
})

// Informations

app.get('/api/coordonnees', (req,res) => {
  const sqlGet = "SELECT * FROM `coordonnees`"
  db.query(sqlGet,(err, result) => {
    res.send(result)
  })
})



//Cookie
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

  const sqlVerif = "select IdClient from clients where Mail = ?";
  db.query(sqlVerif, [mail], (err, result) => {
    if (result.length > 0) {
      res.send({message:false});
    }
    else {
      const sqlInsert = "INSERT INTO `clients`(`Nom`, `Prenom`, `Rue`, `Anniversaire`, `Gsm`, `Mail`, `Genre`, `Mdp`, `Numero`, `Zip`, `Ville`, `Newsletter`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      db.query(sqlInsert, [name, firstname, rue, birthday, phone, mail, gender, pwd, numero, postal, ville, neswletter], (err, result) => {
        console.log(err) ;
        res.send(result);
      });
    }
  });
}) 
  
  
 app.get('/api/orders', (req, res) => {
    const sqlInsert = "SELECT RE.IdEtat, RE.IdCommande, RE.IdClient, CL.Prenom, CL.Gsm, CL.Mail, RE.IdEtat, RE.HLivree, RE.DateCom, RE.Commentaire, RE.IdMethode, RE.Rue, RE.Numero, RE.Zip, RE.Ville, cast(sum(CO.Quantite * ME.Prix) AS DECIMAL(10, 1)) as Prix  \
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
    const type = req.body.type;
    const commande  = req.body.commande;
    
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

/*app.get('/api/panier/:idCommande', (req, res) => {
  const idCommande  = req.params.idCommande 

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
    const identifiant = req.params.idClient 
    
    const sqlInsert = "SELECT Mail, Prenom, Rue, Numero, Zip, Ville FROM `clients` where IdClient = ?" ; 
    db.query(sqlInsert, [identifiant], (err, result) => {
      console.log("err : ", err);
      res.send(result) ;
    })
})

app.put('/api/orders', (req, res) => {
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

app.get('/api/user/:utilisateur/order', (req, res) => { 
  const identifiantClient = req.params.utilisateur ;

  const sqlInsert = "select IdCommande \
  FROM reservations \
  WHERE IdClient=? AND IdEtat = 'PAN'";
  db.query(sqlInsert, [identifiantClient], (err, result) => {
    console.log("err : ", err);
    res.send(result) ;
  })

})

app.put('/api/orders/:idCommande/foods/:idProduit', (req, res) => {
    const idCommande = req.params.idCommande;
    const idProduit = req.params.idProduit ; 
    const quantite = req.body.quantite;

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

// NOELLE API

app.get('/api/users', (req, res)=>{
  const sqlSelect = "SELECT * FROM Clients";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
      console.log(result)

  });
});

app.get('/api/genre-stat', (req, res)=>{
  const sqlSelect = "SELECT Genre, COUNT(*) as nombre FROM Clients group by Genre";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
      console.log(result)
  });
});

app.get('/api/localisation-stat', (req, res)=>{
  const sqlSelect = "SELECT Ville, COUNT (*) as nombre  FROM Clients group by Ville";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
      console.log(result)
  });
});

app.get('/api/age-stat', (req, res)=>{
  const sqlSelect = "SELECT Prenom, YEAR(CURDATE()) - YEAR(Anniversaire) AS AgeClient FROM Clients";
  db.query(sqlSelect,(err, result)=>{
      res.send(result);
      console.log(result)
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
  db.query('select * FROM categories ', (err, result) => {
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


//Envoi d'un mail pour valider la commande du panier
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
      user: "nozak001@gmail.com",
      pass:"hellodev0"
  }
});

transporter.verify((err, success)=>{
  err ? console.log (err) : console.log(`Pret à envoyer des mail: ${success}`);
});

app.post("/envoye", function (req, res){
  let mailOptions ={
      from: "nozak001@gmail.com",
      to: "nozak001@gmail.com",
      subject: "test mail",
      text:`${req.body.emailer.message}`
  };
  transporter.sendMail(mailOptions, function (err, data){
      if (err) {
          res.json({
              status:"fail"
          });
      }else {
          console.log ("Email envoyé avec succes !");
          res.json ({status: "Email envoyé"});
      }
  }); 
});

app.post("/api/valider_commande", function (req, res){
  let detail_commande = "", commande_html="", sous_total;
  let data = req.body.commande;
  let total = 0;
  for (let i=0 ; i<data.length; i++){
    detail_commande+= "\t- " + data[i].Produit + "\n\t\t\tquantité : \t\tx" + data[i].Quantite + "\n\t\ttotal : \t\t\t€" + data[i].Prix + "\n\n" ;
    total += data[i].Quantite * data[i].Prix ;
    sous_total = (data[i].Prix * data[i].Quantite).toFixed(2);

    commande_html += `<tr> 
                      <td class="quantite">${data[i].Quantite}</td> 
                      <td class="nom">${data[i].Produit}</td> 
                      <td class="sous_total">€${sous_total}</td> 
                    </tr> `; 
  }
  detail_commande += "\n\n\tTOTAL : " + total + "€";

  let texte_validation = `Bonjour ${req.body.prenom} ! Votre commande a bien été reçue.\nVoici un récapitulatif : \n\n` + detail_commande + ` \
                \n\tHeure où la commande est prête : ${req.body.heure} \n\nNous faisons au plus vite pour vous satisfaire !  \n\n\L'équipe ChickNFish`;
  let texte_html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        .alignement{
          text-align:center;
          color:#545454}
        .signature{
          text-align:center;
          color:#ff8100;
          font-size: 19px;}
        .cadre {
          background-color: #ffe5be;
          margin: 0% 15% 0% 15%;
          padding: 5px 0px 18px 0px;}
        .titre {
            border-bottom: 1px solid;
          padding: 0px 0px 20px 0px;}
        .cadre_titre {
          padding: 0% 16% 0% 16%;}
        @media only screen and (max-width:600px) {
          body .alignement {font-size: 10px;}
          body .commande {font-size: 10px;}
        }
        .commande{
            padding:0px 29% 0px 29%;
          font-size: 20px;
          color:#545454;
          line-height: 33px;}
        .general{
            padding: 0px 0px 0px 42%;
          color:#545454}
        .prix{
          padding: 0px 0px 0px 9%;
          color:#545454}
        .heure{
          padding: 0px 0px 0px 8.3%;
          color:#545454}
        .quantite{
          width:1.5%;}
        .nom{
          width:2%;}
        .sous_total{
          width:0.4%;
          text-align: right;}
      </style>
    </head>
    <body>
      <div class="cadre">
        <div class="alignement cadre_titre"><h1 class="titre">Chick 'N' Fish</h1></div>
        <div class="alignement"><h2>Bonjour ${req.body.prenom} ! Votre commande a bien été reçue.</h2></div>
        <div class="alignement"><h2>Récapitulatif :</h2></div>
        <div class="commande">
          <TABLE> 
            ${commande_html}
          </TABLE> 
        </div>
  
        <div class="general"><h2>TOTAL : <span class="prix">€${total}</span></h2></div>
        <div class="general"><h2>HEURE : <span class="heure">${req.body.heure}</span></h2></div>
        <br>
        <div class="signature"><b>L'équipe Chick 'N' Fish</b></div>
      </div>
    </body>
  </html>`;

  let mailOptions ={
    from: {
      name: "Chick 'N' Fish",
      address: 'nozak001@gmail.com'
    },
    to: req.body.mail,
    subject: "Votre commande a bien été reçue !",
    text:texte_validation,
    html:texte_html
  };

  transporter.sendMail(mailOptions, function (err, data){
      if (err) {
          res.send({status:"fail"});
      }
      else {
          console.log ("Email envoyé avec succes !");
          res.send({status:"success"});
      }
  }); 
});

app.post("/api/commande_prete", function (req, res){

  let texte_utf ;
  let sujet ;
  if (req.body.methode === "LIV"){
    sujet = `Votre commande N${req.body.idcommande} est en route !`;
    texte_utf = `Bonjour ${req.body.prenom} ! \n Votre commande arrive bientôt, nous sommes en route. \nEncore quelques minutes de patience ... \n\n\L'équipe ChickNFish` ;
    texte_html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .alignement{
            text-align:center;
            color:#545454}
          .signature{
            text-align:center;
            color:#ff8100;
            font-size: 17px;}
          .cadre {
            background-color: #ffe5be;
            margin: 0% 15% 0% 15%;
            padding: 5px 0px 18px 0px;}
          .titre {
              border-bottom: 1px solid;
            padding: 0px 0px 20px 0px;}
          .cadre_titre {
            padding: 0% 16% 0% 16%;}
          @media only screen and (max-width:600px) {
            .alignement {font-size: 14px;}
          }
        </style>
      </head>
      <body>
        <div class="cadre">
          <div class="alignement cadre_titre"><h1 class="titre">Chick 'N' Fish</h1></div>
          <div class="alignement"><h2>Bonjour ${req.body.prenom} !</h2></div>
          <div class="alignement"><h3>Votre commande arrive bientôt, nous sommes en route.</h3></div>
          <div class="alignement"><h3>Encore quelques minutes de patience ...</h3></div>
          <br><br>
          <div class="signature"><b>L'équipe Chick 'N' Fish</b></div>
        </div>
      </body>
    </html>`;
  }
  else {
    sujet = `Votre commande N${req.body.idcommande} est prête !`;
    texte_utf = `Bonjour ${req.body.prenom} ! Votre commande est prête à être récupérée, nous vous attendons ! \n\n\L'équipe ChickNFish` ;
    texte_html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .alignement{
            text-align:center;
            color:#545454}
          .signature{
            text-align:center;
            color:#ff8100;
            font-size: 17px;}
          .cadre {
            background-color: #ffe5be;
            margin: 0% 15% 0% 15%;
            padding: 5px 0px 18px 0px;}
          .titre {
              border-bottom: 1px solid;
            padding: 0px 0px 20px 0px;}
          .cadre_titre {
            padding: 0% 16% 0% 16%;}
          @media only screen and (max-width:600px) {
            .alignement {font-size: 14px;}
          }
          .adresse {
            line-height:24px;}
        </style>
      </head>
      <body>
        <div class="cadre">
          <div class="alignement cadre_titre"><h1 class="titre">Chick 'N' Fish</h1></div>
          <div class="alignement"><h2>Bonjour ${req.body.prenom} !</h2></div>
          <div class="alignement"><h3>Votre commande est prête à être récupérée, nous vous attendons !</h3></div><br>
          <div class="alignement adresse"><h4>Traverse d'Esope 4,<br>1348 Ottignies-Louvain-la-Neuve</h4></div>
          <br>
          <div class="signature"><b>L'équipe Chick 'N' Fish</b></div>
        </div>
      </body>
    </html>`;
  }


  let mailOptions ={
      from: {
        name: "Chick 'N' Fish",
        address: 'nozak001@gmail.com'
      },
      to: req.body.email,
      subject: sujet,
      text:texte_utf,
      html:texte_html
  };

  transporter.sendMail(mailOptions, function (err, data){
      if (err) {
          res.send({status:"fail"});
      }
      else {
          console.log ("Email envoyé avec succes !");
          res.send({status:"success"});
      }
  }); 
});