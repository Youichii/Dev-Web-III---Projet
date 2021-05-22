import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PiedPage = () => {
	require('../css/piedPage.css') ;

    const documents = ["mentions_legales", "confidentialite", "cookies", "cgu", "appeler"];
    let  niveau = 0 ;

    const glisserGauche = () => {
        document.getElementsByClassName(documents[niveau])[0].style.display = "none";
        document.getElementsByClassName("rond" + (niveau + 1))[0].style.backgroundColor = "var(--vide)";
        if (niveau === 0) {
            niveau = 4;
        }
        else {
            niveau -= 1 ;
        }
        document.getElementsByClassName(documents[niveau])[0].style.display = "initial";
        document.getElementsByClassName("rond" + (niveau + 1))[0].style.backgroundColor = "var(--rempli)";
    }
    const glisserDroite = () => {
        document.getElementsByClassName(documents[niveau])[0].style.display = "none";
        document.getElementsByClassName("rond" + (niveau + 1))[0].style.backgroundColor = "var(--vide)";
        if (niveau === 4) {
            niveau = 0;
        }
        else {
            niveau += 1 ;
        }
        document.getElementsByClassName(documents[niveau])[0].style.display = "initial";
        document.getElementsByClassName("rond" + (niveau + 1))[0].style.backgroundColor = "var(--rempli)";
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 900) {
                document.getElementsByClassName(documents[0])[0].style.display = "initial";
                document.getElementsByClassName(documents[1])[0].style.display = "initial";
                document.getElementsByClassName(documents[2])[0].style.display = "initial";
                document.getElementsByClassName(documents[3])[0].style.display = "initial";
                document.getElementsByClassName(documents[4])[0].style.display = "initial";
            }
            else {
                // document.getElementsByClassName(documents[0])[0].style.display = "initial";
                // document.getElementsByClassName(documents[1])[0].style.display = "none";
                // document.getElementsByClassName(documents[2])[0].style.display = "none";
                // document.getElementsByClassName(documents[3])[0].style.display = "none";
                // document.getElementsByClassName(documents[4])[0].style.display = "none";
                for (let i = 0 ; i < documents.length ; i++) {
                    if (i === niveau) {
                        document.getElementsByClassName(documents[i])[0].style.display = "initial";
                    }
                    else {
                        document.getElementsByClassName(documents[i])[0].style.display = "none";
                    }
                }
            }
        }
        window.addEventListener('resize', handleResize)
      })
	
    return (
        <div className="footer">
                <NavLink to='/mentionslegales' className="mentions_legales">Mentions légales</NavLink>
                <a href="https://www.privacypolicies.com/live/5b2841b7-4ad5-46a7-ac31-25ea7960e6f3" className="confidentialite">Politique de Confidentialité</a>
                <a href="https://www.privacypolicies.com/live/544cc1d9-8359-45cf-a543-ab63691364cf" className="cookies">Politique relative aux cookies</a>
                <NavLink to='/cgu' className="cgu">Conditions générales d'utilisation</NavLink>
                <a className="appeler" href="">Nous appeler</a>
                <div className="copyright">© Copyright 2021 ChickNFish</div>
                <div className="bouton_gauche"><input type="button" value="‹" onClick={glisserGauche} /></div>
                <div className="bouton_droite"><input type="button" value="›" onClick={glisserDroite} /></div>
                <div className="avancement">
                    <div className="rond1"></div>
                    <div className="rond2"></div>
                    <div className="rond3"></div>
                    <div className="rond4"></div>
                    <div className="rond5"></div>
                </div>
        </div>
    );
}

export default PiedPage;
