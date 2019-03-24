import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor, loading, reduxToastr } from './../cadastro/cadActions'
import { sendMail } from '../common/sendMail'
import { logout } from '../auth/logout'
import { getTecnico } from '../common/getTecnico'

import SolicitaAnuenciaTemplate from './solicitaAnuenciaTemplate';
import SolAnuenciaFilesRow from './solAnuenciaFilesRow';
import { solAnuenciaConfig1, solAnuenciaConfig2, solDesmembConfig1, solDesmembConfig2, } from '../config/configLabels'
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles'

class SolicitaAnuencia extends Component {

    constructor() {
        super()
        this.escFunction = (event) => {
            if (event.keyCode === 27) this.closeDetails()
        }
    }

    state = {
        searchValue: '',
        dataMatch: [],
        selectedId: '',
        checked: null,
        files: [],
        form: null,
        showEmpDetails: false,
        showRtDetails: false,
        showFiles: false,
        empId: '',
        rtId: '',
        regImovel: '',
        CNDMun: '',
        empRG: '',
        art: '',
        decConform: '',
        daeAnuencia: '',
        memDescritivo: '',
        memDescTp: '',
        cemig: '',
        dtbCopasa: '',
        licAmbental: '',
        levPlan: '',
        projUrb: '',
        mapaIso: '',
        projTer: '',
        projDren: '',
        projDesmemb: ''
    }

