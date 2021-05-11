import React from 'react';
import ReactDOM from 'react-dom';
import BoutonCommunautee from '../BoutonCommunautee';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing BoutonCommunautee", () => {
    const button  = document.createElement("button");
    ReactDOM.render(<BoutonCommunautee></BoutonCommunautee>, button)
})

it("render value correctly BoutonPanier", () => {
    const {getByTestId} = render

    (<BoutonCommunautee className="bouton_communautee"  value="Envoyer"
    id = "idEnvoyer"></BoutonCommunautee>);

    expect(getByTestId('bouton_communautee_envoyer')).toHaveAttribute('value', 'Envoyer');
    
})

it("render id correctly BoutonPanier", () => {
    const {getByTestId} = render(<BoutonCommunautee className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonCommunautee>);
    expect(getByTestId('div_bouton_panier')).toHaveAttribute('id', 'idEnvoyer');
})


it("matches snapshot 1 BoutonPanier", () => {
    const tree = renderer.creat(<BoutonCommunautee className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonCommunautee>)
    .toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); 
}) 

// it("matches snapshot 2 BoutonPanier", () => {
//     const tree = renderer.create(<BoutonCommunautee className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>).toJSON(); //convert to a virtualDOM object
//     expect(tree).toMatchSnapshot();
// }) 