import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxToastr } from './app/cadastro/cadActions'
import { logout } from './app/auth/logout'

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer';
import BuscaContainer from './app/buscar/buscaContainer';
import SolicitaDiretriz from './app/solDir/solicitaDiretriz';
import diretriz from './app/diretrizes/diretriz';
import SolicitaAnuencia from './app/solAnuencia/solicitaAnuencia';
import EditData from './app/buscar/editData'
import Anuencia from './app/anuencia/anuenciaContainer';

const Routes = () => {

    if (document.cookie.match('_sim-ad')) {
        return <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cadastro' component={CadastroContainer} />
            <Route path='/solicitaDiretriz' component={SolicitaDiretriz} />
            <Route path='/diretrizes' component={diretriz} />
            <Route path='/solicitaAnuencia' component={SolicitaAnuencia} />
            <Route path='/showEmpreend' component={BuscaContainer} />
            <Route path='/editData' component={EditData} />
            <Route path='/Anuencia' exact component={Anuencia} />
        </Switch>
    } else {
        logout()
        return <h5 style={{ marginTop: '30%' }}>Sessão expirada!</h5>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ reduxToastr }, dispatch)
}

export default withRouter(connect(mapDispatchToProps)(Routes))