import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import axios from 'axios';


function MailingList() {
  const mailing_list = [{name:"", email:""}];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mailList, setMailList] = useState([])

  useEffect(()=>{
      getMailList()

  },[]);
  
  const getMailList = ()=>{
    Axios.get('http://localhost:3000/api/users')
    .then((response)=>{
        setMailList(response.data)
  
    });

  }
    return (
        <div>
          <h1>Hello</h1>
            {mailList.map((val)=>{
                return (<h1>Name: {val.Prenom} | email: {val.Mail}</h1>);
            })}
        </div>
    )

};

export default MailingList;
