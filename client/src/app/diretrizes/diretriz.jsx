import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'
import DateTime from 'react-datetime';
import styles from '../css/react-datetime.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadFilesData, loadTecnicos, setColor, loading, reduxToastr } from '../cadastro/cadActions'
import { setDate } from './diretrizActions'
import { sendMail } from '../common/sendMail'
import { logout } from '../auth/logout'

import DiretrizTemplate from './diretrizTemplate';
import DiretrizRow from './diretrizRow';
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles';

class Diretriz extends Component {

    constructor() {
        super()
        this.escFunction = this.escFunction.bind(this)
    }
    state = {
        searchValue: '',
        dataMatch: [],
        selectedId: '',
        checked: null,
        files: [],
        form: null,
        diretrizFile: '',
        showEmpDetails: false,
        showRtDetails: false,
        empId: '',
        rtId: '',
        showFiles: false,
        filesCollection: '',
        daeDir: '',
        anexaDiretriz: false,
        m: moment(),
        cgtCalendar: false,
        vistoriaCalendar: false,
        dirStatus: {
            label: 'Pendências na emissão de Diretrizes',
            createdAt: '',
            cgtOk: false,
            vistoriaOk: false,
            daeOk: false,
            dirMunOk: false,
            pendencias: ''
        }

    }

