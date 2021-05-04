import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const data =['data_gender', 'data_age', 'data_oc']
const data_gender = {
    labels:['Femmes', 'Hommes'],
    datasets:[{
      label:'Population',
      data:[
        43,
        57
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  }
const data_age ={
    labels:['18-25', '25-40', '40-55', '+55'],
    datasets:[{
      label:'Age',
      data:[
        40,
        37,
        23,
        5
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'yellow',
        'green'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]

    
  
}

function App() {
  return (
    <div className="chart">
      <div className="chart-gender">
        <h2>Genre</h2>
        <Doughnut 
          data={data_gender}
          options={{
            title:{
              display:true,
              text:'Genre des clients',
              fontSize:25
            },
    
            legend:{
              display:true,
              position:'right',
              labels:{
              fontColor:'withe'
              }
            },
            layout:{
              padding:{
                left:0,
                right:500,
                bottom:0,
                top:0
              }
            },
            tooltips:{
              enabled:true
            }
          }}
        />
      </div>

      <div className="chart-age">
        <h2>AGE</h2>
        <Doughnut 
          data={data_age}
          options={{
            title:{
              display:true,
              text:'Age des clients',
              fontSize:25,
              
            },
    
            legend:{
              display:true,
              position:'right',
              labels:{
              fontColor:'withe'
              }
            },
            layout:{
              padding:{
                left:0,
                right:500,
                bottom:0,
                top:0
              }
            },
            tooltips:{
              enabled:true
            }
          }}

           />
      </div>

    </div>
    
  );
}
export default App;