import React from 'react';

    const AvisClients = (props) =>{
        const {dataAvis} = props;
        return (
            <div onLoad ={AfficherAvis} className="commentaires">
                <h1>Avis de nos clients</h1>
                {dataAvis.map((val)=>{
                    return(
                        <>
                            <h2>{val.idClients}</h2>
                            <p>{val.Avis}</p>
                            
                        </>
                    )
                })}
                
            </div>
            
            
       
            
        )
    
    }  
    ReactDOM.render(AvisClients, document.getElementById('root'));  

export default AvisClients;
