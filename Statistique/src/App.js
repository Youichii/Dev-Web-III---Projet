import React, {Component} from 'react';
import NavPatron from './components/NavPatron';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Stat from './components/pages/Stat';
// hello

function App() {
  return (
    <>
      <Router>
        <NavPatron />
        <Switch>
          <Route path ="/stat" component={Stat} />
      
        </Switch>
      
      </Router>
      
    </>
  );
}

export default App;