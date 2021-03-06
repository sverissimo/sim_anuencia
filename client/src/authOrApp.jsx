import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Header from './app/common/header';
import Footer from './app/common/footer';
import Messages from './app/common/messages'
import Login from './app/auth/login'
import Loading from './app/common/loading'
import VerifyUser from './app/admin/verifyUser'

const AuthOrApp = (props) => {
    let loading = props.render.loading

    return (

        (document.cookie && (localStorage.getItem('verified'))) ? <div style={{ position: 'relative', height: '100%' }}>
            <BrowserRouter>
                <div style={{ marginBottom: '80px' }}>
                    <header>
                        <Header />
                    </header>
                    <Routes />
                </div>
            </BrowserRouter>
            <Footer />
            <Messages />
            {loading && <Loading />}
        </div>
            : props.auth.login ?
                <VerifyUser />
                :
                <div>
                    <Login />
                </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        render: state.cadastro
    }
}

export default connect(mapStateToProps)(AuthOrApp)

