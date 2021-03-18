/*import { useState } from 'react'*/
import Navbar from './Navbar';
import Accueil from './Accueil';
import Accueil from './Informations';
import Accueil from './Staff';
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;