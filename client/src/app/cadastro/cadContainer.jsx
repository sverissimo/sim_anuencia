import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadEmpData, loadRtData, loadProcessData, reduxToastr } from './cadActions';
import { sendMail } from '../common/sendMail'

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
        empMatch: null,
        rtMatch: null,
    }

    componentDidMount() {

        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
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

        const collection = this.props.cadastro.processCollection
        let procThisYear = []

        collection.map(el =>
            procThisYear.push(new Date(el.createdAt).getFullYear())
        )

        const currentYear = Number(new Date().getFullYear())
        const proc = procThisYear.filter(el => el === currentYear)

        let count = proc.length
        let nProcess = (count + 1) + '/' + currentYear

        await this.setState({
            ...this.state, nProcess: nProcess, enableRt: 'disabled',
            enableProcess: '', enableEmp: 'disabled'
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
    };

    async handleSubmit(e) {
        e.preventDefault()

        const { nome, nomeRt, nomeEmpreendimento, modalidade, munEmpreendimento, empMatch,
            rtMatch, empId, rtId } = this.state

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
            nProcess: this.state.nProcess,
            nomeEmpreendimento: this.state.nomeEmpreendimento,
            modalidade: this.state.modalidade,
            area: this.state.area,
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
                }
            ],
        }

        if (!nome || !nomeRt || !nomeEmpreendimento) {
            alert('Favor preencher os dados do empreendedor, RT e empreendimento.')
        } else if (!modalidade || !munEmpreendimento) {
            alert('Favor preencher a modalidade e o município do empreendimento.')
        } else if (nome && (nomeRt && nomeEmpreendimento && (modalidade && munEmpreendimento))) {
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
                await reduxToastr('sucess', 'Processo Cadastrado.')
                await sendMail(cadEmp.email, cadRt.emailRt, cadEmp.nome, cadProcess.modalidade, cadProcess.nomeEmpreendimento, cadProcess.munEmpreendimento, 'Processo cadastrado.')
                setTimeout(() => {
                    window.location.reload()
                }, 2500)
            } catch (err) {
                console.log(err)
                reduxToastr('Erro!', 'Sessão expirada!')
                setTimeout(() => {
                    window.location.reload()
                }, 1900);
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);