import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer  from "react-test-renderer";

//npm test to start all tests
afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div)
})

it("apply the right pattern for the input", () => {
    const {getByTestId} = render(<Input pattern="[0-9]*/.[aAzZ]"/>);
    expect(getByTestId('input')).toHaveAttribute("pattern" , "[0-9]*/.[aAzZ]")
})

it("Right default props : type", () => {
    const {getByTestId} = render(<Input />);
    expect(getByTestId('input')).toHaveAttribute("type" , "text")
})

it("Creates snapeshot with default props", () => {
    const tree = renderer.create(<Input/>).toJSON();
    expect(tree).toMatchSnapshot();
})

