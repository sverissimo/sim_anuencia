import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '5px' }}>
            <div className="container">
                <span className="navbar-brand">
                    <strong> <Link to="/"> SIM - Anuência</Link></strong>
                </span>
                <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar9">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbar9">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">Cadastro</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Análise</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link"> 
                            <Link to="/showEmpreend"> Relatórios </Link>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
    )

};

export default Header;

