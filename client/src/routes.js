import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './components/home';
import CadastroEmpreend from './components/cadastro_emp';
import CadastroRT from './components/cadastro_rt';
import Triagem from './components/triagem';
import CadastroProcess from './components/cadastro_process';
import ShowEmpreend from './components/showEmpreend';


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/cadastro_emp' component={CadastroEmpreend} />
            <Route path='/cadastro_rt' component={CadastroRT} />
            <Route path='/triagem' component={Triagem} />
            <Route path='/cadastro_process' component={CadastroProcess} />
            <Route path='/showEmpreend' component={ShowEmpreend} />
        </Switch>
    );
};

export default Routes;