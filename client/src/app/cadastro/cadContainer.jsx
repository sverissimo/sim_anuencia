import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadEmpData, loadRtData, loadProcessData } from './cadActions';

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
        setColor: ''
    }

    componentDidMount() {

        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        
        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })
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

    handleBlur = event => {

        if (event.target.name === 'cep' && this.state.empMatch === '') {

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
            void 0
        }
    }

    handleChange = event => {
        event.preventDefault();

        let empMatch = []
        let rtMatch = []

        if (event.target.name === 'nome') {
            let nameInput = event.target.value
            empMatch = this.props.cadastro.empCollection.filter(el => el.nome.toLowerCase().match(nameInput.toLowerCase()))
            if (nameInput && empMatch[0]) {
                this.setState({
                    ...this.state, [event.target.name]: event.target.value, empMatch: empMatch
                })
            } else {
                empMatch = ''
                this.setState({
                    ...this.state, [event.target.name]: event.target.value, empMatch: empMatch
                })
            }
        } else if (event.target.name === 'nomeRt') {
            let autoCompleteRt = event.target.value
            rtMatch = this.props.cadastro.rtCollection.filter(el => el.nomeRt.toLowerCase().match(autoCompleteRt.toLowerCase()))
            if (autoCompleteRt && rtMatch[0]) {
                this.setState({
                    ...this.state, [event.target.name]: event.target.value, rtMatch: rtMatch
                })
            } else {
                rtMatch = ''
                this.setState({
                    ...this.state, [event.target.name]: event.target.value, rtMatch: rtMatch
                })

            }
        } else {
            this.setState({
                ...this.state, [event.target.name]: event.target.value
            })
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
        if (!this.state.empMatch && !this.state.empMatch[0] && !this.state.rtMatch && !this.state.rtMatch[0]) {
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
                    this.setState({ empId: res.data.Cadastro_id })
                })
                .then((res) =>
                    axios.post('/api/cadastro_rt', {
                        nomeRt: this.state.nomeRt,
                        emailRt: this.state.emailRt,
                        phoneRt: this.state.phoneRt
                    }))
                .then(res => {
                    this.setState({ rtId: res.data.RT_id })
                })
                .then(res =>
                    axios.post('/api/cadastro_process', {
                        nomeEmpreendimento: this.state.nomeEmpreendimento,
                        area: this.state.area,
                        modalidade: this.state.modalidade,
                        munEmpreendimento: this.state.munEmpreendimento,
                        empId: this.state.empId,
                        rtId: this.state.rtId
                    })
                )
        } else if (!this.state.empMatch && !this.state.empMatch[0] && this.state.rtMatch && this.state.rtMatch[0]) {
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
                    this.setState({ empId: res.data.Cadastro_id })
                })
                .then(res =>
                    axios.post('/api/cadastro_process', {
                        nomeEmpreendimento: this.state.nomeEmpreendimento,
                        area: this.state.area,
                        modalidade: this.state.modalidade,
                        munEmpreendimento: this.state.munEmpreendimento,
                        empId: this.state.empId,
                        rtId: this.state.rtId
                    })
                )

        } else if (this.state.empMatch && this.state.empMatch[0] && !this.state.rtMatch && !this.state.rtMatch[0]) {

            axios.post('/api/cadastro_rt', {
                nomeRt: this.state.nomeRt,
                emailRt: this.state.emailRt,
                phoneRt: this.state.phoneRt
            })
                .then(res => {
                    this.setState({ rtId: res.data.RT_id })
                })
                .then(res =>
                    axios.post('/api/cadastro_process', {
                        nomeEmpreendimento: this.state.nomeEmpreendimento,
                        area: this.state.area,
                        modalidade: this.state.modalidade,
                        munEmpreendimento: this.state.munEmpreendimento,
                        empId: this.state.empId,
                        rtId: this.state.rtId
                    })
                )
        } else if (this.state.empMatch && this.state.empMatch[0] && this.state.rtMatch && this.state.rtMatch[0]) {
            axios.post('/api/cadastro_process', {
                nomeEmpreendimento: this.state.nomeEmpreendimento,
                area: this.state.area,
                modalidade: this.state.modalidade,
                munEmpreendimento: this.state.munEmpreendimento,
                empId: this.state.empId,
                rtId: this.state.rtId
            })
        }
    }

    handleBlurName = () => {

        if (this.state.empMatch !== '') {
            this.setState({
                ...this.state,
                empId: this.state.empMatch[0]._id,
                phone: this.state.empMatch[0].phone,
                cpf: this.state.empMatch[0].cpf,
                cep: this.state.empMatch[0].cep,
                numero: this.state.empMatch[0].numero,
                complemento: this.state.empMatch[0].complemento,
                email: this.state.empMatch[0].email,
                rua: this.state.empMatch[0].rua,
                bairro: this.state.empMatch[0].bairro,
                cidade: this.state.empMatch[0].cidade,
                uf: this.state.empMatch[0].uf
            })
            this.enableRtInput();

        } else {
            this.setState({
                ...this.state,
                empId: '',
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
                rtId: this.state.rtMatch[0]._id,
                phoneRt: this.state.rtMatch[0].phoneRt,
                emailRt: this.state.rtMatch[0].emailRt,
            })
            this.enableProcessInput()

        } else {
            this.setState({
                ...this.state,
                rtId: '',
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
                    color={this.state.setColor}
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);