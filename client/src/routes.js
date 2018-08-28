import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './app/home';
import CadastroEmpreend from './app/cadastro/cadastro_emp';
import ShowEmpContainer from './app/buscar/showEmpContainer';
import SolicitaDiretriz from './app/diretrizes/solicitaDiretriz';
import SolicitaAnuencia from './app/anuencia/solicitaAnuencia';



const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cadastro_emp' component={CadastroEmpreend} />
            <Route path='/solicitaDiretriz' component={SolicitaDiretriz} />
            <Route path='/solicitaAnuencia' component={SolicitaAnuencia} />
            <Route path='/showEmpreend' component={ShowEmpContainer} />

        </Switch>
    );
};

export default Routes;