const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
app.listen(3001, () => {
  console.log("running on port 3001");
})

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))


//Profil Privé

app.get('/api/client/:clientName', (req,res) => {
  const name = req.params.clientName
  const sqlGet = "SELECT * FROM `clients` WHERE `IdClient` = ?"
  db.query(sqlGet, name ,(err, result) => {
    console.log(result)
    res.send(result)
  })
})

app.put('/api/client/mail', (req, res) => {  
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

app.put('/api/client/phone', (req, res) => {  
  const clientName = req.body.clientName
  const phone= req.body.phone
  const sqlInsert = "UPDATE `clients` SET `Gsm` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [phone, clientName], (err, result) => {
    if(err){
      res.send(err)
    }
  })
})

app.put('/api/client/username', (req, res) => {  
  const username = req.body.username
  const clientName = req.body.clientName  //to take the variable from the html page
  const sqlInsert = "UPDATE `clients` SET `Pseudo` = ? WHERE `clients`.`IdClient` = ?;"
  db.query(sqlInsert, [username, clientName], (err, result) => {
  })
})

app.put('/api/client/adress', (req, res) => {
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
  console.log("getting request")
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

/*app.put('/api/coord/map', (req, res) => {
  const mapRest = req.body.mapRest
  const sqlGet = "UPDATE `coordonnees` SET `Map` = ? WHERE `coordonnees`.`IdRest` = 1;"
  db.query(sqlGet, mapRest, (err,result) => {
  })
})*/  //not working because of google policy

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

app.get('/api/coordonnees', (req, res) => {
  const sqlGet = "SELECT * FROM `coordonnees`"
  db.query(sqlGet,(err, result) => {
    res.send(result)
  })
})



/**
 * Crée les différents éléments nécessaires à la création de cookies - sessions
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 */
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
  key:"userId",
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  cookie: { expires: new Date(Date.now() + 1800000) }
}));

/**
 * Récupère l'identifiant du client correspondant aux informations précisées,
 * et crée un cookie si les informations sont correctes
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param  {string} email  mail de l'utilisateur
 * @param  {string} mdp    mot de passe de l'utilisateur
 * @return {object}        l'identifiant du client, sinon un message d'erreur
 */ 
app.get('/api/connect-users/:mail/:pwd', function(request, response) {
	var email = request.params.mail;
	var mdp = request.params.pwd;
	if (email && mdp) {
		db.query('SELECT IdClient FROM clients WHERE Mail = ? and Mdp = ?', [email, mdp], function(error, results, fields) {
			if (results.length > 0) {
        request.session.user = results ;
        response.send(results);
			} 
      else {
				response.send({message:'ko', msg:"Mauvais nom d'utilisateur et/ou de mot de passe"});
			}			
			response.end();
		});
	} 
  else {
		response.send({message:'ko', msg:"Nom d'utilisateur et/ou mot de passe vide"});
		response.end();
	}
});

/**
 * Vérifie si l'utilisateur est connecté
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @return {object} true si utilisateur connecté, false sinon
 */ 
app.get('/api/connexion', function(request, response){
  if (request.session.user){
    response.send({loggedIn:true, user:request.session.user});
  }
  else {
    response.send({loggedIn:false});
  }
});

/**
 * Déconnecte l'utilisateur en supprimant la session
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @return {object} renvoie false pour signifier que l'utilisateur est déconnecté
 */ 
app.get('/api/deconnexion', function(request, response) {
  request.session.destroy();
  response.send({loggedIn:false});
});

/**
 * Ajoute un utilisateur
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method POST
 * @param {string} name
 * @param {string} firstname
 * @param {string} birthday
 * @param {string} phone
 * @param {string} mail
 * @param {string} gender
 * @param {string} pwd
 * @param {string} rue
 * @param {string} numero
 * @param {number} postal
 * @param {string} ville
 * @param {number} neswletter
 * @return {object} renvoie false si le client existe déjà, sinon les codes de retour adéquats
 */ 
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
        res.send(result);
      });
    }
  });
}) 
  
