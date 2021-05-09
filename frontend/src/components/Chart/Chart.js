import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
//import './Chart.css';
import Axios from 'axios'


function App() {

  const [genre, setGenre]= useState([]);
  const [ville, setVille] = useState([]);
  const [age, setAge] = useState([]);


// recupératin données des villes

  useEffect(()=>{
    VilleStat()
  }, [])

  const VilleStat=()=>{
    Axios.get("http://localhost:3000/api/localisation-stat")
    .then((response)=>{
      setVille(response.data)
      
    })

  }

  const donneeVille = ville.map((val)=>{
    return val.Ville
  })
  console.log(donneeVille)

  const VilleCount = ville.map((val)=>{
    return val.nombre
  })

  console.log(VilleCount)

// recupération des données des genres

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

// recupération des ages

useEffect(()=>{
  AgeStat()
}, [])

const AgeStat=()=>{
  Axios.get("http://localhost:3000/api/age-stat")
  .then((response)=>{
    setAge(response.data)
    
  })

}

const donneeAge = age.map((val)=>{
  return val.AgeClient;
  
});
console.log(donneeAge)

let rangeAge = {"<18":0, "18-30": 0, "30-50":0, ">50":0};
console.log(rangeAge['18-30'])

//let count = 0


for (let i in donneeAge){
  
  console.log(donneeAge[i])
  if(donneeAge[i] < 18){
    //count = count+1
    rangeAge['<18']+= 1
    console.log(rangeAge['<18'])
    
  }else if (18< donneeAge[i] < 30) {
    //count = count +1 
    rangeAge['18-30'] += 1
    console.log(rangeAge['18-30'])
    
  }else if (30< donneeAge[i] < 50){
    //count = count +1 
    rangeAge['30-50'] += 1
    console.log(rangeAge['30-50'])
  }
  else{
    //count = count +1 
    rangeAge['>50'] += 1
    console.log(rangeAge['>50'])
  }
  
  console.log(rangeAge)


}
let ageLabels = Object.keys(rangeAge);
let ageData = Object.keys(rangeAge).map((key)=>rangeAge[key]);
console.log(rangeAge)
console.log(ageLabels)
console.log(ageData)



  const data =['data_gender', 'data_age', 'data_loc']
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
      labels: ageLabels,
      datasets:[{
        label:'Age',
        data:ageData,
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

  const data_loc ={
    labels:donneeVille,
    datasets:[{
      label:'Localité',
      data: VilleCount,
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

        <div className="chart-loc">
          <h2>AGE</h2>
          <Doughnut 
            data={data_loc}
            options={{
              title:{
                display:true,
                text:'localite',
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