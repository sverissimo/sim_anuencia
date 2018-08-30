import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadEmpData, changeHandler } from './cadActions';

import CadTemplate from './cadTemplate';


class CadastroContainer extends React.Component {

    state = {

        id: '',
        nome: '',
        cpf: '',
        birth: '',
        phone: '',
        cep: '',
        numero: '',
        complemento: '',
        email: '',
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
        nomeRt: '',
        emailRt: '',
        phoneRt: '',
        enableEmp: '',
        enableRt: 'disabled',
        enableProcess: 'disabled',
        nProcesso: 0,
        loadedData: [],
        dataMatch: '',
        items: []

    }

    componentWillMount() {
        axios.get('/api/showEmpreend')
            .then(res => {
                this.setState({ items: res.data })
            })
            .catch(err => console.log(err))
    }
    enableRtInput(e) {
        this.setState({
            enableEmp: 'disabled',
            enableRt: '',
            enableProcess: 'disabled',
        })
    }
    enableProcessInput(e) {
        this.setState({
            enableEmp: 'disabled',
            enableRt: 'disabled',
            enableProcess: '',
        })
    }
    enableEmpInput(e) {
        this.setState({
            enableEmp: '',
            enableRt: 'disabled',
            enableProcess: 'disabled',
        })
    }

    handleBlur = cep => {

        axios.get(`http://apps.widenet.com.br/busca-cep/api/cep.json?code=${this.state.cep}`)
            .then((res) => {
                this.setState({
                    rua: res.data.address,
                    bairro: res.data.district,
                    cidade: res.data.city,
                    uf: res.data.state
                })
            })
    }

    handleChange = event => {
        event.preventDefault();
        let autoComplete = event.target.value

        let dataMatch = []
        dataMatch = this.state.items.filter(el => el.nome.toLowerCase().match(autoComplete.toLowerCase()))
        if (autoComplete && dataMatch[0]) {
            this.setState({
                ...this.state.items, [event.target.name]: event.target.value, dataMatch: dataMatch
            })

        } else {
            dataMatch = ''
            this.setState({
                ...this.state.items, [event.target.name]: event.target.value, dataMatch: dataMatch
            })
        }
    };

    handleSubmit = event => {
        this.setState({
            [event.target.name]: event.target.value
        });

        axios.post(('/api/cadastro_emp/'), {
            id: this.state.id,
            nome: this.state.nome,
            cpf: this.state.cpf,
            phone: this.state.phone,
            cep: this.state.cep,
            numero: this.state.numero,
            complemento: this.state.complemento,
            email: this.state.email,
            rua: this.state.rua,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            uf: this.state.uf,
        });
        axios.post('/api/cadastro_rt', {
            nomeRt: this.state.nomeRt,
            emailRt: this.state.emailRt,
            phoneRt: this.state.phoneRt
        })
            .then(this.setState({ ...this.state, openProcess: true }))
            .catch(err => {
                alert(err)
            })
    }

    handleBlurName = () => {

        if (this.state.dataMatch !== '') {
            this.setState({
                ...this.state,
                id: this.state.dataMatch[0].id,
                phone: this.state.dataMatch[0].phone,
                cpf: this.state.dataMatch[0].cpf,
                cep: this.state.dataMatch[0].cep,
                numero: this.state.dataMatch[0].numero,
                complemento: this.state.dataMatch[0].complemento,
                email: this.state.dataMatch[0].email,
                rua: this.state.dataMatch[0].rua,
                bairro: this.state.dataMatch[0].bairro,
                cidade: this.state.dataMatch[0].cidade,
            })
            this.enableRtInput()

        } else {
            this.setState({
                ...this.state,
                id: '',
                phone: '',
                cpf: '',
                birth: '',
                cep: '',
                numero: '',
                complemento: '',
                email: '',
                rua: '',
                bairro: '',
                cidade: '',


            })
        }
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <CadTemplate
                    data={this.state}
                    config={this.props.cadastro}
                    handleChange={(change) => this.handleChange(change)}
                    handleBlurName={this.handleBlurName}
                    handleSubmit={(submit) => this.handleSubmit(submit)}
                    handleBlur={(cep) => this.handleBlur(cep)}
                    enableRtInput={e => this.enableRtInput(e)}
                    enableProcessInput={e => this.enableProcessInput(e)}
                    enableEmpInput={e => this.enableEmpInput(e)}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cadastro: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, changeHandler }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);