/**
 * Récupère toutes les commandes à faire
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 */ 
app.get('/api/orders', (req, res) => {
  const sqlInsert = "SELECT RE.IdEtat, RE.IdCommande, RE.IdClient, CL.Prenom, CL.Gsm, CL.Mail, RE.IdEtat, RE.HLivree, RE.DateCom, RE.Commentaire, RE.IdMethode, RE.Rue, RE.Numero, RE.Zip, RE.Ville, cast(sum(CO.Quantite * ME.Prix) AS DECIMAL(10, 1)) as Prix  \
  FROM reservations AS RE  \
  JOIN clients AS CL ON RE.IdClient = CL.IdClient  \
  JOIN commandes AS CO ON RE.IdCommande = CO.IdCommande  \
  JOIN menu AS ME ON CO.IdProduit = ME.IdProduit \
  GROUP BY RE.IdCommande" ;
  db.query(sqlInsert, [], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Modifie l'état d'une commande
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method PUT
 * @param {string} type     nouvel état de la commande ; à faire, en cours, envoyé
 * @param {number} commande identifiant de la commande à modifier
 */
app.put('/api/orders/states', (req, res) => {
  const type = req.body.type;
  const commande  = req.body.commande;
  
  const sqlInsert = 'UPDATE reservations SET IdEtat = ? where IdCommande = ?';
  db.query(sqlInsert, [type, commande], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Supprime une commande totale
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method DELETE
 * @param {number} commande identifiant de la commande à supprimer
 */
app.delete('/api/orders', (req, res) => {
  const commande  = req.body.commande ;

  const sqlInsert1 = "DELETE FROM `commandes` where `IdCommande` = ?;";
  db.query(sqlInsert1, [commande], (err, result) => {
  })
  const sqlInsert2 = "DELETE FROM `reservations` where `IdCommande` = ?;";
  db.query(sqlInsert2, [commande], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Récupère les informations liées à l'adresse et au mail d'un client
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {number} identifiant  identifiant du client pour lequel on souhaite récupérer les informations
 */
app.get('/api/users/:idClient/address', (req, res) => {
  const identifiant = req.params.idClient 
  
  const sqlInsert = "SELECT Mail, Prenom, Rue, Numero, Zip, Ville FROM `clients` where IdClient = ?" ; 
  db.query(sqlInsert, [identifiant], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Complète les informations d'une commande qui passe du panier à la la liste des commandes
 * à faire par le staff
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method PUT
 * @param {number} commande       identifiant de la commande à compléter
 * @param {string} methode        méthode ; emporter, livrer
 * @param {string} commentaire    éventuel commentaire à propos de la commande
 * @param {string} hSelec         heure sélectionnée pour récupérer la commande
 * @param {string} rue            rue à laquelle envoyer la commande, si méthode = à livrer
 * @param {string} numero         numéro de maison auquel envoyer la commande, si méthode = à livrer
 * @param {number} postal         code postal auquel envoyer la commande, si méthode = à livrer
 * @param {string} ville          ville à laquelle envoyer la commande, si méthode = à livrer
 * @param {string} typePayement   type de payement utilisé par le client ; liquide, mistercash
 */
app.put('/api/orders', (req, res) => {
  const commande  = req.body.commande ;
  const methode  = req.body.methode ;
  const commentaire  = req.body.commentaire ;
  const hSelec  = req.body.hSelec ;
  const rue  = req.body.rue ;
  const numero  = req.body.numero ;
  const postal  = req.body.postal ;
  const ville  = req.body.ville ;
  const typePayement = req.body.typePayement ;

  const sqlInsert1 = "DELETE FROM `commandes` where `IdCommande` = ? and Quantite = 0" ;
  db.query(sqlInsert1, [commande], (err, result) => {})
  const sqlInsert2 = "DELETE from reservations where IdCommande = ? AND IdCommande not IN (SELECT distinct IdCommande FROM commandes AS CO)" ;
  db.query(sqlInsert2, [commande], (err, result) => {})
  const sqlInsert3 = "UPDATE reservations SET IdEtat = 'AFA', DateCommande=NOW(), HLivree = ?, IdMethode = ?, Commentaire = ?, Rue = ?, Numero = ?, Zip = ?, Ville = ?, PayementLiquide = ? WHERE IdCommande = ?" ;
  db.query(sqlInsert3, [hSelec, methode, commentaire, rue, numero, postal, ville, typePayement, commande], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Récupère tous les produits, ainsi que leur id, leur prix et leur quantité, d'une commande spécifique
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {number} identifiantCommande identifiant de la commande à compléter
 */
app.get('/api/orders/:identifiantCommande', (req, res) => { 
  const identifiantCommande = req.params.identifiantCommande ;

  const sqlInsert = "SELECT C.IdCommande, C.IdProduit, Quantite, Prix, Produit \
  FROM commandes AS C  \
  JOIN menu AS ME ON C.IdProduit = ME.IdProduit  \
  JOIN reservations AS RE ON C.IdCommande = RE.IdCommande \
  WHERE C.IdCommande = ?";
  db.query(sqlInsert, [identifiantCommande], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Récupère la commande du panier d'un client
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 * @param {number} identifiantClient identifiant du client pour lequel récupérer la commande
 */
app.get('/api/orders/users/:utilisateur', (req, res) => { 
  const identifiantClient = req.params.utilisateur ;
  const sqlInsert = "select IdCommande \
  FROM reservations \
  WHERE IdClient=? AND IdEtat = 'PAN'";
  db.query(sqlInsert, [identifiantClient], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Modifie la quantité d'un produit d'une commande spécifique
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method PUT
 * @param {number} idCommande identifiant de la commande spécifique
 * @param {number} idProduit  identifiant du produit pour lequel modifier la quantité
 * @param {number} quantite   nouvelle quantité du produit
 */
app.put('/api/orders/:idCommande/foods/:idProduit', (req, res) => {
  const idCommande = req.params.idCommande;
  const idProduit = req.params.idProduit ; 
  const quantite = req.body.quantite;

  const sqlInsert = "UPDATE commandes SET Quantite = ? WHERE IdCommande = ? and IdProduit = ?" ;
  db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
    res.send(result) ;
  })
})

/**
 * Récupère les heures non disponibles pour récupérer une commande, car elles ont été déjà sélectionnées 
 * trop de fois
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method GET
 */
app.get('/api/hours', (req, res) => {
  const sqlInsert = "SELECT HLivree FROM reservations GROUP BY HLivree HAVING COUNT(HLivree) > 5";
  db.query(sqlInsert, [], (err, result) => {
    res.send(result) ;
  })
})




// Code de la page Communauté ------------------------------------------------------------------------------------------------

/**
 * Récupère à l'aide d'un GET tous les membres de la communauté 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/
app.get('/users', (req, res) =>{
  db.query('select * FROM clients ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET tous les commentaires que le patron à fait sur les clients.  
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/
app.get('/comment', (req, res) =>{
  db.query('select * FROM `commentaires`', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Envoie à l'aide d'un post le  commentaires que le patron à fait sur les clients ainsi que l'id du client en question.   
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method POST
 * @param {Number} récupère l'id du client chez qui le patron a écrit un nouveau 
 * commentaire
 * @param {String} commentaire que le patron a fait sur le client
 **/
app.post('/comment', (req, res) =>{
  const idClient  = req.body.IdClient
  const commentaire  = req.body.Commentaire

  const sqlInsert = " INSERT INTO `commentaires` (`IdClient`, `Commentaire`) VALUES (?, ?);"
  db.query(sqlInsert, [idClient, commentaire], (err, result) => {
    if(err) throw err;  
    res.send(result); 
  })
})

/**
 * Supprime à l'aide d'un DELETE le commentaire que le client veut supprimer en utilisant l'id du client à qui il a été fait ainsi que le commentaire pour le retrouver. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method POST
 * @param {Number} récupère l'id du client chez qui le patron a écrit un nouveau 
 * commentaire
 * @param {String} commentaire que le patron a fait sur le client
 **/
app.delete('/comment', (req, res) => {
  const commentaire  = req.body.Commentaire ;
  const idClient = req.body.IdClient

  const sqlInsert = "DELETE FROM `commentaires` WHERE `Commentaire` = ? && `IdClient`=?"
  db.query(sqlInsert, [commentaire, idClient], (err, result) => {
      if(err) throw err;  
      res.send(result) ;
  })
})

/**
 * Modifie le status d'un client si le patron à modifier son status (Blacklister/Deblacklister)
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method POST
 * @param {Number} récupère l'id du client chez qui le patron a écrit un nouveau 
 * commentaire
 * @param {String} commentaire que le patron a fait sur le client
 **/
app.put('/status', (req, res) =>{
  const Status = req.body.Status
  const IdClient= req.body.IdClient
  
  const sqlInsert = " UPDATE clients SET `Status`= ? WHERE IdClient = ?;" 
  db.query(sqlInsert, [Status, IdClient], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})

/**
 * Récupère à l'aide d'un GET la liste de toutes les villes présentent dans 
 * la DB sans doublons. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/
app.get('/filterNom', (req, res) =>{
  const sqlInsert = "SELECT DISTINCT `Nom` FROM `clients`"
  db.query(sqlInsert,(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})


/**
 * Récupère à l'aide d'un GET la liste de toutes les noms présent dans 
 * la DB sans doublons. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 **/
app.get('/filterVille', (req, res) =>{
  const sqlInsert = "SELECT DISTINCT `Ville` FROM `clients`"
  db.query(sqlInsert,(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET toutes les personnes qui vivent dans la ville passée 
 * en paramètre. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * @param {String} ville que le patron a choisi pour faire son trie  
 * 
 **/
app.get('/usersville/:ville', (req, res) =>{
  const ville = req.params.ville
  
  const sqlInsert = "SELECT * FROM `clients` WHERE `Ville` = ?"
  db.query(sqlInsert,[ville],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET toutes les personnes qui ont le status passé
 * en paramètre. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * @param {String} status que le patron a choisi pour faire son trie  
  **/
app.get('/usersstatus/:status', (req, res) =>{
  const status = req.params.status

  const sqlInsert = "SELECT * FROM `clients` WHERE `Status` = ?"
  db.query(sqlInsert,[status],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET toutes les personnes qui ont le nom passé
 * en paramètre. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * @param {String} nom que le patron a choisi pour faire son trie  
  **/
app.get('/usersnom/:nom', (req,res) =>{
  const nom = req.params.nom

  const sqlInsert = "SELECT * FROM `clients` WHERE `Nom` = ?"
  db.query(sqlInsert,[nom],(err, result) => {
      if(err) throw err ;
      res.send(result);
  })
})


// Code pour la carte Menu  --------------------------------------------------------------------------------------------------


/**
 * Récupère à l'aide d'un GET tout le contenu du menu. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
  **/ 
app.get('/menu', (req, res) =>{
  db.query('select * FROM menu ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET toutes les catégories du menu. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
  **/ 
app.get('/categories', (req, res) =>{
  db.query('select NomCategorie FROM categories ', (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET tous le contenu d'une commande grâce à son Id  
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * @param {String} idcommande de la commande en cours 
  **/ 
app.get('/loadingBasket/:IdCommande', (req, res) =>{
  const idCommande = req.params.id_comm

  const sqlInsert = 'SELECT IdCommande, menu.IdProduit, Quantite, Produit, Prix FROM commandes JOIN menu ON (menu.IdProduit = commandes.IdProduit)'
  db.query(sqlInsert,[idCommande], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET tout le contenu du menu. 
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method POST
 * @param {Number} idCommande de la commande en cours 
 * @param {Number} idNumber du produit à ajouter à la commande 
 * @param {Number} quantite du produit à ajouter à la commande
  **/ 
app.post('/intermediateBasket', (req, res) => {
  const idCommande = req.body.IdCommande
  const idProduit = req.body.IdProduit
  const quantite = req.body.Quantite

  const sqlInsert = "INSERT INTO `commandes` (`IdCommande`, `IdProduit`, `Quantite`) VALUE (?, ?, ?); "
  db.query(sqlInsert, [idCommande, idProduit, quantite], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})



/**
 * Change à l'aide d'un put la quantité d'un produit si il est déjà dans la table
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method PUT
 *  @param {Number} idCommande de la commande en cours 
 * @param {Number} idNumber du produit à ajouter à la commande 
 * @param {Number} quantite du produit à ajouter à la commande
  **/ 
app.put('/changingquantity', (req, res) =>{
  const idCommande = req.body.IdCommande
  const idProduit = req.body.IdProduit
  const quantite = req.body.Quantite
  
  const sqlInsert = " UPDATE `commandes` SET `Quantite` = ? WHERE `IdCommande` = ? && `IdProduit` = ? ;" 
  db.query(sqlInsert, [quantite, idCommande, idProduit], (err, result) => {
    if(err) throw err; 
    res.send(result); 
  })
})

/**
 * Créé une nouvelle entrée dans la table des réservations
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method POST
 * @param {Number} idClient de la personne qui passe la commande 
 * 
  **/ 
app.post('/orders', (req, res) => {
  const idClient = req.body.IdClient

  const sqlInsert = 'INSERT INTO `reservations` (IdCommande, IdMethode, DateCommande, HLivree, IdEtat, Commentaire, Rue, Numero, Zip, Ville )  VALUES (?,?,?,?,?,?,?,?,?,? )'
  db.query(sqlInsert,[idClient, null, null, null, 'PAN', null,  null, null, null, null], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})


// Page Historique -------------------------------------------------------------------------------------------------------

/**
 * Récupère à l'aide d'un GET le contenu de l'historique
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * 
**/ 
app.get('/historical', (req, res) =>{
  const sqlInsert = 'SELECT  reservations.IdClient, reservations.DateCommande, reservations.Ville, GROUP_CONCAT(CONCAT(menu.Produit ," x ", commandes.Quantite) SEPARATOR " ; ") AS Produits, SUM(commandes.Quantite*menu.Prix )AS Total FROM commandes JOIN menu ON menu.IdProduit = commandes.IdProduit JOIN reservations ON reservations.IdCommande = commandes.IdCommande GROUP BY reservations.IdClient, reservations.Ville, reservations.DateCommande'
  db.query(sqlInsert, (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})

/**
 * Récupère à l'aide d'un GET toutes les année différentes contenu dans la db
 * @author Cécile Bonnet <c.bonnet@gmail.com>
 * @method GET
 * 
**/ 
app.get('/year', (req, res) =>{
  const sqlInsert = 'SELECT DISTINCT LEFT (`DateCommande`, 4) as Annee FROM `reservations` WHERE `IdEtat` = ? '
  db.query(sqlInsert,['H'], (err, result) => {
    if(err) throw err ;
    res.send(result);
  })
})


//------------------------ MAIL Newsletter---------------------


/** 
 * Créer un transporter pour les mails et définir les paramètres
**/
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
      user: "nozak001@gmail.com",
      pass:"hellodev0"
  }
});

/** 
 * Verifier que le transporter fonctionne est qu'il est bien prêt à envoyer des mails
 **/
transporter.verify((err, success)=>{
  err? console.log (err)
  : console.log(`=====Pret à envoyer des mail: ${success}======`);
});


/**
 * Post dans le quel on récupère du SQL, on définit les options d'envoie et l'envoie en lui même
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * @method  forEach permet de récupérer les mails et de les ajouter à une liste
 * @param /
 * @returns {list} mailList Renvoie la liste qui contient les adresse mails.
 */
app.post("/envoye", function (req, res){
  const listMail = [];

  const sqlGet = "SELECT Prenom,  Mail FROM Clients where Newsletter =1";
  db.query(sqlGet, (err, result)=>{
      res.send(result);
      result.forEach(Clients => {
          listMail.push(Clients.Mail);
          let clientPrenom = Clients.Prenom;
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

//-------------------Statistiques---------

/**
 * Récupère à l'aide d'un GET les genres de la table Clients et compte le nombre pour chaque genre
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * @method /
 * @param /
 **/
app.get('/api/genre-stat', (req, res)=>{
  const sqlSelect = "SELECT Genre, COUNT(*) as nombre FROM Clients group by Genre";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
      console.log(result)
  });
});


/**
 * Récupère à l'aide d'un GET les Villes de la table Clients et compte le nombre pour chaque ville
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * @method /
 * @param /
 **/
app.get('/api/localisation-stat', (req, res)=>{
  const sqlSelect = "SELECT Ville, COUNT (*) as nombre  FROM Clients group by Ville";
  db.query(sqlSelect, (err, result)=>{
      res.send(result);
      console.log(result)
  });
});

/**
 * Récupère à l'aide d'un GET les ages de la table Clients et compte le nombre pour chaque age
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * @method /
 * @param /
 **/
app.get('/api/age-stat', (req, res)=>{
  const sqlSelect = "SELECT Prenom, YEAR(CURDATE()) - YEAR(Anniversaire) AS AgeClient FROM Clients";
  db.query(sqlSelect,(err, result)=>{
      res.send(result);
      console.log(result)
  })
});


//-------------------Accueil-----------
/** 
 * Récupères les avis et les prénoms des clients de la table Avis
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * @method /
 * @param/
 * @returns /
 **/
app.get('/api/avis', (req, res)=>{
  const sqlGet="SELECT Avis, idClients from Avis";
  db.query(sqlGet, (err, result)=>{
    res.send(result)
    console.log(result)
  })
});




/**
 * Envoie un mail au client lorsqu'il envoie sa commande, afin de lui dire qu'elle a été validée
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method POST
 * @param {number} commande identifiant de la commande spécifique
 * @param {number} prenom   prénom du client qui a passé commande
 * @param {number} heure    heure à laquelle le client souhaite récupérer/recevoir sa commande
 * @param {number} mail     mail du client à qui envoyer le mail   
 */
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
          res.send({status:"success"});
      }
  }); 
});

/**
 * Envoie un mail au client lorsque sa commande est prête, et qu'il va bientôt la recevoir,
 * ou peut venir la chercher.
 * 
 * @author Clémentine Sacré <c.sacre@students.ephec.be>
 * @method POST
 * @param {number} commande identifiant de la commande spécifique
 * @param {number} prenom   prénom du client qui a passé commande
 * @param {number} methode  méthode choisie par le client pour récupérer sa commande ; emporter, livrer
 * @param {number} mail     mail du client à qui envoyer le mail   
 */
app.post("/api/commande_prete", function (req, res){
  let texte_utf, texte_html ;
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
          res.send({status:"success"});
      }
  }); 
});
