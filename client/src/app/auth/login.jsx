import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, verify } from './authActions'
import { reduxToastr } from '../cadastro/cadActions'

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
        let user
        await axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password,
        })
            .then(res => user = res.data)
            .catch(err => {
                reduxToastr('Erro', 'Usuário/senha invalidos.')
                return null
            })

        if (user === 'Aguardando verificação do usuário.') {
            await localStorage.setItem('verified', false)
            this.props.login(true); this.props.verify(false)
            return null
        }
        
        let authenticate = () => document.cookie.match('_sim-ad=', '') ? true : false

        await localStorage.setItem('login', authenticate())
        if (!user) return
        if (user.verified) {
            
            for (let [key, value] of Object.entries(user)) {
                await localStorage.setItem(key, value)
            }
            this.props.login(true); this.props.verify(true)
        }
    }

    async signup(e) {
        e.preventDefault()
        let newUser
        await axios.post('/api/signup', this.state)
            .then(res => newUser = res.data)
        reduxToastr('sucess', 'Usuário criado com sucesso', newUser.name)
        setTimeout(() => {
            window.location.reload()
        }, 2000);
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login, verify, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);