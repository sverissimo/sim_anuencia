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
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })

    }

    enableRtInput(e) {

        this.setState({
            enableEmp: 'disabled',
            enableRt: '',
            enableProcess: 'disabled',
        })
        setTimeout(() => {
            document.getElementById("rtInput").focus()
        }, 50);

    }
    enableProcessInput(e) {
        this.setState({
            enableProcess: '',
            enableEmp: 'disabled',
            enableRt: 'disabled'
        })
        if (this.props.cadastro.processCollection[0]) {

            const collection = this.props.cadastro.processCollection
            let procThisYear = []

            collection.map(el =>
                procThisYear.push(new Date(el.createdAt).getFullYear())
            )

            const currentYear = Number(new Date().getFullYear())
            let count = procThisYear.filter(el => el === currentYear).length

            let nProcess = (count + 1) + '/' + currentYear

            this.setState({ nProcess: nProcess })
        }
        setTimeout(() => {
            document.getElementById("nomeEmpreendimento").focus()
        }, 50);


    }
    enableEmpInput(e) {
        this.setState({
            enableRt: 'disabled',
            enableProcess: 'disabled',
            enableEmp: '',
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
        
        const cadEmp = {
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
        }
        const cadRt = {
            nomeRt: this.state.nomeRt,
            emailRt: this.state.emailRt,
            phoneRt: this.state.phoneRt
        }
        const cadProcess = {
            nProcess: this.state.nProcess,
            nomeEmpreendimento: this.state.nomeEmpreendimento,
            modalidade: this.state.modalidade,
            area: this.state.area,
            munEmpreendimento: this.state.munEmpreendimento,
            status: 'Processo cadastrado',
            tecnico: 'Técnico não alocado',
            cgt: 'CGT não agendada',
            vistoria: 'Vistoria não agendada',
            daeDir: 'DAE não recolhida',
            daeAnuencia: 'DAE não recolhida',
            empId: this.state.empId,
            rtId: this.state.rtId,
            fileObjects: [],
            processHistory: [
                {
                    label: 'Processo cadastrado',
                    createdAt: new Date(),
                }
            ],
        }
        if (!this.state.nome || (!this.state.nomeRt || !this.state.nomeEmpreendimento)) {
            alert('Favor preencher os nomes do empreendedor, RT e processo.')
        }
        else if (!this.state.empMatch && (!this.state.empMatch[0] && (!this.state.rtMatch && !this.state.rtMatch[0]))) {
            axios.post(('/api/cadastro_emp/'), cadEmp)
                .then(res => cadProcess.empId = res.data.Cadastro_id)
                .then(res => axios.post('/api/cadastro_rt', cadRt))
                .then(res => cadProcess.rtId = res.data.RT_id)
                .then(res => axios.post('/api/cadastro_process', cadProcess))

        } else if (!this.state.empMatch && (!this.state.empMatch[0] && (this.state.rtMatch && this.state.rtMatch[0]))) {
            axios.post(('/api/cadastro_emp/'), cadEmp)
                .then(res => cadProcess.empId = res.data.Cadastro_id)
                .then(res => axios.post('/api/cadastro_process', cadProcess))

        } else if (this.state.empMatch && (this.state.empMatch[0] && (!this.state.rtMatch && !this.state.rtMatch[0]))) {
            axios.post('/api/cadastro_rt', cadRt)
                .then(res => cadProcess.rtId = res.data.RT_id)
                .then(res => axios.post('/api/cadastro_process', cadProcess))

        } else if (this.state.empMatch && (this.state.empMatch[0] && (this.state.rtMatch && this.state.rtMatch[0]))) {
            axios.post('/api/cadastro_process', cadProcess)
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

        if (this.state.rtMatch && (this.state.rtMatch[0] && this.state.rtMatch[0].nomeRt === this.state.nomeRt )) {
            this.setState({
                rtId: this.state.rtMatch[0]._id,
                phoneRt: this.state.rtMatch[0].phoneRt,
                emailRt: this.state.rtMatch[0].emailRt,
            })

            setTimeout(() => {
                if (this.state.enableEmp !== '') {
                    this.enableProcessInput()
                }
            }, 200);


        } else if (this.state.rtMatch && (this.state.rtMatch[0] && this.state.rtMatch[0] !== this.state.nomeRt )) {
            this.setState({
                ...this.state,
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
                    handleChange={(change) => this.handleChange(change)}
                    handleBlurName={this.handleBlurName}
                    handleBlurRtName={this.handleBlurRtName}
                    handleSubmit={(submit) => this.handleSubmit(submit)}
                    handleBlur={this.handleBlur}
                    enableRtInput={e => this.enableRtInput(e)}
                    enableProcessInput={e => this.enableProcessInput(e)}
                    enableEmpInput={e => this.enableEmpInput(e)}
                    backToRt={this.backToRt.bind(this)}
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