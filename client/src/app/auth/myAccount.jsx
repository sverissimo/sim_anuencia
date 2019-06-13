import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadProcessData, reduxToastr } from '../cadastro/cadActions'

import MyAccountTemp from './myAccountTemp'
//import { formatMun } from '../config/formatMun'

class MyAccount extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        municipio: ''
    }

    componentDidMount() {
        const user = { ...localStorage },
            { processCollection } = this.props.redux

        this.setState({ ...user })
        !processCollection[0] ? this.props.loadProcessData() : void 0
        setTimeout(() => {
            let color = document.getElementById('setcolor').style.backgroundColor
            this.setState({ setColor: color })
        }, 200)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    async editUser(e) {
        e.preventDefault()
        let edUser
        const { password, confirmPassword, _id } = this.state
        const pass = { _id, password, confirmPassword }

        if (password !== confirmPassword) alert('Senhas não conferem')

        else if (pass.password !== '') {
            //await this.setState({ municipio: formatMun(this.state.municipio), email: this.state.email.toLowerCase() })
            await axios.put('/api/editUser', pass)
                .then(res => {
                    edUser = res.data
                    reduxToastr('sucess', 'Senha alterada com sucesso', edUser)
                    this.setState({ password: '', confirmPassword: '', })
                })
                .catch(err => console.log(err.message))


        } else alert('Favor preencher todos os campos.')
    }

    render() {
        let { name, surName, municipio, email } = this.state
        const { processCollection } = this.props.redux,
            count = processCollection.length,
            compName = name + ' ' + surName

        return (
            <div>
                <div className="container col s12 m12 l6" style={{ marginTop: '0.5%' }}>
                    <div style={{ width: '100%', backgroundColor: this.state.setColor, padding: '1px 0', filter: 'brightness(200%)' }}>
                        <h5 style={{ paddingBottom: '1%' }} >Alterar minha senha </h5>
                        <center>
                            <img src="/images/avatar.jpg" style={{ filter: 'brightness(50%)', borderRadius: '50%' }} alt="" width='10%' height='10%' />
                        </center>
                        <div className='row' style={{ padding: '1% 15% 0 15%' }}>
                            {[[compName, 'Nome'], [email, 'Email'], [municipio, 'Município'], [count, 'Processos']]
                                .map((el, i) => (
                                    <div className="col s6 m3 center" key={i}>
                                        <div>
                                            {el[1]}
                                        </div>
                                        <div style={{ fontWeight: '500', paddingBottom: '15px' }}>
                                            {el[0]}
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
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
        redux: state.cadastro
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadProcessData, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);