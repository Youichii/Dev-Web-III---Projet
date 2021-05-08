import React from 'react';
import ReactDOM from 'react-dom';
import FormMail from './FormMail';
import {render, fireEvent, cleanup, screen, getByTestId, getByText} from '@testing-library/react';

it ("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<FormMail/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it ("FormMail loads with initial state of 0",()=>{
    const {container} = render (<FormMail/>);
    const formValue = getByTestId(container, "promo-msg");
    expect(formValue.textContent).toBe("");
});

it ("form can be submittes & input fields work",()=>{
    const mailSubmit = jest.fn();
    const {debug, queryByTestId} = render (<FormMail SubmitEmail = {mailSubmit}/>);
    fireEvent.change(queryByTestId("promo-msg"), {target: {value: 'super promo'}});
    fireEvent.submit(queryByTestId("mailform"));
    //expect(mailSubmit).toHaveBeenCalled();
    expect(queryByTestId("promo-msg").innerHTML).toEqual('super promo');
})
;


