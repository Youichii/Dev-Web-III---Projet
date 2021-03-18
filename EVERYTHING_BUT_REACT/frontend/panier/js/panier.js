let aliments = {"A": {"nom" : "poulet", "quantite" : 2, "prix_unite" : 5}, "B": {"nom" : "viande", "quantite" : 7, "prix_unite" : 8},};


function init_panier() {
	let fiche = "";
	
	for (val in aliments) {
		fiche += "<tr> <td width='400px'>" + aliments[val]["nom"] + "</td> <td width='470px'><input type='numer' value='" + aliments[val]["quantite"] + "'></td> <td>" + aliments[val]["prix_unite"] + "</td> </tr>";
	}
	
	document.getElementById('aliments').innerHTML = fiche;
}
