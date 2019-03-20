import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from './app/auth/authActions'

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer';
import BuscaContainer from './app/buscar/buscaContainer';
import SolicitaDiretriz from './app/solDir/solicitaDiretriz';
import diretriz from './app/diretrizes/diretriz';
import SolicitaAnuencia from './app/solAnuencia/solicitaAnuencia';
import EditData from './app/buscar/editData'
import Anuencia from './app/anuencia/anuenciaContainer';

class Routes extends Component {

    state = {
        loggedIn: false
    }

    componentWillMount() {
        if (document.cookie.match('_sim-ad') && this.props.auth.login) {
            this.setState({ loggedIn: true })
        }
    }
    render() {

        if (this.state.loggedIn && (document.cookie.match('_sim-ad') && this.props.auth.login)) {
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
            this.setState({ loggedIn: false })            
            this.props.logout()
            window.location.reload()
        }
    }
}


const mapStateToProps = (state) => {
    return { auth: state.auth }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ logout }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))