import logo from "./img/logo.jpg"
import { NavLink } from 'react-router-dom';
import Axios from "axios";
import { useEffect, useState } from 'react';


const Banner = () => {
    require('./banner.css')
    Axios.defaults.withCredentials = true;

	const [loginStatus, setLoginStatus] = useState("");
	useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			console.log("vérifier tjrs connecté : ", response);
			if (response.data.loggedIn === true) {
                return(
                    <nav className="navbar">                    
                        <NavLink to='/home'><li><a href="/" >Accueil</a></li></NavLink>
                        <NavLink to='/informations'><li><a href="/" id= "Inf">Informations</a></li></NavLink>
                        <li><img id = "img" src={logo} alt="Logo_Bannière" /></li>
                        <NavLink to='/Menu'><li><a href="/" id="Men">Menu</a></li></NavLink>
                        <NavLink to='/panier'><li><a href="/" id="Pan">Panier</a></li></NavLink>
                    </nav>
                )
				
			}
            return <div>Hello</div>
		});
	}, []);
    
}
export default Banner; 
            