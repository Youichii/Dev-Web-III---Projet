import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
import './Chart.css';
import Axios from 'axios'


function App() {

  const [genre, setGenre]= useState([]);
  const [ville, setVille] = useState([]);
  const [age, setAge] = useState([]);

  useEffect(()=>{
    GenreStat()
  }, [])

  const GenreStat=()=>{
    Axios.get("http://localhost:3000/api/genre-stat")
    .then((response)=>{
      setGenre(response.data)
      
    })

  }
 
  const donneeGenre = genre.map((val)=>{
    return val.Genre;
    
  });
  console.log(donneeGenre)
  
  const genreCount = genre.map((val)=>{
    return val.nombre;
  })

  console.log(genreCount)


  const data =['data_gender', 'data_age', 'data_oc']
  const data_gender = {
      labels:donneeGenre,
      datasets:[{
        label:'Population',
        data:genreCount,
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