import React, { useState } from 'react';

function Dropdown( {title, content}){
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
                        <img className="toggleImg" src={open ? 'http://cdn.onlinewebfonts.com/svg/download_267727.png' : 'https://cdn0.iconfinder.com/data/icons/user-interface-150/24/List_menu_toggle-512.png'} alt="btnToggle" />            
                    </div>    
                    
                </div>
                {open && (
                    content
                )}
            </div>
        </div>
    )
}

export default Dropdown