import React from 'react';
import {connect} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './app/common/header';
import Messages from './app/common/messages'
import Login from './app/auth/login'

const App = (props) => {
        
    return (
        (document.cookie) ? < div >
            <BrowserRouter>
                <div>
                    <header>
                        <Header />
                    </header>
                    <Routes />
                </div>
            </BrowserRouter>
            <Messages />
        </div> :
            <div>
                <Login />
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(App)

