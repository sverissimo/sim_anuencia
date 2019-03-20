import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'

import LoginTemplate from './loginTemplate'
import SignupTemplate from './signupTemplate'

class Login extends Component {

    state = {
        registered: true,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        municipio: ''
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async login(e) {
        e.preventDefault()
        let authData
        await axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(res => authData = res.data)

        authData.token = document.cookie.replace('_sim-ad=', '')
        this.props.login(authData)
    }

    async signup(e) {
        e.preventDefault()
        let newUser
        await axios.post('/api/signup', this.state)
            .then(res => newUser = res.data)
        newUser.token = document.cookie.replace('_sim-ad=', '')
        this.props.login(newUser)
    }

    render() {
        let { registered } = this.state
        return (
            <div>
                <div className="container col s12 m12 l6" style={{ marginTop: '1%' }}>
                    <img src="/images/ad_login.png" className='z-depth-2' alt="" />
                    <div className="card-panel">
                        {
                            registered ?
                                <LoginTemplate
                                    title='Entre no sistema'
                                    values={this.state}
                                    handleChange={this.handleChange.bind(this)}
                                    handleSubmit={this.login.bind(this)}
                                />
                                :
                                <SignupTemplate
                                    title='Cadastre-se'
                                    values={this.state}
                                    handleChange={this.handleChange.bind(this)}
                                    handleSubmit={this.signup.bind(this)}
                                />
                        }
                    </div>
                    {
                        registered && <p className="link right" onClick={() => this.setState({ registered: false })}> Não possui usuário e senha? Cadastre-se.</p>
                    }
                    {
                        !registered && <p className="link right" onClick={() => this.setState({ registered: true })}> Já é cadastrado? Faça o login.</p>
                    }

                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login, signup }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);