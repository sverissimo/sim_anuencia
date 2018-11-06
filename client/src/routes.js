import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer';
import BuscaContainer from './app/buscar/buscaContainer';
import SolicitaDiretriz from './app/solDir/solicitaDiretriz';
import diretriz from './app/diretrizes/diretriz';
import SolicitaAnuencia from './app/anuencia/solicitaAnuencia';
import EditData from './app/buscar/editData'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cadastro' component={CadastroContainer} />
            <Route path='/solicitaDiretriz' component={SolicitaDiretriz} />
            <Route path='/diretrizes' component={diretriz} />
            <Route path='/solicitaAnuencia' component={SolicitaAnuencia} />
            <Route path='/showEmpreend' component={BuscaContainer} />
            <Route path='/editData' component={EditData} />
        </Switch>
    );
};

export default Routes;