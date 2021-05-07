import React from 'react';
import img1 from '../src/images/img1.jpeg'
import img2 from '../src/images/img2.jpeg'
import img3 from '../src/images/img3.jpeg'
import img4 from '../src/images/img4.jpeg'

import { useEffect, useState } from 'react';
import Axios from "axios";
import Banner from './Banner.js';
import BannerPatron from './BannerPatron.js';


function Home() {
    require('./Home.css');
    Axios.defaults.withCredentials = true;

	const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsername(response.data.user[0].IdClient);
			}
			else {
				setLoginStatus(false);
			}
		});
	}, []);

    return (
        <div>
			{loginStatus ? <Banner /> : <BannerPatron />}
            <div className="hero-container">
                <div className="hero-img">
                    <ul className="defilement-img">
                        <li><img className="img" src={img1} alt="image1"></img></li>
                        <li><img className="img" src={img2} alt="image2"></img></li>
                        <li><img className="img" src={img3} alt="image3"></img></li>
                        <li><img className="img" src={img4} alt="image4"></img></li>
                        
                    </ul>
            
                </div>

                <div className="commentaire">
                    <ul className="avis-clients">
                        <h1>Avis</h1>
        
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default Home
