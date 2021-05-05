import React from 'react';
import ReactDOM from 'react-dom';
import InputInformations from '../InputInformations';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing InputInformation", () => {
    const div = document.createElement("div");
    ReactDOM.render(<InputInformations></InputInformations>, div)
})

it("render id input correctly InputInformation", () => {
    const {getByTestId} = render(<InputInformations className_div="i_champ_adresse" id_input="text_user" id_span="erreur_mail" maxLenght="100"></InputInformations>);
    expect(getByTestId('id_input_info')).toHaveAttribute('id', "text_user");
})

it("render id input correctly InputInformation", () => {
    const {getByTestId} = render(<InputInformations className_div="i_champ_adresse" id_input="text_user" id_span="erreur_mail" maxLenght="100"></InputInformations>);
    expect(getByTestId('id_input_info')).toHaveAttribute('type', "text");
})

it("matches snapshot 1 InputInformation", () => {
    const tree = renderer.create(<InputInformations className_div="i_champ_adresse" id_input="text_user" id_span="erreur_mail" maxLenght="100"></InputInformations>).toJSON();
    expect(tree).toMatchSnapshot(); 
}) 

it("matches snapshot 2 InputInformation", () => {
    const tree = renderer.create(<InputInformations className_div="i_champ_adresse" id_input="text_user" id_span="erreur_mail" maxLenght="100"></InputInformations>).toJSON();
    expect(tree).toMatchSnapshot();
}) 