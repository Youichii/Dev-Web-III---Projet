import { useState } from 'react'
import Header from './components/Header'
import React from 'react'
import Clients from './components/Clients'
import AddClient from './components/AddClient'

const App = () => {
  const [showAddClient, setShowAddClient] = useState (false)
  const [clients, setClients] = useState([
    {
        id: 1,
        text: 'Philippe',
        day: '14/01/1997',
        reminder: true,
    },
    {
        id: 2,
        text: 'George',
        day: '26/03/1985',
        reminder: true,
    },
    {
        id: 3,
        text: 'Albert',
        day: '11/11/2001',
    },
  ])

  //create delete function
  const deleteClient = (id) => {
    console.log('delete ', id)
    setClients(clients.filter((client) => client.id !== id))
  }


  // Add client
  const addClient = (client) => {
      const id = Math.floor(Math.random() * 10000) + 1
      const newClient = { id, ...client }
      setClients([...clients, newClient])
  }

  const toggleReminder = (id) => {
    console.log(id)
    setClients(
      clients.map((client) => 
        client.id === id ? { ...client, reminder: !client.reminder } : client
      )
    )
  }

  

  return (
    <div className="container">
      <Header onAdd={() => setShowAddClient(!showAddClient)} showAdd={showAddClient} />
      {showAddClient && <AddClient onAdd={addClient}/>}
      {clients.length > 0 ? (
        <Clients clients={clients} onDelete={deleteClient} onToggle={toggleReminder} />
      ) : (
        'No clients'
      )}
    </div>
  ); 
}

export default App;


//npm run build ==> lancer la production (créé un dossier 'build'). Seul le dossier build est utile 
//serve -s build -p 8000 ==> lancer le serveur en locoal sur le port 8000



//////////////////////////////////////


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