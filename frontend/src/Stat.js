import React from 'react';
//import './Stat.css'
import Chart from './components/Chart'

export default function Stat() {
  return (
    <div className="container-stat">
      <h1>Statistiques</h1>
      <div className="graph">
        <Chart />
      </div>
        
    </div>
    
  );

};