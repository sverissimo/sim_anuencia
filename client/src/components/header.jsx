import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '20px' }}>
            <div className="row">

                <div className="col-sm-2">
                    <span className="navbar-brand">
                        <strong> <Link to="/"> SIM - Anuência</Link></strong>
                    </span>
                </div>
                <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar9">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse col-sm-9 float-right" id="navbar9">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/home_cadastro" style={{ color: 'white' }}> Cadastro</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/analises" style={{ color: 'white' }}>Análise</Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/showEmpreend" style={{ color: 'white' }}> Relatórios </Link>
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">
                                <Link to="/signIn" style={{ color: 'white' }}> Sign In </Link>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            

        </nav >

    )

};

export default Header;

