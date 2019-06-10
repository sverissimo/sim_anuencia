import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { reduxToastr } from '../cadastro/cadActions'

import MyAccountTemp from './myAccountTemp'
import { formatMun } from '../config/formatMun'

class MyAccount extends Component {

    state = {        
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        municipio: ''
    }

    componentDidMount() {
        const user = { ...localStorage }
        delete user.role
        this.setState({ ...user })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })     
    }

    async editUser(e) {
        e.preventDefault()
        let edUser
        const { name, surName, municipio, password, confirmPassword } = this.state
        if (password !== confirmPassword) alert('Senhas não conferem')
            else if (name && surName && municipio && password && confirmPassword) {
                await this.setState({ municipio: formatMun(this.state.municipio), email: this.state.email.toLowerCase() })
                await axios.put('/api/editUser', this.state)
                    .then(res => {
                        edUser = res.data
                        for (let [key, value] of Object.entries(edUser)) {
                            localStorage.setItem(key, value)
                        }
                        reduxToastr('sucess', 'Dados atualizados', edUser.name)
                    })
                    .catch(err => console.log(err.message))
                    
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else alert('Favor preencher todos os campos.')
    }

    render() {

        return (
            <div>
                <div className="container col s12 m12 l6" style={{ marginTop: '1%' }}>
                    <div className="card-panel">
                        <MyAccountTemp
                            values={this.state}
                            handleChange={this.handleChange.bind(this)}
                            handleSubmit={this.editUser.bind(this)}
                        />
                    </div>
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
    return bindActionCreators({ reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);