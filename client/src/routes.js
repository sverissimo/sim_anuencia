import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './app/home';
import CadastroContainer from './app/cadastro/cadContainer';
import ShowEmpContainer from './app/buscar/showEmpContainer';
import SolicitaDiretriz from './app/diretrizes/solicitaDiretriz';
import SolicitaAnuencia from './app/anuencia/solicitaAnuencia';



const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cadastro_emp' component={CadastroContainer} />
            <Route path='/solicitaDiretriz' component={SolicitaDiretriz} />
            <Route path='/solicitaAnuencia' component={SolicitaAnuencia} />
            <Route path='/showEmpreend' component={ShowEmpContainer} />

        </Switch>
    );
};

export default Routes;