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

it("render value correctly BoutonCommunautee", () => {
    const {getByTestId} = render(<BoutonCommunautee  value='X'/>);
    expect(getByTestId('bouton_communautee_envoyer')).toHaveTextContent("X");

})



