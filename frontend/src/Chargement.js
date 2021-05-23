import ReactLoading from 'react-loading';

const Chargement = () => {
	require('./css/chargement.css');
	
    // type	String	balls
    // color	String	#ffffff
    // delay	Number	0 (msecs)
    // height	Number or String	64 (px)
    // width	Number or String	64 (px)
    // className	String

    //<div><ReactLoading type="bars" color="black" /></div>
    //<div><ReactLoading type="bubbles" color="black" /></div>
	return (
		<div className="cadre_chargement">
            <div className="bubbles"><ReactLoading type="bubbles" color="#c69961" heigh="150px" width="150px" /></div>
        </div>
		
	);
}

export default Chargement;
