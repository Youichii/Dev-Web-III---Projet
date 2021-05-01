import HalfDiv from './components/HalfDiv'
import Header from './components/Header'
import Contact from './components/Contact'
import './informations.css'

const Informations = () => {
    return (
        <div className="Informations">
            <Header title={ "Nous contacter" } />
            <HalfDiv divpos="leftdiv" link={ <iframe title='Restaurant' src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3085.210015160706!2d4.612659415902056!3d50.66885037948458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c17fd50d4008e7%3A0xb64e4f665fdb6236!2sChick%20&#39;N&#39;%20Fish!5e1!3m2!1sfr!2sbe!4v1617966140947!5m2!1sfr!2sbe' width='100%' height='100%' allowFullscreen='' loading='lazy'></iframe>} />
            <HalfDiv divpos="rightdiv" link= { <Contact />} />
        </div>
    );
}

export default Informations;

