import React, { useState } from 'react';

function Dropdown( {title}){
    const [open, setOpen] = useState(false)   ;   
    const toggle = () => setOpen(!open);

    return(
        <div className="dd-wraper">
            <h2>{title}</h2>
            <div className="horaires">
                <div 
                    tabIndex={0} 
                    className="dd-header" 
                    role="button" 
                    onKeyPress={() => toggle(!open)} 
                    onClick={() => toggle(!open)}
                >
                    <div className="dd-header_action">
                        <img className="toggleImg" src={open ? 'https://tse3.mm.bing.net/th?id=OIP.0LQjBUCrGzqcZWNMpzIDVAHaHa&pid=Api' : 'https://cdn0.iconfinder.com/data/icons/user-interface-150/24/List_menu_toggle-512.png'} alt="btnToggle" />            
                    </div>    
                    
                </div>
                {open && (
                    <ul className="listHoraires">
                        <li>Lundi : </li>
                        <li>Mardi : </li>
                        <li>Mercredi : </li>
                        <li>Jeudi : </li>
                        <li>Vendredi : </li>
                        <li>Samedi : </li>
                        <li>Dimanche : </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Dropdown