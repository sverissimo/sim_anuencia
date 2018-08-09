import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home';
import CadastroEmpreend from './components/cadastro_emp';
import ShowEmpContainer from './components/showEmpContainer';
import SolicitaDiretriz from './components/diretrizes/solicitaDiretriz';
import SolicitaAnuencia from './components/anuencia/solicitaAnuencia';



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