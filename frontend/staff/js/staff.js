//a remplacer par les données de la db
let afaire = {"V":{"heure_passee" : "18h06", "nom" : "Jean", "contact" : "0000000000", "adresse" : "Rue kiku ojizjroajzrkjkije", "commande" : ["poulet", "viande"], "prix" : 17, "heure_prevue" : "19h00"},
"U":{"heure_passee" : "06h25", "nom" : "Pierre", "contact" : "1111111111", "adresse" : "alkz", "commande" : ["poet"], "prix" : 96, "heure_prevue" : "07h00"},
"T":{"heure_passee" : "07h25", "nom" : "Pirre", "contact" : "11111", "adresse" : "alkfghftz", "commande" : ["ulet"], "prix" : 967, "heure_prevue" : "07h01"},
"S":{"heure_passee" : "08h25", "nom" : "Pire", "contact" : "1111111", "adresse" : "al654kz", "commande" : ["pout"], "prix" : 9, "heure_prevue" : "07h02"},
"R":{"heure_passee" : "09h25", "nom" : "Pie", "contact" : "11111111", "adresse" : "alkazrrez", "commande" : ["polet"], "prix" : 6, "heure_prevue" : "07h03"},
"Q":{"heure_passee" : "21h36", "nom" : "Richard", "contact" : "222222222", "adresse" : "zraz", "commande" : ["poulet"], "prix" : 63.5, "heure_prevue" : "22h15"},
"P":{"heure_passee" : "19h45", "nom" : "Vincent", "contact" : "3333333333", "adresse" : "hrehyer", "commande" : ["olet"], "prix" : 452, "heure_prevue" : "20h30"},
"O":{"heure_passee" : "19h27", "nom" : "Jeanne", "contact" : "4444444444", "adresse" : "gfbvc", "commande" : ["poule"], "prix" : 75.2, "heure_prevue" : "20h00"},
"N":{"heure_passee" : "18h00", "nom" : "Marie", "contact" : "5555555555", "adresse" : "azaez", "commande" : ["pulet"], "prix" : 10, "heure_prevue" : "18h30"},
"M":{"heure_passee" : "17h54", "nom" : "Clem", "contact" : "66666666666", "adresse" : "vpcvht", "commande" : ["poulet"], "prix" : 5, "heure_prevue" : "18h15"},
"L":{"heure_passee" : "14h06", "nom" : "Tom", "contact" : "77777777777", "adresse" : "tiutur", "commande" : ["oulet"], "prix" : 13, "heure_prevue" : "15h45"},
"K":{"heure_passee" : "03h59", "nom" : "Louise", "contact" : "888888888", "adresse" : "hrturaz", "commande" : ["pou"], "prix" : 23.15, "heure_prevue" : "04h30"}};

let encours = {} ;
let envoye = {} ;

//format attendu pour la db : {"heure_passee" : "", "nom" : "", "contact" : "", "adresse" : "", "commande" : "", "prix" : , "heure_prevue" : ""} id pour la commande??




function init() {
	/*let fiche1 = '<table><tr id="titre_colonne_afaire"> <td width=72px>Heure</td> <td width=110px>Nom</td> <td width=110px>Contact</td> \
		<td width=230px>Adresse</td> <td width=85px>Commande</td> <td width=80px>Prix</td> <td width=72px>Heure prévue</td> </tr>' ;*/
	let fiche1 = "<table>"
	let fiche2 = "<table>" ;
	let fiche3 = "<table>" ;
	let liste_aliments ; 
	
	for (val in afaire) {
		liste_aliments = "<select width='95px'>";
		for(let i=0; i<afaire[val]["commande"].length;i++) {
			liste_aliments+= "<option>" + afaire[val]["commande"][i] + "</option>";
		}
		liste_aliments+="</select>";
		
		fiche1 += '<tr id="' + val + '"> <td width=72px>' + afaire[val]['heure_passee'] + '</td> \
		<td width=110px>' + afaire[val]['nom'] + '</td> <td width=110px>' + afaire[val]['contact'] + '</td> \
		<td width=230px>' + afaire[val]['adresse'] + '</td> <td width=95px>' + liste_aliments + '</td> \
		<td width=80px>' + afaire[val]['prix'] + '</td> <td width=72px>' + afaire[val]['heure_prevue'] + '</td> \
		<td><button onclick="envoi_etape1(\'' + val + '\')">suivant</button></td> </tr>';
	}
	fiche1 += "</table>";
	document.getElementById('cadre_afaire').innerHTML = fiche1;
	
	for (val in encours) {
		fiche2 += '<tr id="' + val + '"> <td width=72px>' + encours[val]['heure_passee'] + '</td> \
		<td width=110px>' + encours[val]['nom'] + '</td> <td width=110px>' + encours[val]['contact'] + '</td> \
		<td width=230px>' + encours[val]['adresse'] + '</td> <td width=85px>' + encours[val]['commande'] + '</td> \
		<td width=80px>' + encours[val]['prix'] + '</td> <td width=72px>' + encours[val]['heure_prevue'] + '</td> \
		<td><button onclick="envoi_etape2(\'' + val + '\')">suivant</button></td> </tr>';
	}
	fiche2 += "</table>";
	document.getElementById('cadre_encours').innerHTML = fiche2;
	
	for (val in envoye) {
		fiche3 += '<tr id="' + val + '"> <td width=72px>' + envoye[val]['heure_passee'] + '</td> \
		<td width=110px>' + envoye[val]['nom'] + '</td> <td width=110px>' + envoye[val]['contact'] + '</td> \
		<td width=230px>' + envoye[val]['adresse'] + '</td> <td width=85px>' + envoye[val]['commande'] + '</td> \
		<td width=80px>' + envoye[val]['prix'] + '</td> <td width=72px>' + envoye[val]['heure_prevue'] + '</td> \
		<td><button onclick="envoi_etape3(\'' + val + '\')">suivant</button></td> </tr>';
	}
	fiche3 += "</table>";
	document.getElementById('cadre_envoye').innerHTML = fiche3;
}
//<button class="bouton_afaire" type ="button" onclick="javascript:clem()">envoyer</button>


function envoi_etape1(ligne) {
	encours[ligne] = { ...afaire[ligne]};
	delete afaire[ligne];
	init();
}

function envoi_etape2(ligne) {
	envoye[ligne] = { ...encours[ligne]};
	delete encours[ligne];
	init();
}

function envoi_etape3(ligne) {
	delete envoye[ligne];
	init();
}

function test() {
	return "ok";
}
