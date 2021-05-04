import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './../Chart';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';



it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Chart></Chart>, div)
})

{/*

it ("renders chart correctly",()=>{
    const{getByTestId} =render(<Chart data></Chart>)
    expect (getByTestId('chart')).toHaveTextContent("hey")
})

*/}