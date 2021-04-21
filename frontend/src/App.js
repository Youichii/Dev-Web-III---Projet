/*import { useState } from 'react'*/
import Navbar from './Navbar';
import Accueil from './Accueil';
import Informations from './Informations';
import Staff from './Staff';
import Panier from './Panier';
import Connexion from './Connexion';
import Inscription from './Inscription';
import BannerPatron from "./BannerPatron";
import Historique from "./Historique";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/"> 
              <Accueil />
            </Route>

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

            <Route exact path="/inscription"> 
              <Inscription />
            </Route>

            <Route exact path="/historique"> 
              <Historique />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;