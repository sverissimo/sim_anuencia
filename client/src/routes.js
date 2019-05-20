import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxToastr } from './app/cadastro/cadActions'
import { logout } from './app/auth/logout'

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer'
import BuscaContainer from './app/buscar/buscaContainer'
import SolicitaDiretriz from './app/solDir/solicitaDiretriz'
import diretriz from './app/diretrizes/diretriz'
import SolicitaAnuencia from './app/solAnuencia/solicitaAnuencia'
import EditData from './app/buscar/editData'
import Anuencia from './app/anuencia/anuenciaContainer'
import Users from './app/auth/users'
import Admin from './app/admin/admin'

const Routes = () => {
    const userRole = localStorage.getItem('role')
    const prefeitura = userRole === 'admin' || userRole === 'prefeitura'
    const agencia = userRole === 'admin' || userRole === 'tecnico'
    
    if (document.cookie.match('_sim-ad')) {
        return <Switch>
            <Route path='/' exact component={Home} />
            {prefeitura && <Route path='/cadastro' component={CadastroContainer} />}
            {prefeitura && <Route path='/solicitaDiretriz' component={SolicitaDiretriz} />}
            {agencia && <Route path='/diretrizes' component={diretriz} />}
            {prefeitura && <Route path='/solicitaAnuencia' component={SolicitaAnuencia} />}
            <Route path='/showEmpreend' component={BuscaContainer} />
            {agencia && <Route path='/Anuencia' exact component={Anuencia} />}
            {agencia && <Route path='/editData' component={EditData} />}
            {userRole === 'admin' && <Route path='/users' exact component={Users} />}
            {userRole === 'admin' && <Route path='/admin' exact component={Admin} />}               
        </Switch>
    } else {
        logout()
        return <h5 style={{ marginTop: '25%' }}>Sessão expirada!</h5>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ reduxToastr }, dispatch)
}

export default withRouter(connect(mapDispatchToProps)(Routes))