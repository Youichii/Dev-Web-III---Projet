import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
import Axios from 'axios'

/**
 * Dessine des graphiques des données reçues de la base de données
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 */
function Chart() {

  const [genre, setGenre]= useState([]);
  const [ville, setVille] = useState([]);
  const [age, setAge] = useState([]);


/**
 * Récupère les données liées à la ville dans l'URL et les enregistre dans une liste
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * 
 */

  useEffect(()=>{
    VilleStat()
  }, [])

  const VilleStat=()=>{
    Axios.get("http://localhost:3001/api/localisation-stat")
    .then((response)=>{
      setVille(response.data)
      
    })

  }

  const donneeVille = ville.map((val)=>{
    return val.Ville
  })
 

  const villeNombre = ville.map((val)=>{
    return val.nombre
  })





/**
 * Récupère les données liées au genre dans l'URL et les enregistre dans une liste 
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 */

  useEffect(()=>{
    GenreStat()
  }, [])

  const GenreStat=()=>{
    Axios.get("http://localhost:3001/api/genre-stat")
    .then((response)=>{
      setGenre(response.data)
      
    })

  }

  const donneeGenre = genre.map((val)=>{
    return val.Genre;
    
  });
  
  const genreNombre = genre.map((val)=>{
    return val.nombre;
  });


/**
 * Récupère les données liées à l'age dans l'URL et les enregistre dans une liste 
 * @author Noelle Khazoum <kh.noelle@gmail.com>
 * 
 */

useEffect(()=>{
  AgeStat()
}, [])

const AgeStat=()=>{
  Axios.get("http://localhost:3001/api/age-stat")
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
let ageTitre = Object.keys(rangeAge);
let ageNombre = Object.keys(rangeAge).map((key)=>rangeAge[key]);
console.log(rangeAge)
console.log(ageTitre)
console.log(ageNombre)



  const data =['donneesGenre', 'donneesAge', 'donneesLoc']
  const donneesGenre = {
      labels:donneeGenre,
      datasets:[{
        label:'Population',
        data:genreNombre,
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
  const donneesAge={
      labels: ageTitre,
      datasets:[{
        label:'Age',
        data:ageNombre,
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

  const donneesLoc ={
    labels:donneeVille,
    datasets:[{
      label:'Localité',
      data: villeNombre,
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
            data={donneesGenre}
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
            data={donneesAge}
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
            data={donneesLoc}
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
export default Chart;