import ReactLoading from 'react-loading';

const Chargement = () => {
	require('./css/chargement.css');
	
	return (
		<div className="cadre_chargement">
            <div className="bubbles"><ReactLoading type="bubbles" color="#c69961" heigh="150px" width="150px" /></div>
        </div>
		
	);
}

export default Chargement;
