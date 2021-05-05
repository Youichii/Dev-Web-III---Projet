/*import { useState } from 'react'*/
import React from 'react'
import Navbar from './Navbar';
//import Accueil from './Accueil';
import Informations from './Informations';
import Staff from './Staff';
import Panier from './Panier';
import Connexion from './Connexion';
import Inscription from './Inscription';
import ProfilPrive from './ProfilPrive'
import Home from './Home'
// import BannerPatron from "./BannerPatron.js";
import Communaute from "./Communaute.js"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Stat from './Stat';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>

            <Route exact path="/informations"> 
              <Informations />
            </Route>

            <Route exact path="/staff"> 
              <Staff />
            </Route>

            <Route exact path="/panier"> 
              <Panier />
            </Route>

            <Route exact path="/connexion"> 
              <Connexion />
            </Route>

            <Route exact path="/stat"> 
              <Stat />
            </Route>

            <Route exact path="/communaute"> 
              <Communaute />
            </Route>


            <Route exact path="/inscription"> 
              <Inscription />
            </Route>

            <Route exact path="/profil-prive"> 
              <ProfilPrive />
            </Route>
            <Route path ="/" exact component={Home}/>
            <Route path = "/home" exact component={Home}/>
      

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;