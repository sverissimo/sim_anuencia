import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer';
import BuscaContainer from './app/buscar/buscaContainer';
import SolicitaDiretriz from './app/solDir/solicitaDiretriz';
import diretriz from './app/diretrizes/diretriz';
import SolicitaAnuencia from './app/solAnuencia/solicitaAnuencia';
import EditData from './app/buscar/editData'
import Anuencia from './app/anuencia/anuenciaContainer' ;

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
            <Route path='/anuencia' component={Anuencia} />
            
        </Switch>
    );
};

export default Routes;