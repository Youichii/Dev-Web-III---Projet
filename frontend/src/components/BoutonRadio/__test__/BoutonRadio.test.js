import React from 'react';
import ReactDOM from 'react-dom';
import BoutonRadio from '../BoutonRadio';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

//npm test to start all tests
afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BoutonRadio></BoutonRadio>, div)
})

/*it("render button text correctly", () => {
    const {getByTestId} = render(<BoutonRadio color="green" text='Hello' onClick={()=> {console.log("hello")}} ></BoutonRadio>);
    expect(getByTestId('button')).toHaveTextContent("Hello")
})

it("render button color correctly", () => {
    const {getByTestId} = render(<BoutonRadio color="green" text='Hello' onClick={()=> {console.log("hello")}} ></BoutonRadio>);
    expect(getByTestId('button')).toHaveStyle("backgroundColor : green")
})

it("matches snapshot 1", () => {
    const tree = renderer.create(<BoutonRadio text="save" color="blue"></BoutonRadio>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot(); //create folder __snapshot__
}) // to update a Snapshot if it failed press -u in the terminal

it("matches snapshot 2", () => {
    const tree = renderer.create(<BoutonRadio text="Hello" color="blue"></BoutonRadio>).toJSON(); //convert to a virtualDOM object
    expect(tree).toMatchSnapshot();
}) // creating a 2nd snapshot*/