import './FormMail.css';
import axios from 'axios'
import React, {useState} from 'react'

const FormMail=()=> {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [promo, setPromo] = useState('')
  
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.id === "name"){
      setName(e.target.value)
    } else if(e.target.id === "email"){
      setEmail(e.target.value)
    } else{
      setPromo(e.target.value)
    }
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name,
      email,
      promo
    }

    axios.post("api/sendMail", dataToSubmit)
  }



  return (

    <div className="container">

        <form onSubmit={handleSubmit}>
          <div className="singleItem">
            <input  
            id="name" 
            placeholder="name" 
            value ={name} 
            onChange={handleClick}/>
          </div>

          <div className="singleItem">
            <input  
            id="email" 
            placeholder="Email" 
            value ={email} 
            onChange={handleClick}/>
          </div>

          <div className="textArea singleItem">
            <textarea
            id="promo"
            cols="30" 
            rows="5" 
            placeholder="Promo" 
            value ={promo} 
            onChange={handleClick}/>
          </div>

          

          <div className="btn">
            <button onClick={handleSubmit}> Send email</button>
          </div>
          
        </form>

      
    </div>
  );
}

export default FormMail;
