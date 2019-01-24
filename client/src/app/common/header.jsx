import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../css/header.css'

import randomColors from './randomColors'

const Header = (props) => {
    const { process } = props

    const count = (item) => {
        if (process && process.length > 0) {
            let counter = process.filter(el => el.status.match(item)).length
            if (item = 'Diretrizes Metropolitanas emitidas') {
                counter = counter + process.filter(el => el.status.match('Pendências')).length
            } else {
                counter = process.filter(el => el.status.match(item)).length
            }
            
            if (counter > 0)
                return (
                    <sup style={{ fontSize: '0.9em', borderRadius: '50%', padding: '0px 5px', backgroundColor: 'red', fontWeight: '900' }}>
                        {counter}
                    </sup>
                )
            if (counter === 0)
                return (
                    <sup> </sup>
                )
        }

    }

    return (
        <nav>
            <div className="nav-wrapper" style={{ paddingLeft: 30, paddingRight: 30, backgroundColor: randomColors() }} id="setcolor" >
                <Link to="/" className="brand-logo">
                    <i className="material-icons" style={{ fontSize: "30px" }} >home</i>
                </Link>
                <Link to="" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down">
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/solicitaDiretriz">Solicitar Diretrizes Metropolitanas {count('Processo cadastrado')}</Link></li>
                    <li><Link to="/diretrizes">Diretrizes Metropolitanas {count('Aguardando Diretrizes Metropolitanas')}</Link></li>
                    <li><Link to="/solicitaAnuencia">Solicitar Anuência Prévia {count(`Diretrizes Metropolitanas emitidas`)}</Link></li>
                    <li><Link to="/Anuencia">Emitir Anuência Prévia {count('Aguardando Análise')}</Link></li>
                    <li><Link to="/showEmpreend">Gerenciar Dados </Link></li>
                    <li><Link to=""><i className="material-icons left">person</i></Link></li>
                    <li><Link to=""><i className="material-icons left">mail</i></Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                    <li><Link to="/cadastro">Cadastro</Link></li>
                    <li><Link to="/solicitaDiretriz">Solicitar Diretrizes</Link></li>
                    <li><Link to="/diretrizes">Diretrizes Metropolitanas</Link></li>
                    <li><Link to="/solicitaAnuencia">Solicitar Anuência Prévia</Link></li>
                    <li><Link to="/Anuencia">Emitir Anuência Prévia</Link></li>
                    <li><Link to="/showEmpreend">Buscar</Link></li>
                    <li><Link to="">Login</Link></li>
                    <li><Link to="">Contato</Link></li>
                </ul>
            </div>
        </nav>
    )

};

const mapStateToProps = (state) => {
    return {
        process: state.cadastro.processCollection
    }
}

export default connect(mapStateToProps)(Header)

