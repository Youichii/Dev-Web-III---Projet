import React from 'react';
import ReactDOM from 'react-dom';
import BoutonPanier from '../BoutonPanier';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing BoutonPanier", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoutonPanier></BoutonPanier>, div)
})

it("render value text correctly BoutonPanier", () => {
    const {getByTestId} = render(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>);
    expect(getByTestId('input_bouton_panier')).toHaveAttribute('value', 'Retour');
})

it("render id correctly BoutonPanier", () => {
    const {getByTestId} = render(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>);
    expect(getByTestId('div_bouton_panier')).toHaveAttribute('id', 'elem_bouton_annuler2');
})

it("render type input correctly BoutonPanier", () => {
    const {getByTestId} = render(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>);
    expect(getByTestId('input_bouton_panier')).toHaveAttribute('type', 'button');
})

it("matches snapshot 1 BoutonPanier", () => {
    const tree = renderer.create(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); 
}) 

