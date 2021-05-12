import React from 'react';
import ReactDOM from 'react-dom';
import AdresseCommande from '../AdresseCommande';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing AdresseCommande", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdresseCommande></AdresseCommande>, div);
})

it("render text correctly AdresseCommande", () => {
    const {getByTestId} = render(<AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder="Rue du Paradis"></AdresseCommande>);
    expect(getByTestId('adresse_commande')).toHaveTextContent("Adresse de livraison");
})

it("matches snapshot 1 AdresseCommande", () => {
    const tree = renderer.create(<AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder="Rue du paradis"></AdresseCommande>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); 
}) 

it("matches snapshot 2 AdresseCommande", () => {
    const tree = renderer.create(<AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder="Rue du paradis"></AdresseCommande>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot();
}) 