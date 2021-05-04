import React from 'react';
import ReactDOM from 'react-dom';
import AdresseCommande from '../AdresseCommande';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

//npm test to start all tests
afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdresseCommande></AdresseCommande>, div)
})

/*it("render button text correctly", () => {
    const {getByTestId} = render(<AdresseCommande color="green" text='Hello' onClick={()=> {console.log("hello")}} ></AdresseCommande>);
    expect(getByTestId('button')).toHaveTextContent("Hello")
})

it("render button color correctly", () => {
    const {getByTestId} = render(<AdresseCommande color="green" text='Hello' onClick={()=> {console.log("hello")}} ></AdresseCommande>);
    expect(getByTestId('button')).toHaveStyle("backgroundColor : green")
})*/

it("matches snapshot 1", () => {
    const tree = renderer.create(<AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder="Rue du paradis"></AdresseCommande>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); 
}) 

it("matches snapshot 2", () => {
    const tree = renderer.create(<AdresseCommande className_div="i_adresse_livraison" fom="adresse_livraison" Text="Adresse de livraison" id="adresse_livraison" name="add_livraison" type="text" placeholder="Rue du paradis"></AdresseCommande>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot();
}) 