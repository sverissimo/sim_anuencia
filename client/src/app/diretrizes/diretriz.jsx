import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'
import DateTime from 'react-datetime';
import styles from '../css/react-datetime.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor } from '../cadastro/cadActions'
import { setCgtDate, setVistoriaDate } from './diretrizActions'

import DiretrizTemplate from './diretrizTemplate';
import DiretrizRow from './diretrizRow';
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles';

class Diretriz extends Component {

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

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
        !this.props.cadastro.filesCollection[0] ? this.props.loadFilesData() : void 0

        setTimeout(() => {
            let color = document.getElementById('setcolor').style.backgroundColor
            this.props.setColor(color)
        }, 50);

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
        let dirStatus = this.state.dirStatus
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

    handleSelect(e) {

        this.setState({
            ...this.state,
            selectedId: e.target.value.replace(/,/g, ''),
            checked: e.currentTarget.id
        })
        setTimeout(() => {
            document.getElementById(this.state.checked).checked = 'checked';
        }, 20);

    }

    fileUpload(e) {

        let formData = new FormData()
        formData.append('processId', this.state.selectedId)
        this.setState({
            ...this.state, [e.target.name]: e.target.files[0]
        })

        setTimeout(() => {
            formData.append('diretrizFile', this.state.diretrizFile)
        }, 100);

        setTimeout(() => {
            this.setState({ form: formData })
        }, 200);
    }

    async handleSubmit(e) {
        e.preventDefault()
        let filesArray = [];
        await axios.post('/api/diretrizUpload', this.state.form)
            .then(res => {
                for (let key in res.data.file) {
                    filesArray.push(
                        res.data.file[key][0].fieldname,
                        res.data.file[key][0].id,
                        res.data.file[key][0].originalname,
                        res.data.file[key][0].uploadDate,
                        res.data.file[key][0].size,
                        res.data.file[key][0].contentType
                    )
                }
            })
        let fileObject = {
            fieldName: filesArray[0],
            id: filesArray[1],
            originalName: filesArray[2],
            uploadDate: filesArray[3],
            fileSize: filesArray[4],
            contentType: filesArray[5]
        }

        await axios.put(('/api/fileObject'), {
            itemId: this.state.selectedId,
            filesArray: fileObject,
            status: 'Diretrizes Metropolitanas emitidas'
        })

        await axios.put(('/api/processLog'), {
            id: this.state.selectedId,
            processLog: {
                label: 'Diretrizes Metropolitanas emitidas',
                createdAt: new Date(),
                files: [fileObject]
            }
        })
        window.location.reload()

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

    download(e) {
        axios.get('/api/download/' + e.target.id)
            .then(res => {
                window.location.href = '/api/download/' + res.headers.fileid;
            })
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
        let dirStatus = this.state.dirStatus

        await axios.put('/api/fileObject', {
            itemId: this.state.selectedId,
            status: 'Processo cadastrado'
        })
        await axios.put('api/processLog', {
            id: this.state.selectedId,
            processLog: {
                label: 'Pendências para emissão de diretrizes',
                createdAt: new Date(),
                pendencias: dirStatus.pendencias,
                dirCheckList: {
                    cgtOk: dirStatus.cgtOk,
                    vistoriaOk: dirStatus.vistoriaOk,
                    daeOk: dirStatus.daeOk,
                    dirMunOk: dirStatus.dirMunOk,
                }
            }
        })
        window.location.reload()
    }

    showCalendar(el) {
        this.setState({ ...this.state, [`${el.target.id}Calendar`]: true })
    }

    hideCalendar(d) {
        if (this.state.cgtCalendar) {
            this.setState({ ...this.state, cgtCalendar: false })
            this.props.setCgtDate(this.state.m, this.state.selectedId)
        } else {
            this.setState({ ...this.state, vistoriaCalendar: false })
            this.props.setVistoriaDate(this.state.m, this.state.selectedId)
        }

        console.log(this.props.cadastro.processCollection[0])

        setTimeout(() => {
            console.log(this.props.cadastro.processCollection[0])
        }, 200);

    }

    setDate = d => {
        this.state.cgtCalendar ? this.setState({ m: d._d, cgt: d._d })
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
        );
    }

    render() {

        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        const filteredList = this.props.cadastro.processCollection.filter(el => el.status === 'Aguardando Diretrizes Metropolitanas')
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
                        redux={this.props.cadastro}
                        search={e => this.handleSearch(e)}
                        searchArray={dataMatch}
                        selectProcess={this.handleSelect.bind(this)}
                        submitFiles={this.handleSubmit.bind(this)}
                        setColor={this.props.cadastro.setColor}
                        clear={this.clearSearch.bind(this)}
                        empDetails={this.empDetails.bind(this)}
                        rtDetails={this.rtDetails.bind(this)}
                        download={this.download.bind(this)}
                        showFiles={this.showFiles.bind(this)}
                    >
                        <DiretrizRow
                            selectedId={this.state.selectedId}
                            showFiles={this.state.showFiles}
                            checkItem={this.checkItem.bind(this)}
                            close={this.closeDetails.bind(this)}
                            processCollection={this.props.cadastro.processCollection}
                            filesCollection={this.props.cadastro.filesCollection}
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
                                top: '33%',
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
                        empCollection={this.props.cadastro.empCollection}
                        rtCollection={this.props.cadastro.rtCollection}
                    />
                </div>
                <div>
                    <ShowFiles
                        selectedId={this.state.selectedId}
                        showFiles={this.state.showFiles}
                        close={this.closeDetails.bind(this)}
                        processCollection={this.props.cadastro.processCollection}
                        filesCollection={this.props.cadastro.filesCollection}
                        download={this.download.bind(this)}
                    />
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cadastro: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor, setCgtDate, setVistoriaDate }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diretriz);