import React from 'react'
import Informations from './Informations';
import Staff from './Staff';
import Panier from './Panier';
import Connexion from './Connexion';
import Inscription from './Inscription';
import ProfilPrive from './ProfilPrive';
import Accueil from './Accueil'
import FormMail from './FormMail';
import Communaute from "./Communaute";
import Menu from "./Menu";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Historique from './Historique';
import Modification from './Modification'
import Stat from './Stat';
import Cookie from './Cookies';
import PiedPage from './PiedPage';
import CGU from './CGU';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Accueil />
            </Route>

            <Route exact path="/accueil">
              <Accueil/>
            </Route>

            <Route exact path ="/modification">
              <Modification />
            </Route>

            <Router exact path="/newsletter">
              <FormMail/>
            </Router>

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

            <Route exact path="/stat" >
              <Stat />
            </Route>

            <Route exact path="/Communaute">
              <Communaute />
            </Route>

            <Route exact path="/Menu">
              <Menu />
            </Route>

            <Route exact path="/inscription"> 
              <Inscription />
            </Route>

            <Route exact path="/profil-prive">
              <ProfilPrive />
            </Route>

            <Route exact path="/Historique"> 
              <Historique/>
            </Route>    

            <Route exact path="/Cookie"> 
              <Cookie/>
            </Route>

            <Route exact path="/CGU"> 
              <CGU/>
            </Route>

          </Switch>
        </div>
        <PiedPage />
      </div>
    </Router>
  );
}

export default App;