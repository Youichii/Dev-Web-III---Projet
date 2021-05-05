import React from 'react';
import ReactDOM from 'react-dom';
import BoutonRadio from '../BoutonRadio';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing BoutonRadio", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoutonRadio></BoutonRadio>, div)
})

it("render value correctly BoutonRadio", () => {
    const {getByTestId} = render(<BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="homme" form="mistercash" text="Mistercash" checked="yes"></BoutonRadio>);
    expect(getByTestId('input_bouton_radio')).toHaveAttribute('value', 'homme');
})

it("render text correctly BoutonRadio", () => {
    const {getByTestId} = render(<BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="homme" form="mistercash" text="Mistercash" checked="yes"></BoutonRadio>);
    expect(getByTestId('label_bouton_radio')).toHaveTextContent("Mistercash");
})

it("render checked correctly BoutonRadio", () => {
    const {getByTestId} = render(<BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="homme" form="mistercash" text="Mistercash" checked="yes"></BoutonRadio>);
    expect(getByTestId('input_bouton_radio')).toHaveAttribute('checked', 'yes');
})

it("matches snapshot 1 BoutonRadio", () => {
    const tree = renderer.create(<BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="homme" form="mistercash" text="Mistercash" checked="yes"></BoutonRadio>).toJSON(); 
    expect(tree).toMatchSnapshot();
})

it("matches snapshot 2 BoutonRadio", () => {
    const tree = renderer.create(<BoutonRadio className_div="i_mistercash" id_div="radio_mistercash" name="myradio2" value="homme" form="mistercash" text="Mistercash" checked="yes"></BoutonRadio>).toJSON(); 
    expect(tree).toMatchSnapshot();
}) 