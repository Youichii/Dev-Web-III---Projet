import logo from './img/logo.jpg';

const Navbar = () => {
    return (
        <div className="Navbar">
            <nav id="baniere" className="baniere">
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="informations">Informations</a></li>
                    <li><img src={logo} href="page1.html" alt="logo"/></li>
                    <li><a href="menu">Menu</a></li>
                    <li><a href="compte">Profil</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
