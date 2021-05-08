import React from 'react';
import ReactDOM from 'react-dom';
import FormMail from './FormMail';
import {render, fireEvent, cleanup, screen, getByTestId} from '@testing-library/react';

afterEach(cleanup)
it ("submits", ()=>{
    const SubmitEmail = jest.fn();
    const {getByTestId} = render (<FormMail onSubmit={SubmitEmail} />)
    fireEvent.submit(getByTestId("mailform"));
    expect(SubmitEmail).toHaveBeenCalled();


});