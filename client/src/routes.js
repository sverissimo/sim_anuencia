import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from './components/home';
import HomeCadastro from './components/home_cadastro';
import CadastroEmpreend from './components/cadastro_emp';
import CadastroRT from './components/cadastro_rt';
import Triagem from './components/triagem';
import CadastroProcess from './components/cadastro_process';
import ShowEmpContainer from './components/showEmpContainer';
/* import SubHeader from './components/subheader'; */


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/home_cadastro' exact component={HomeCadastro} />
            <Route path='/showEmpreend' component={ShowEmpContainer} />
            <Route path='/cadastro_emp' component={CadastroEmpreend} />
            <Route path='/cadastro_rt' component={CadastroRT} />
            <Route path='/triagem' component={Triagem} />
            <Route path='/cadastro_process' component={CadastroProcess} />
           
            
        </Switch>
    );
};

export default Routes;