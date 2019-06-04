import React, { Component } from 'react';
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import ProcessTemplate from './processTemplate'
import { sendMail } from '../common/sendMail'
import { loadProcessData, loadFilesData, loading, reduxToastr } from './../cadastro/cadActions'
import { logout } from '../auth/logout';

class ProcessContainer extends Component {

    constructor() {
        super()
        this.escFunction = (event) => {
            const { logDetails } = this.state
            if (event.keyCode === 27) {
                if (logDetails) this.clearLog()
            }
        }
    }

    state = {
        selectedOption: '',
        selectedId: '',
        logDetails: false,
        logIndex: '',
        notaTecnica: '',
        anuenciaFile: '',
        form: '',
        prefeituras: []
    }

    optionSelect(e) {
        this.setState({ selectedOption: e.target.id })
    }

    componentDidMount() {
        this.setState({ selectedId: this.props.data.selectedId })
        axios.get('/api/prefeituras')
            .then(res => this.setState({ prefeituras: res.data }))
            .catch(err => console.log(err))
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount() {
        this.props.clear()
        document.removeEventListener("keydown", this.escFunction, false);
    }

    divConfig(e) {
        let id = e.name
        if (id !== this.state.selectedOption) {
            let format = {
                stylez:
                {
                    minHeight: '8vh', border: '1px solid #ddd', borderRadius: '2%', borderBottom: '', borderTopLeftRadius: '15%',
                    borderTopRightRadius: '15%'
                },
                class: 'col s12 m6 l3 z-depth-2'
            }
            return format
        } else {
            let format = {
                stylez:
                {
                    minHeight: '8vh', border: '2px solid #bbb', borderRadius: '2%', borderBottom: '', borderTopLeftRadius: '15%',
                    borderTopRightRadius: '15%', backgroundColor: '#fcfcfc'
                },
                class: 'col s12 m6 l3'
            }
            return format
        }

    }

    showLog(e) {
        this.setState({ logIndex: e.target.id, logDetails: true })
    }

    clearLog() {
        this.setState({ logDetails: false, logIndex: '' })
    }

    async fileUpload(e) {

        let k = ['notaTecnica', 'anuenciaFile']
        let formData = new FormData()
        formData.append('processId', this.state.selectedId)
        await this.setState({
            ...this.state, [e.target.name]: e.target.files[0]
        })

        await k.forEach(inputName => {
            for (let keys in this.state) {
                keys.match(inputName) ?
                    (formData.append(inputName, this.state[keys]))
                    : void 0
            }
        })
        this.setState({ form: formData })
    }

    async handleSubmit(e) {
        e.preventDefault()

        const processo = this.props.redux.processCollection.filter(el => el._id.match(this.props.data.selectedId))[0]
        const emp = this.props.redux.empCollection.filter(el => el._id.match(processo.empId))[0]
        const rt = this.props.redux.rtCollection.filter(el => el._id.match(processo.rtId))[0]

        const { modalidade, nomeEmpreendimento, munEmpreendimento } = processo
        const user = { ...localStorage },
            { name, surName, email } = user

        let filesArray = []
        if (!this.state.notaTecnica || !this.state.anuenciaFile) {
            alert('Favor anexar a nota técnica e a certidão de anuência')
        } else {
            this.props.loading(true)
            try {
                await axios.post('/api/fileUpload', this.state.form)
                    .then(res => {
                        const files = res.data.file
                        files.forEach(file => filesArray.push(file))
                    })
                await axios.put('/api/editProcess', {
                    item: {
                        _id: this.state.selectedId,
                        status: 'Processo Anuído',
                        tecnico: name + ' ' + surName
                    },
                    processHistory: {
                        label: 'Processo Anuído',
                        createdAt: new Date(),
                        files: filesArray,
                        user: {
                            nome: name + ' ' + surName,
                            email: email
                        }
                    }
                })
                await reduxToastr('sucess', 'Processo Anuído.')
                await sendMail(emp.email, rt.emailRt, emp.nome, modalidade, nomeEmpreendimento, munEmpreendimento, 'Processo Anuído.')
                setTimeout(() => {
                    this.props.loading(false)
                    this.props.loadProcessData(); this.props.loadFilesData()
                }, 1250);

            } catch (err) {
                logout(err)
            }

        }
    }

    render() {
        let { clear, data, redux, close, changeValue } = this.props
        let process
        let empreend
        let rt
        if (data.selectedId) {
            process = redux.processCollection.filter(el => el._id.match(data.selectedId))[0]
            if (process) {
                empreend = redux.empCollection.filter(el => el._id.match(process.empId))[0]
                rt = redux.rtCollection.filter(el => el._id.match(process.rtId))[0]
            }
        }
        if (data.selectedId) {
            data.showFiles = true

            return (
                <div className='container'>
                    <ProcessTemplate
                        data={data}
                        redux={redux}
                        clear={clear}
                        close={close}
                        process={process}
                        empreend={empreend}
                        rt={rt}
                        prefeituras={this.state.prefeituras}
                        match={this.props.match}
                        optionSelect={this.optionSelect.bind(this)}
                        selectedOption={this.state.selectedOption}
                        divConfig={this.divConfig.bind(this)}
                        changeValue={changeValue}
                        log={this.state}
                        showLog={this.showLog.bind(this)}
                        clearLog={this.clearLog.bind(this)}
                        upload={this.fileUpload.bind(this)}
                        submit={this.handleSubmit.bind(this)}
                    />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cadastro: state.cadastro
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loadProcessData, loadFilesData, loading, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessContainer);
