import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadRtData, loadProcessData } from './cadActions';

import CadTemplate from './cadTemplate';

class CadastroContainer extends React.Component {

    state = {

        empId: '',
        rtId: '',
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
        nomeEmpreendimento: '',
        area: '',
        modalidade: '',
        munEmpreendimento: '',
        enableEmp: '',
        enableRt: 'disabled',
        enableProcess: 'disabled',
        empMatch: '',
        empCollection: [],
        rtCollection: []
    }

    componentWillMount() {
        axios.get('/api/showEmpreend')
            .then(res => {
                this.setState({ empCollection: res.data })
            })
            .catch(err => console.log(err));

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

    handleBlur = (item) => {

        if (item.target.name === 'cep') {

            axios.get(`http://apps.widenet.com.br/busca-cep/api/cep.json?code=${this.state.cep}`
            ).then(res => {
                this.setState({
                    ...this.state,
                    rua: res.data.address,
                    bairro: res.data.district,
                    cidade: res.data.city,
                    uf: res.data.state
                })
            })

        } else {
            return null
        }
    }

    handleChange = event => {
        event.preventDefault();

        let autoComplete = event.target.value

        let empMatch = []
        empMatch = this.state.empCollection.filter(el => el.nome.toLowerCase().match(autoComplete.toLowerCase()))
        if (autoComplete && empMatch[0]) {
            this.setState({
                ...this.state.empCollection, [event.target.name]: event.target.value, empMatch: empMatch
            })

        } else {
            empMatch = ''
            this.setState({
                ...this.state.empCollection, [event.target.name]: event.target.value, empMatch: empMatch
            })
        }
        let rtMatch = []
        rtMatch = this.props.cadastro.rtCollection.filter(el => el.nomeRt.toLowerCase().match(autoComplete.toLowerCase()))
        if (autoComplete && rtMatch[0]) {
            this.setState({
                ...this.state.empCollection, [event.target.name]: event.target.value, rtMatch: rtMatch
            })

        } else {
            rtMatch = ''
            this.setState({
                ...this.state.empCollection, [event.target.name]: event.target.value, rtMatch: rtMatch
            })
        }

    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });

        axios.post(('/api/cadastro_emp/'), {

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
        })
            .then(res => {
                this.setState(
                    { ...this.state, empId: res.data.Cadastro_id }
                )
            })
            .then(res => {

                axios.post('/api/cadastro_rt', {
                    nomeRt: this.state.nomeRt,
                    emailRt: this.state.emailRt,
                    phoneRt: this.state.phoneRt
                })
                    .then(res => {
                        this.setState(
                            { ...this.state, rtId: res.data.RT_id }
                        )
                    })
                    .then(res => {
                        axios.post('/api/cadastro_process', {
                            nomeEmpreendimento: this.state.nomeEmpreendimento,
                            area: this.state.area,
                            modalidade: this.state.modalidade,
                            munEmpreendimento: this.state.munEmpreendimento,
                            empId: this.state.empId,
                            rtId: this.state.rtId
                        });
                    })
            })

    }

    handleBlurName = () => {

        if (this.state.empMatch !== '') {
            this.setState({
                ...this.state,

                phone: this.state.empMatch[0].phone,
                cpf: this.state.empMatch[0].cpf,
                cep: this.state.empMatch[0].cep,
                numero: this.state.empMatch[0].numero,
                complemento: this.state.empMatch[0].complemento,
                email: this.state.empMatch[0].email,
                rua: this.state.empMatch[0].rua,
                bairro: this.state.empMatch[0].bairro,
                cidade: this.state.empMatch[0].cidade,
                uf: this.state.empMatch[0].cidade

            })
            
            console.log(this.state.empMatch[0].cep)
            this.enableRtInput();

        } else {
            this.setState({
                ...this.state,
                _id: '',
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
                uf: ''
            })
        }
    }

    handleBlurRtName = () => {
        if (this.state.rtMatch !== '') {
            this.setState({
                ...this.state,
                phoneRt: this.state.rtMatch[0].phoneRt,
                emailRt: this.state.rtMatch[0].emailRt,

            })
            this.enableProcessInput()

        } else {
            this.setState({
                ...this.state,
                phoneRt: '',
                emailRt: '',

            })
        }
    }

    render() {

        return (
            <div>
                <CadTemplate
                    data={this.state}
                    config={this.props.cadastro}
                    handleChange={(change) => this.handleChange(change)}
                    handleBlurName={this.handleBlurName}
                    handleBlurRtName={this.handleBlurRtName}
                    handleSubmit={(submit) => this.handleSubmit(submit)}
                    handleBlur={this.handleBlur}
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
    return bindActionCreators({ loadRtData, loadProcessData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);