//const {getEmailData} = require ('./mail');

const Hello = data => {

    return (`
      <!DOCTYPE html>
     <html style="margin: 0; padding: 0;">
     
         <head>
             <title>Chick'N'Fish</title>
         </head>
     
             <body style="margin: 0; padding: 0;">
                <div> Bonjour j'espère que tu vas bien ! Aujourd'hui au Chick'N'Fish ca va super<br>
                car nous avons une super promo pour toi ! </div>
             </body>
     
       </html>
      `);
  };
  
  module.exports = { Hello };