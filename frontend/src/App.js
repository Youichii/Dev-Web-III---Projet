import React from 'react'
import Banner from './Banner';
import Informations from './Informations';
import Staff from './Staff';
import Panier from './Panier';
import Connexion from './Connexion';
import Inscription from './Inscription';
import ProfilPrive from './ProfilPrive';
//import Home from './components/pages/Home'
import Home from './Home'
import Communaute from "./Communaute.js"
import Menu from "./Menu.js";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Chart from './components/Chart';
import Historique from './Historique';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/home">
              <Home />
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

            <Route exact path="/stat" component={Chart} >
              <Chart />
            </Route>

            <Route exact path="/Communaute">
              <Communaute />
            </Route>

            <Route exact path="/Carte">
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

            <Route exact path="/Menu"> 
              <Menu />
            </Route>
            
            <Route exact path="/Historique"> 
              <Historique/>
            </Route>

          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;