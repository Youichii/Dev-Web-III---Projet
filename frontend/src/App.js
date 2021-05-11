import React from 'react'
import Informations from './Informations';
import Staff from './Staff';
import Panier from './Panier';
import Connexion from './Connexion';
import Inscription from './Inscription';
import ProfilPrive from './ProfilPrive';
import Home from './Home'
import Comunaute from "./Communaute.js"
import Menu from "./Menu.js";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Historique from './Historique';
import Modification from './Modification'
import Stat from './Stat';
import Cookie from './Cookies';
import Footer from './Footer';
import Chart from './components/Chart';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/home">
              <Home />
            </Route>

            <Route exact path ="/modification">
              <Modification />
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

            <Route exact path="/stat" >
              <Stat />
            </Route>

            <Route exact path="/Communaute">
              <Comunaute />
            </Route>

            <Route exact path="/Carte">
              <Menu />
            </Route>

            <Route exact path="/inscription"> 
              <Inscription />
            </Route>

            <Route exact path="/profil-prive">
              <ProfilPrive />
            </Route>

            <Route exact path="/Menu"> 
              <Menu />
            </Route>
            
            <Route exact path="/Historique"> 
              <Historique/>
            </Route>    

            <Route exact path="/Cookie"> 
              <Cookie/>
            </Route>

          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;