    componentDidMount() {
        !this.props.redux.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.redux.processCollection[0] ? this.props.loadProcessData() : void 0
        !this.props.redux.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.redux.filesCollection[0] ? this.props.loadFilesData() : void 0
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    handleSearch(e) {

        this.setState({ ...this.state, searchValue: e.target.value, checked: false });
        let clearRadio = document.getElementsByName('group1')
        clearRadio.forEach(radio => radio.checked = false)
    }

    clearSearch(e) {
        this.setState({ ...this.state, searchValue: '', checked: null });
        document.getElementsByName('search')[0].value = '';
        let clearRadio = document.getElementsByName('group1')
        clearRadio.forEach(radio => {
            radio.checked = false
        })
    }

    async handleSelect(e) {
        await this.setState({
            ...this.state,
            selectedId: e.target.value.replace(/,/g, ''),
            checked: e.currentTarget.id
        })
        document.getElementById(this.state.checked).checked = 'checked';
    }

    async fileUpload(e) {

        let formData = new FormData()
        formData.append('processId', this.state.selectedId)
        this.setState({
            ...this.state, [e.target.name]: e.target.files[0]
        })

        let k = []
        let allFields = solAnuenciaConfig1.concat(solAnuenciaConfig2)
        allFields.push({
            nameInput: 'projDesmemb',
            label: 'Projeto de Desmembramento',
            tooltip: 'Planta de localização com delimitação da área em análise e indicação do perímetro urbano, em escala de 1:10000'
        })

        await allFields.map(item => k.push(item.nameInput))
        await k.forEach(inputName => {
            for (let keys in this.state) {
                keys.match(inputName) ?
                    formData.append(inputName, this.state[keys])
                    : void 0
            }
        })
        this.setState({ form: formData })
    }

    async handleSubmit(e) {
        e.preventDefault()
        const procCollection = this.props.redux.processCollection
        const { selectedId } = this.state
        const processo = this.props.redux.processCollection.filter(el => el._id.match(this.state.selectedId))[0]
        const emp = this.props.redux.empCollection.filter(el => el._id.match(processo.empId))[0]
        const rt = this.props.redux.rtCollection.filter(el => el._id.match(processo.rtId))[0]

        const { modalidade, nomeEmpreendimento, munEmpreendimento } = processo
        const user = getTecnico()

        const label = () => {
            let entradaCounter = []
            if (procCollection.length > 0) {
                const process = procCollection.filter(proc => proc._id.match(selectedId))
                entradaCounter = process[0].processHistory.filter(el => el.label)
            }
            const analise = entradaCounter.filter(el => el.label.match('Análise'))
            const count = analise.length

            if (count === 0) {
                const newLabel = 'Anuência prévia solicitada'
                return newLabel
            } else {
                const newLabel2 = 'Entrada ' + (count + 1)
                return newLabel2
            }
        }

        let filesArray = [];
        this.props.loading(true)
        try {
            await axios.post('/api/solAnuenciaUpload', this.state.form)
                .then(res => {
                    for (let key in res.data.file) {
                        filesArray.push({
                            fieldName: res.data.file[key][0].fieldname,
                            id: res.data.file[key][0].id,
                            originalName: res.data.file[key][0].originalname,
                            uploadDate: res.data.file[key][0].uploadDate,
                            contentType: res.data.file[key][0].contentType,
                            fileSize: res.data.file[key][0].size
                        })
                    }
                })
            const label2 = label()
            await axios.put('/api/editProcess', {
                item: {
                    _id: this.state.selectedId,
                    status: 'Aguardando Análise',
                },
                processHistory: {
                    label: label2,
                    createdAt: new Date(),
                    files: filesArray,
                    user: user
                }
            })
            this.props.loading(false)
            reduxToastr('sucess', 'Anuência Prévia solicitada.')
            await sendMail(emp.email, rt.emailRt, emp.nome, modalidade, nomeEmpreendimento, munEmpreendimento, 'Anuência Prévia solicitada.')
            await this.clearSearch()
            await this.closeDetails()
            await this.props.loadProcessData() && this.props.loadFilesData()
            console.log('')

        } catch (err) {
            logout(err)
        }
    }

    empDetails(e) {
        this.setState({ showEmpDetails: true, showRtDetails: false, empId: e.target.id })
    }

    rtDetails(e) {
        this.setState({ showEmpDetails: false, showRtDetails: true, rtId: e.target.id })
    }

    closeDetails() {
        this.setState({ showEmpDetails: false, showRtDetails: false, showFiles: false, empId: '', rtId: '' })
    }

    showFiles(e) {
        this.setState({ showFiles: true, selectedId: e.target.id.replace(/z/g, '') })
    }

    render() {

        let { dataMatch, selectedId, checked } = this.state
        let { processCollection } = this.props.redux
        let input = this.state.searchValue.toLowerCase()
        const filteredList = processCollection.filter(el => (el.status === 'Diretrizes Metropolitanas emitidas' || el.status.match('Pendências')) || el.status === 'Aguardando documentação')
        if (input && !checked) {
            dataMatch = filteredList.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        } else if (checked || (checked && input)) {
            dataMatch = filteredList.filter(el => el._id.toLowerCase().match(selectedId))
        } else {
            dataMatch = filteredList
        }
        let process
        let status
        let fileInput1 = []
        let fileInput2 = []
        if (selectedId) {
            process = processCollection.filter(el => el._id.match(selectedId))
            status = process[0].status
        }
        if (process && (process[0].modalidade === 'Loteamento' && (status === 'Diretrizes Metropolitanas emitidas' || status === 'Pendências'))) {
            fileInput1 = solAnuenciaConfig1
            fileInput2 = solAnuenciaConfig2
        } else if (process && (process[0].modalidade === 'Desmembramento' && (status === 'Aguardando documentação' || status === 'Pendências'))) {
            fileInput1 = solDesmembConfig1
            fileInput2 = solDesmembConfig2
        }
        return (
            <div>
                <div>
                    <SolicitaAnuenciaTemplate
                        data={this.state}
                        redux={this.props.redux}
                        search={e => this.handleSearch(e)}
                        searchArray={dataMatch}
                        selectProcess={this.handleSelect.bind(this)}
                        submitFiles={this.handleSubmit.bind(this)}
                        setColor={this.props.redux.setColor}
                        clear={this.clearSearch.bind(this)}
                        empDetails={this.empDetails.bind(this)}
                        rtDetails={this.rtDetails.bind(this)}
                        array={solAnuenciaConfig1}
                        array2={solAnuenciaConfig2}
                        showFiles={this.showFiles.bind(this)}                        
                    >
                        {
                            fileInput1.map((item, i) => {
                                return (
                                    <div className='col s6' key={i}>

                                        <SolAnuenciaFilesRow
                                            object={item}
                                            key={i}
                                            upload={this.fileUpload.bind(this)}
                                        />
                                    </div>
                                )
                            })
                        }
                        <div className="row">
                            {
                                fileInput2.map((item, i) => {
                                    return (
                                        <div className='col s6' key={i}>
                                            <SolAnuenciaFilesRow
                                                object={item}
                                                key={i}
                                                upload={this.fileUpload.bind(this)}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </SolicitaAnuenciaTemplate>
                    <ShowFiles
                        selectedId={selectedId}
                        showFiles={this.state.showFiles}
                        close={this.closeDetails.bind(this)}
                        processCollection={processCollection}
                        filesCollection={this.props.redux.filesCollection}
                    />
                    <ShowDetails
                        empId={this.state.empId}
                        rtId={this.state.rtId}
                        showEmp={this.state.showEmpDetails}
                        showRt={this.state.showRtDetails}
                        close={this.closeDetails.bind(this)}
                        empCollection={this.props.redux.empCollection}
                        rtCollection={this.props.redux.rtCollection}
                    />
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        redux: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor, loading }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SolicitaAnuencia);