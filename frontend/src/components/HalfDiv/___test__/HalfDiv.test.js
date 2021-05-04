import React from 'react';
import ReactDOM from 'react-dom';
import HalfDiv from '../HalfDiv';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<HalfDiv />, div)
})

it("apply the right classname for the div", () => {
    const {getByTestId} = render(<HalfDiv divpos="gauche"/>);
    expect(getByTestId('halfdiv')).toHaveClass("gauche")
})

it("Creates snapeshot with same default props", () => {
    const tree = renderer.create(<HalfDiv  divpos='divleft' link='<div></div>'/>).toJSON();
    expect(tree).toMatchSnapshot();
})

it("matches snapshot 1 to see default props", () => {
    const tree = renderer.create(<HalfDiv/>).toJSON();
    expect(tree).toMatchSnapshot();
})