    escFunction(event) {
        if (event.keyCode === 27) {
            (this.state.cgtCalendar || this.state.vistoriaCalendar) && this.hideCalendar()
            this.closeDetails()
        }
    }
    componentDidMount() {

        let { empCollection, rtCollection, processCollection, tecCollection } = this.props.redux
        !empCollection[0] ? this.props.loadEmpData() : void 0
        !processCollection[0] ? this.props.loadProcessData() : void 0
        !rtCollection[0] ? this.props.loadRtData() : void 0
        !tecCollection[0] ? this.props.loadTecnicos() : void 0

        this.props.loadFilesData()

        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    handleSearch(e) {
        let dirStatus = this.state.dirStatus
        dirStatus.cgtOk = false
        dirStatus.vistoriaOk = false
        dirStatus.dirMunOk = false
        dirStatus.daeOk = false

        this.setState({ ...this.state, searchValue: e.target.value, checked: false, anexaDiretriz: false, dirStatus: dirStatus });
        let clearRadio = document.getElementsByName('group1')
        clearRadio.forEach(radio => radio.checked = false)
    }

    clearSearch(e) {
        let { dirStatus } = this.state
        dirStatus.cgtOk = false
        dirStatus.vistoriaOk = false
        dirStatus.dirMunOk = false
        dirStatus.daeOk = false

        this.setState({ ...this.state, searchValue: '', checked: null, dirStatus: dirStatus, anexaDiretriz: false });
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
        document.getElementById(this.state.checked).checked = 'checked'
        const processo = this.props.redux.processCollection.filter(el => el._id.match(this.state.selectedId))[0]

        let dirStatus = { ...this.state.dirStatus }
        if (processo.area <= 300000) {
            dirStatus.cgtOk = true
            this.setState({ dirStatus })
        }
    }

    async fileUpload(e) {

        let { name, files } = e.target

        if (files[0].size > 4194304) {
            document.getElementsByName(name)[0].value = ''
            alert('Arquivo excedeu o limite permitido (4MB)!')
        }

        let formData = new FormData()
        formData.append('processId', this.state.selectedId)
        await this.setState({
            ...this.state, [name]: files[0]
        })
        await formData.append('diretrizFile', this.state.diretrizFile)
        this.setState({ form: formData })
    }

    async handleSubmit(e) {
        e.preventDefault()
        const newStatus = 'Diretrizes Metropolitanas emitidas'
        const processo = this.props.redux.processCollection.filter(el => el._id.match(this.state.selectedId))[0]
        const emp = this.props.redux.empCollection.filter(el => el._id.match(processo.empId))[0]
        const rt = this.props.redux.rtCollection.filter(el => el._id.match(processo.rtId))[0]

        const { modalidade, nomeEmpreendimento, munEmpreendimento } = processo
        const user = { ...localStorage }

        let filesArray = []
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
                    status: newStatus,
                    tecnico: user.name + ' ' + user.surName
                },
                processHistory: {
                    label: newStatus,
                    createdAt: new Date(),
                    files: filesArray,
                    user: {
                        nome: user.name + ' ' + user.surName,
                        email: user.email
                    }
                }
            })
            this.props.loading(false)
            await reduxToastr('sucess', newStatus)
            await sendMail(emp.email, rt.emailRt, emp.nome, modalidade, nomeEmpreendimento, munEmpreendimento, newStatus + '.')
            await this.clearSearch()
            await this.closeDetails()
            this.props.loadProcessData() && this.props.loadFilesData()

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

    checkItem(e) {
        let field = e.target.id
        let dirStatus = this.state.dirStatus

        dirStatus[field] = !this.state.dirStatus[field]
        let { cgtOk, vistoriaOk, daeOk, dirMunOk } = dirStatus
        cgtOk === true && (vistoriaOk === true && (dirMunOk === true && daeOk === true)) ?
            this.setState({ anexaDiretriz: true }) : this.setState({ anexaDiretriz: false })
    }

    handleChange(e) {
        let input = e.target.value
        let dirStatus = this.state.dirStatus
        dirStatus.pendencias = input
        this.setState({
            dirStatus: dirStatus
        })
    }

    async enviaPendencias(e) {
        e.preventDefault()
        const processo = this.props.redux.processCollection.filter(el => el._id.match(this.state.selectedId))[0]
        const emp = this.props.redux.empCollection.filter(el => el._id.match(processo.empId))[0]
        const rt = this.props.redux.rtCollection.filter(el => el._id.match(processo.rtId))[0]

        const { modalidade, nomeEmpreendimento, munEmpreendimento } = processo

        const user = { ...localStorage }

        const newStatus = 'Pendências para emissão de Diretrizes Metropolitanas.'
        let dirStatus = this.state.dirStatus
        this.props.loading(true)
        try {
            await axios.put('/api/editProcess', {
                item: {
                    _id: this.state.selectedId,
                    status: 'Processo cadastrado',
                    tecnico: user.name + ' ' + user.surName
                },
                processHistory: {
                    label: 'Pendências para emissão de diretrizes',
                    createdAt: new Date(),
                    pendencias: dirStatus.pendencias,
                    dirCheckList: {
                        cgtOk: dirStatus.cgtOk,
                        vistoriaOk: dirStatus.vistoriaOk,
                        daeOk: dirStatus.daeOk,
                        dirMunOk: dirStatus.dirMunOk,
                    },
                    user: {
                        nome: user.name + ' ' + user.surName,
                        email: user.email
                    }
                }
            }
            )
            await this.props.loading(false)
            await reduxToastr('sucess', newStatus)
            await sendMail(emp.email, rt.emailRt, emp.nome, modalidade, nomeEmpreendimento, munEmpreendimento, newStatus)
            await this.clearSearch()
            await this.closeDetails()
            this.props.loadProcessData()

        } catch (err) {
            logout(err)
        }
    }

    showCalendar(el) {
        this.setState({ ...this.state, [`${el.target.id}Calendar`]: true })
    }

    hideCalendar(d) {
        let selectCalendar
        if (this.state.cgtCalendar) {
            selectCalendar = 'cgt'
        } else {
            selectCalendar = 'vistoria'
        }
        this.setState({ ...this.state, [`${selectCalendar}Calendar`]: false })
        this.props.setDate(this.state.m, this.state.selectedId, selectCalendar)
    }

    setDate = d => {
        this.state.cgtCalendar ?
            this.setState({ m: d._d, cgt: d._d })
            :
            this.setState({ m: d._d, vistoria: d._d })
    }

    renderInput = (props, openCalendar, closeCalendar) => {
        function clear() {
            props.onChange({ target: { value: '' } });
        }
        props.style = { marginBottom: '0px', backgroundColor: '#F8F8FF', fontWeight: 500 }
        props.className = 'center-align'
        return (
            <div>
                <i className="material-icons right" style={{ cursor: 'pointer', color: 'red' }} onClick={closeCalendar}>close</i>
                <i className="material-icons" style={{ cursor: 'pointer', color: 'gold' }} onClick={clear}>backspace</i>
                <input className="red" {...props} />
            </div>
        )
    }

    render() {

        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        const filteredList = this.props.redux.processCollection.filter(el => el.status === 'Aguardando Diretrizes Metropolitanas')

        if (input && !this.state.checked) {
            dataMatch = filteredList.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        } else if (this.state.checked || (this.state.checked && input)) {
            dataMatch = filteredList.filter(el => el._id.toLowerCase().match(this.state.selectedId))
        } else {
            dataMatch = filteredList
        }

        return (
            <div>
                <div>
                    <DiretrizTemplate
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
                        showFiles={this.showFiles.bind(this)}
                    >
                        <DiretrizRow
                            selectedId={this.state.selectedId}
                            showFiles={this.state.showFiles}
                            checkItem={this.checkItem.bind(this)}
                            close={this.closeDetails.bind(this)}
                            processCollection={this.props.redux.processCollection}
                            filesCollection={this.props.redux.filesCollection}
                            upload={this.fileUpload.bind(this)}
                            dirStatus={this.state.dirStatus}
                            change={this.handleChange.bind(this)}
                            enviaPendencias={this.enviaPendencias.bind(this)}
                            anexaDiretriz={this.state.anexaDiretriz}
                            showCalendar={this.showCalendar.bind(this)}
                            cgtCalendar={this.state.cgtCalendar}
                            vistoriaCalendar={this.state.vistoriaCalendar}
                        >

                        </DiretrizRow>
                    </DiretrizTemplate>
                    {
                        (this.state.cgtCalendar || this.state.vistoriaCalendar) ?

                            <div style={{
                                position: 'fixed',
                                top: '20%',
                                right: '43%',
                                width: '253px',
                                border: '2px solid #ddd',
                                backgroundColor: 'white',

                            }}
                            >
                                <DateTime
                                    renderInput={this.renderInput}
                                    className={styles}
                                    input={true}
                                    open={true}
                                    inputProps={{ readOnly: true }}
                                    value={this.state.m}
                                    onChange={this.setDate.bind(this)}
                                    onBlur={this.hideCalendar.bind(this)}
                                />
                            </div> :
                            void 0
                    }
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
                <div>
                    <ShowFiles
                        selectedId={this.state.selectedId}
                        showFiles={this.state.showFiles}
                        close={this.closeDetails.bind(this)}
                        processCollection={this.props.redux.processCollection}
                        filesCollection={this.props.redux.filesCollection}
                    />
                </div>                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        redux: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadTecnicos, loadFilesData, loading, setColor, setDate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diretriz);