import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

    return (
        <nav style={{ marginBottom: 20}} >
            <div className="nav-wrapper teal darken-3" style={{ paddingLeft: 30, paddingRight: 30 }} >
                <Link to="/" className="brand-logo">
                <i className="material-icons" style={{fontSize: "30px"}} >home</i>
                </Link>
                <Link to="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/cadastro_emp">Cadastro</Link></li>
                    <li><Link to="/solicitaDiretriz">Diretrizes</Link></li>
                    <li><Link to="/solicitaAnuencia">Anuência Prévia</Link></li>
                    <li><Link to="/showEmpreend">Buscar</Link></li>
                    <li><Link to="">Login <i className="material-icons left">person</i></Link></li>
                    <li><Link to="">Contato <i className="material-icons left">mail</i></Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                    <li><Link to="/cadastro_emp">Cadastro</Link></li>
                    <li><Link to="/solicitaDiretriz">Diretrizes</Link></li>
                    <li><Link to="/solicitaAnuencia">Anuência Prévia</Link></li>
                    <li><Link to="/showEmpreend">Buscar</Link></li>
                    <li><Link to="">Login</Link></li>
                    <li><Link to="">Contato</Link></li>
                </ul>
            </div>
        </nav>
    )

};

export default Header;

