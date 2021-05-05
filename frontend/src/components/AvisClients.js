import React from 'react';

    const AvisClients = (props) =>{
        const {dataAvis} = props;
        return (
            <div className="avis">
                {dataAvis.map((val)=>{
                    return(
                        <div>
                            <h2>nom:{val.idClients}</h2> 
                            <p>{val.Avis}</p>
                        </div>
                    )
                })}

            </div>
            
        )
    
    }    

export default AvisClients;
