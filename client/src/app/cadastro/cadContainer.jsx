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
        empMatch: null,
        rtMatch: null,
    }

    componentDidMount() {

        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
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
    enableProcessInput() {

        this.setState({
            enableProcess: '',
            enableEmp: 'disabled',
            enableRt: 'disabled'
        })

        const collection = this.props.cadastro.processCollection
        let procThisYear = []

        collection.map(el =>
            procThisYear.push(new Date(el.createdAt).getFullYear())
        )

        const currentYear = Number(new Date().getFullYear())
        const proc = procThisYear.filter(el => el === currentYear)

        let count = proc.length

        let nProcess = (count + 1) + '/' + currentYear

        this.setState({
            ...this.state, nProcess: nProcess, enableRt: 'disabled',
            enableProcess: '', enableEmp: 'disabled'
        })

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

    handleBlur(event) {
        event.preventDefault()
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
            if (empMatch && rtMatch) {
                cadProcess.empId = empId
                cadProcess.rtId = rtId
                axios.post('/api/cadastro_process', cadProcess)
                    .then(res => window.location.reload())
            } else if (empMatch && !rtMatch) {
                cadProcess.empId = empId
                axios.post('/api/cadastro_rt', cadRt)
                    .then(res => {
                        cadProcess.rtId = res.data.RT_id
                        axios.post('/api/cadastro_process', cadProcess)
                    }).then(res => window.location.reload())
            } else if (!empMatch && rtMatch) {
                cadProcess.rtId = rtId
                axios.post('/api/cadastro_emp', cadEmp)
                    .then(res => {
                        cadProcess.empId = res.data.Cadastro_id
                        axios.post('/api/cadastro_process', cadProcess)
                    }).then(res => window.location.reload())
            } else if (!empMatch && !rtMatch) {
                axios.post('/api/cadastro_emp', cadEmp)
                    .then(res => {
                        cadProcess.empId = res.data.Cadastro_id
                        axios.post('/api/cadastro_rt', cadRt)
                            .then(res => {
                                cadProcess.rtId = res.data.RT_id
                                axios.post('/api/cadastro_process', cadProcess)
                            }).then(res => window.location.reload())
                    })
            }
        }



        /*  if (!this.state.rtMatch) {
 
             Object.assign(cadObj, { rt: cadRt })
         } else {
             Object.assign(cadObj, { rtId: this.state.rtId })
         }
         Object.assign(cadObj, { process: cadProcess })
         console.log(cadObj)
 
         axios.post('/api/cadastro_emp', cadObj.emp)
             .then(res => console.log(res.data)) */


        /* if (!this.state.empMatch && !this.state.rtMatch) {
            axios.post('/api/cadastro_emp/', cadEmp)
                .then(res => {
                    cadProcess.empId = res.data.Cadastro_id
                })
                .then(axios.post('/api/cadastro_rt', cadRt))
                .then(res => cadProcess.rtId = res.data.RT_id)
                .then(axios.post('/api/cadastro_process', cadProcess))
        } else if (!this.state.empMatch) {
            axios.post('/api/cadastro_emp', cadEmp)
                .then(res => cadProcess.empId = res.data.Cadastro_id)
                .then(axios.post('/api/cadastro_process', cadProcess))
        } else if (!this.state.rtMatch) {
            axios.post('/api/cadastro_rt', cadRt)
                .then(res => cadProcess.rtId = res.data.RT_id)
                .then(axios.post('/api/cadastro_process', cadProcess))
        } else {
            axios.post('/api/cadastro_process', cadProcess)
        } */

        /* .then(res => axios.post('/api/cadastro_rt', cadRt))
        .then(res => cadProcess.rtId = res.data.RT_id)
        .then(res => axios.post('/api/cadastro_process', cadProcess)) */

        /*  else if (!this.state.empMatch && (!this.state.empMatch[0] && (this.state.rtMatch && this.state.rtMatch[0]))) {
            await axios.post(('/api/cadastro_emp/'), cadEmp)
                .then(res => cadProcess.empId = res.data.Cadastro_id)
                .then(res => axios.post('/api/cadastro_process', cadProcess))
 
        } else if (this.state.empMatch && (this.state.empMatch[0] && (!this.state.rtMatch && !this.state.rtMatch[0]))) {
            await axios.post('/api/cadastro_rt', cadRt)
                .then(res => cadProcess.rtId = res.data.RT_id)
                .then(res => axios.post('/api/cadastro_process', cadProcess))
 
        } else if (this.state.empMatch && (this.state.empMatch[0] && (this.state.rtMatch && this.state.rtMatch[0]))) {
            await axios.post('/api/cadastro_process', cadProcess)
        }
 */
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

    handleBlurRtName() {

        if (this.state.rtMatch && (this.state.rtMatch[0] && this.state.rtMatch[0].nomeRt === this.state.nomeRt)) {
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


        } else if (this.state.rtMatch && (this.state.rtMatch[0] && this.state.rtMatch[0] !== this.state.nomeRt)) {
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastroContainer);