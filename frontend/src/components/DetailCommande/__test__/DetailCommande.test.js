import React from 'react';
import ReactDOM from 'react-dom';
import DetailCommande from '../DetailCommande';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing DetailCommande", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DetailCommande></DetailCommande>, div)
})

it("render button id div correctly DetailCommande", () => {
    const elem = {IdEtat:"PAN", IdCommande:1, IdClient:7, Prenom:"Marie", Gsm:"+32468571325", HLivree:"18:00", DateCom:"2021-05-04 11:47:07", Commande:null, IdMethode:"LIV", Rue:"Rue amz", Numero:"63", Zip:1000, Ville:"Bruge", Prix:409.3};
    const {getByTestId} = render(<DetailCommande informations={elem} type_couleur="couleur_bg1" bg_bouton="var(--bg_ligne1)" onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, "couleur_bg1")} onClick_panier={() => load_panier(elem, "afaire")} onClick_ok={() => ajouter_commandes(elem.IdCommande, "ENC")}></DetailCommande>);
    expect(getByTestId('div_detail_commande')).toHaveAttribute('id', "7");
})


it("matches snapshot 1 DetailCommande", () => {
    const elem = {IdEtat:"PAN", IdCommande:1, IdClient:7, Prenom:"Marie", Gsm:"+32468571325", HLivree:"18:00", DateCom:"2021-05-04 11:47:07", Commande:null, IdMethode:"LIV", Rue:"Rue amz", Numero:"63", Zip:1000, Ville:"Bruge", Prix:409.3};
    const tree = renderer.create(<DetailCommande informations={elem} type_couleur="couleur_bg1" bg_bouton="var(--bg_ligne1)" onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, "couleur_bg1")} onClick_panier={() => load_panier(elem, "afaire")} onClick_ok={() => ajouter_commandes(elem.IdCommande, "ENC")}></DetailCommande>).toJSON(); 
    expect(tree).toMatchSnapshot(); 
}) 

it("matches snapshot 2 DetailCommande", () => {
    const elem = {IdEtat:"PAN", IdCommande:1, IdClient:7, Prenom:"Marie", Gsm:"+32468571325", HLivree:"18:00", DateCom:"2021-05-04 11:47:07", Commande:null, IdMethode:"LIV", Rue:"Rue amz", Numero:"63", Zip:1000, Ville:"Bruge", Prix:409.3};
    const tree = renderer.create(<DetailCommande informations={elem} type_couleur="couleur_bg1" bg_bouton="var(--bg_ligne1)" onMouseOver={() => nouveau_bg(elem.IdClient)} onMouseLeave={() => ancien_bg(elem.IdClient, "couleur_bg1")} onClick_panier={() => load_panier(elem, "afaire")} onClick_ok={() => ajouter_commandes(elem.IdCommande, "ENC")}></DetailCommande>).toJSON(); 
    expect(tree).toMatchSnapshot();
}) 