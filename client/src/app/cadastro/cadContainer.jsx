import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadEmpData, loadRtData, loadProcessData, loadTecnicos, loading, reduxToastr } from './cadActions';
import { sendMail } from '../common/sendMail'

import CadTemplate from './cadTemplate';
import { logout } from '../auth/logout';
import { formatMun } from '../config/formatMun'

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
        empMatch: null,
        rtMatch: null,
    }

    componentDidMount() {
        let { empCollection, rtCollection, processCollection, tecCollection } = this.props.cadastro
        !empCollection[0] ? this.props.loadEmpData() : void 0
        !processCollection[0] ? this.props.loadProcessData() : void 0
        !rtCollection[0] ? this.props.loadRtData() : void 0
        !tecCollection[0] ? this.props.loadTecnicos() : void 0
    }

    async enableRtInput(e) {
        await this.setState({
            enableEmp: 'disabled',
            enableRt: '',
            enableProcess: 'disabled',
        })
        document.getElementById("rtInput").focus()
    }

    async enableProcessInput() {

        const user = { ...localStorage }
        const municipio = formatMun(user.municipio)
        
        if (user.role === 'prefeitura') await this.setState({ munEmpreendimento: municipio })
        await this.setState({
            ...this.state, enableRt: 'disabled', enableProcess: '', enableEmp: 'disabled'
        })
        document.getElementById("nomeEmpreendimento").focus()
    }

    enableEmpInput(e) {
        this.setState({
            enableRt: 'disabled',
            enableProcess: 'disabled',
            enableEmp: '',
        })
    }

    handleBlur(event) {
        event.preventDefault()
        if (event.target.name === 'cep') {
            let getCep = this.state.cep.replace('.', '')
            axios.get(`https://api.postmon.com.br/v1/cep/${getCep}`)
                .then(res => {
                    this.setState({
                        ...this.state,
                        rua: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.cidade,
                        uf: res.data.estado
                    })
                })
        } else {
            void 0
        }
    }

    handleChange(event) {

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
    }

    async handleSubmit(e) {
        e.preventDefault()

        const { nome, nomeRt, nomeEmpreendimento, modalidade, munEmpreendimento, empMatch,
            rtMatch, empId, rtId } = this.state

        const user = { ...localStorage }

        const { tecCollection } = this.props.cadastro
        const tecnicoAlocado = tecCollection.filter(el => el.municipios.some(mun => mun === this.state.munEmpreendimento))[0]

        let procStatus
        if (modalidade === 'Loteamento') {
            procStatus = 'Processo cadastrado'
        } else {
            procStatus = 'Aguardando documentação'
        }

        const cadEmp = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            rua: this.state.rua,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            phone: this.state.phone,
            email: this.state.email,
            numero: this.state.numero,
            complemento: this.state.complemento,
            uf: this.state.uf,
        }

        const cadRt = {
            nomeRt: this.state.nomeRt,
            emailRt: this.state.emailRt,
            phoneRt: this.state.phoneRt
        }

        let cadProcess = {

            nomeEmpreendimento: this.state.nomeEmpreendimento,
            modalidade: this.state.modalidade,
            area: this.state.area.replace(/\./g, '').replace(/,/g, '.'),
            munEmpreendimento: this.state.munEmpreendimento,
            status: procStatus,
            tecnico: 'Técnico não alocado',
            cgt: 'CGT não agendada',
            vistoria: 'Vistoria não agendada',
            daeDir: 'DAE não recolhida',
            daeAnuencia: 'DAE não recolhida',
            processHistory: [
                {
                    label: 'Processo cadastrado',
                    createdAt: new Date(),
                    user: {
                        nome: user.name + ' ' + user.surName,
                        email: user.email
                    }
                }
            ],
        }

        if (this.state.modalidade === 'Desmembramento') {
            cadProcess.tecnico = tecnicoAlocado.name + ' ' + tecnicoAlocado.surName
        }
        if (!nome || !nomeRt || !nomeEmpreendimento) {
            alert('Favor preencher os dados do empreendedor, RT e empreendimento.')
        } else if (!modalidade || (!munEmpreendimento && user.role === 'admin')) {
            alert('Favor preencher a modalidade do empreendimento.')
        } else if (nome && (nomeRt && nomeEmpreendimento && (modalidade && munEmpreendimento))) {
            this.props.loading(true)
            try {

                if (empMatch && rtMatch) {
                    cadProcess.empId = empId
                    cadProcess.rtId = rtId
                    await axios.post('/api/cadastro_process', cadProcess)
                } else if (empMatch && !rtMatch) {
                    cadProcess.empId = empId
                    await axios.post('/api/cadastro_rt', cadRt)
                        .then(res => {
                            cadProcess.rtId = res.data.RT_id
                            axios.post('/api/cadastro_process', cadProcess)
                        })
                } else if (!empMatch && rtMatch) {
                    cadProcess.rtId = rtId
                    await axios.post('/api/cadastro_emp', cadEmp)
                        .then(res => {
                            cadProcess.empId = res.data.Cadastro_id
                            axios.post('/api/cadastro_process', cadProcess)
                        })
                } else if (!empMatch && !rtMatch) {
                    await axios.post('/api/cadastro_emp', cadEmp)
                        .then(res => {
                            cadProcess.empId = res.data.Cadastro_id
                            axios.post('/api/cadastro_rt', cadRt)
                                .then(res => {
                                    cadProcess.rtId = res.data.RT_id
                                    axios.post('/api/cadastro_process', cadProcess)
                                })
                        })
                }
                this.props.loading(false)
                await sendMail(cadEmp.email, cadRt.emailRt, cadEmp.nome, cadProcess.modalidade, cadProcess.nomeEmpreendimento, cadProcess.munEmpreendimento, 'Processo cadastrado.')
                reduxToastr('sucess', cadProcess.nomeEmpreendimento, 'Processo Cadastrado.')
                setTimeout(() => {
                    window.location.reload()
                }, 1600)
            } catch (err) {
                logout(err)
            }
        }
    }

    handleBlurName() {

        if (this.state.empMatch && (this.state.empMatch[0] && (this.state.empMatch[0].nome === this.state.nome))) {
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
            this.enableRtInput()

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

    async handleBlurRtName() {

        if (this.state.rtMatch && (this.state.rtMatch[0] && this.state.rtMatch[0].nomeRt === this.state.nomeRt)) {
            await this.setState({
                rtId: this.state.rtMatch[0]._id,
                phoneRt: this.state.rtMatch[0].phoneRt,
                emailRt: this.state.rtMatch[0].emailRt,
            })
            if (this.state.enableEmp !== '') {
                this.enableProcessInput()
            }

        } else {
            this.setState({
                rtId: '',
                phoneRt: '',
                emailRt: '',
            })
        }
    }

    backToRt() {
        this.setState({
            enableEmp: 'disabled',
            enableRt: '',
            enableProcess: 'disabled',
        })
    }

    render() {

        return (
            <div>
                <CadTemplate
                    data={this.state}
                    config={this.props.cadastro}
                    handleChange={this.handleChange.bind(this)}
                    handleBlurName={this.handleBlurName.bind(this)}
                    handleBlurRtName={this.handleBlurRtName.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleBlur={this.handleBlur.bind(this)}
                    enableRtInput={this.enableRtInput.bind(this)}
                    enableProcessInput={this.enableProcessInput.bind(this)}
                    enableEmpInput={this.enableEmpInput.bind(this)}
                    backToRt={this.backToRt.bind(this)}
                    color={this.props.cadastro.setColor}
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadTecnicos, loading, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);