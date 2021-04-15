import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from './Button';
import './NavPatron.css'


function NavPatron() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>{
        if (window.innerWidth <= 760){
            setButton(false);
        } else{
            setButton(true);
        }
    };

    useEffect(()=> {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);


    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to='/stat' className='navbar-logo' onClick = {closeMobileMenu}>
                        Chick'N'Fish 
                        <img className = "cnf_logo" src = "/public/logo.jpg"/>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times': 'fas-fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active': 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/stat' className='nav-links' onClick={closeMobileMenu}> Stat </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/modif' className='nav-links' onClick={closeMobileMenu}> Modifier </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profils' className='nav-links' onClick={closeMobileMenu}> Profils </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/historique' className='nav-links' onClick={closeMobileMenu}> Historique </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/communaute' className='nav-links' onClick={closeMobileMenu}> Communauté </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/sign_up' className='nav-links-mobile' onClick={closeMobileMenu}> Inscription </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/connexion' className='nav-links-mobile' onClick={closeMobileMenu}> Connexion</Link>
                        </li>
                        
                    </ul>
                    {button && <Button buttonStyle='btn--outline'>S'inscrire</Button>}
                    {button && <Button buttonStyle='btn--outline'>Connexion</Button>}
                </div>
            </nav>
        </>
      
    );
}

export default NavPatron
