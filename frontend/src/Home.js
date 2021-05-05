import React from 'react';
import img1 from '../images/img1.jpeg'
import img2 from '../images/img2.jpeg'
import img3 from '../images/img3.jpeg'
import img4 from '../images/img4.jpeg'

import './Home.css';

function Home() {
    return (
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
    )
}

export default Home
