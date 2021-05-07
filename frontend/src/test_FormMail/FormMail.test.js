import React from 'react';
import FormMail from './FormMail';
import {shallow} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('<FormMail/>', ()=>{
    const testPromo ={
        message: ''
    }
    
    

    it ("Submit works",  ()=>{
        const SubmitEmail= jest.fn();
        const component = shallow(
            <FormMail testPromo={testPromo} onSubmit = {SubmitEmail}/>
        );
        component.find("form").simulate('submit', {preventDefault:()=>{}});
        //expect(component.state('error')).toBe('');
        expect(SubmitEmail).toHaveBeenCalledWith({message: testPromo.message});
    });
});