import React from 'react';
import '../index.css';
import Chart from './Chart.js'
//import '../../App.css';
import Chart from '../../../../Statistique/src/components/Chart'
import Chart from './components/Chart';

import Axios from "axios";
import Banner from './Banner.js';
import BannerPatron from './BannerPatron.js';

export default function Stat() {
  Axios.defaults.withCredentials = true;

  const [loginStatus, setLoginStatus] = useState(false);
	const [username, setUsername] = useState("");

  useEffect(()=> {
		Axios.get("http://localhost:3001/api/connexion").then((response) => {
			if (response.data.loggedIn === true) {
				setLoginStatus(true);
				setUsername(response.data.user[0].IdClient);
			}
			else {
				setLoginStatus(false);
			}
		});
	}, []);

  //a mettre qqpart jsp où 
  /*<div>
	  {loginStatus ? <Banner /> : <BannerPatron />}
  </div>*/
  return (
    <>
        <Chart />
    </>
    
  );

};