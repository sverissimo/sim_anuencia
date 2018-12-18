import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route
  } from 'react-router-dom'
import Pendencias from './pendencias'
  

const AnuenciaRoutes = () => {
    return (
        <Router>
            <Route path='pendencias' component= {Pendencias}></Route>
        </Router>
    );
};

export default AnuenciaRoutes;
