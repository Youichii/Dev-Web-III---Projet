import React from 'react';
import ReactDOM from 'react-dom';
import BoutonPanier from '../BoutonPanier';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

//npm test to start all tests
afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoutonPanier></BoutonPanier>, div)
})

/*it("render button text correctly", () => {
    const {getByTestId} = render(<BoutonPanier color="green" text='Hello' onClick={()=> {console.log("hello")}} ></BoutonPanier>);
    expect(getByTestId('button')).toHaveTextContent("Hello")
})

it("render button color correctly", () => {
    const {getByTestId} = render(<BoutonPanier color="green" text='Hello' onClick={()=> {console.log("hello")}} ></BoutonPanier>);
    expect(getByTestId('button')).toHaveStyle("backgroundColor : green")
})*/

it("matches snapshot 1", () => {
    const tree = renderer.create(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); 
}) 

it("matches snapshot 2", () => {
    const tree = renderer.create(<BoutonPanier className="i_bouton_annuler2" id_div="elem_bouton_annuler2" id_elem="bouton_annuler2" name="bout_annuler2" value="Retour"></BoutonPanier>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot();
}) 