import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, setColor } from '../cadastro/cadActions'

import DiretrizTemplate from './diretrizTemplate';
import DiretrizRow from './diretrizRow';
import { solDirConfig } from '../common/configLabels'
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
        dirMunFile: '',
        levPlanFile: '',
        dirDaeFile: '',
        showEmpDetails: false,
        showRtDetails: false,
        empId: '',
        rtId: '',
        showFiles: false,
        filesCollection: '',
        daeDir: '',
        emiteDiretriz: false,
        dirStatus: {
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
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.props.setColor(color)

        axios.get('/api/files')
            .then(res => this.setState({ filesCollection: res.data }))

    }

    handleSearch(e) {
        let dirStatus = this.state.dirStatus
        dirStatus.cgtOk = false
        dirStatus.vistoriaOk = false
        dirStatus.dirMunOk = false
        dirStatus.daeOk = false

        this.setState({ ...this.state, searchValue: e.target.value, checked: false, dirStatus: dirStatus });
        let clearRadio = document.getElementsByName('group1')
        clearRadio.forEach(radio => radio.checked = false)
    }

    clearSearch(e) {
        let dirStatus = this.state.dirStatus
        dirStatus.cgtOk = false
        dirStatus.vistoriaOk = false
        dirStatus.dirMunOk = false
        dirStatus.daeOk = false

        this.setState({ ...this.state, searchValue: '', checked: null, dirStatus: dirStatus });
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

        this.setState({
            ...this.state, [e.target.name]: e.target.files[0]
        })
        let k = []
        solDirConfig.map(item => k.push(item.nameInput))

        setTimeout(() => {
            k.map(inputName => {
                for (let keys in this.state) {
                    keys.match(inputName) ?
                        formData.append(inputName, this.state[keys])
                        : void 0
                }
            })
        }, 100);

        setTimeout(() => {
            this.setState({ form: formData })
        }, 200);
    }

    handleSubmit(e) {
        axios.post('/api/solDirUpload', this.state.form)
            .then(res => {

                for (let key in res.data.file) {
                    let filesArray = [];
                    filesArray.push(
                        res.data.file[key][0].fieldname,
                        res.data.file[key][0].id,
                        res.data.file[key][0].originalname,
                        res.data.file[key][0].uploadDate
                    )
                    axios.put(('/api/solDirFiles'), {
                        itemId: this.state.selectedId,
                        filesArray: {
                            fieldName: filesArray[0],
                            id: filesArray[1],
                            originalName: filesArray[2],
                            uploadDate: filesArray[3]
                        },
                        status: 'Aguardando Diretrizes Metropolitanas'
                    })
                }
            })
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

        axios.get('/api/downloadSolDir/' + e.target.id)
            .then(res => {
                window.location.href = '/api/downloadSolDir/' + res.headers.fileid;
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
            this.setState({ emiteDiretriz: true }) : this.setState({ emiteDiretriz: false })

    }

    handleChange(e) {
        let input = e.target.value
        let dirStatus = this.state.dirStatus
        dirStatus.pendencias = input
        dirStatus.createdAt = new Date()
        this.setState({
            dirStatus: dirStatus
        })
        console.log(this.props.cadastro.processCollection[0].pendencias[this.props.cadastro.processCollection[0].pendencias.length-1])
    }

    enviaPendencias(e) {
        
        let dirStatus = this.state.dirStatus
        dirStatus.createdAt = new Date()

        axios.put('api/pendencias', {
            id: this.state.selectedId,
            pendencias: dirStatus
        })
            .then(res => console.log(res))
        
    }

    emiteDiretriz(e) {

    }

    render() {

        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        if (input && !this.state.checked) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        } else if (this.state.checked || (this.state.checked && input)) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el._id.toLowerCase().match(this.state.selectedId))
        } else {
            dataMatch = this.props.cadastro.processCollection
        }

        return (
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
                        filesCollection={this.state.filesCollection}
                        upload={this.fileUpload.bind(this)}
                        dirStatus={this.state.dirStatus}
                        change={this.handleChange.bind(this)}
                        enviaPendencias={this.enviaPendencias.bind(this)}
                        emiteDiretriz={this.state.emiteDiretriz}
                    />


                </DiretrizTemplate>

                <ShowDetails
                    empId={this.state.empId}
                    rtId={this.state.rtId}
                    showEmp={this.state.showEmpDetails}
                    showRt={this.state.showRtDetails}
                    close={this.closeDetails.bind(this)}
                    empCollection={this.props.cadastro.empCollection}
                    rtCollection={this.props.cadastro.rtCollection}
                />

                <ShowFiles
                    selectedId={this.state.selectedId}
                    showFiles={this.state.showFiles}
                    close={this.closeDetails.bind(this)}
                    processCollection={this.props.cadastro.processCollection}
                    filesCollection={this.state.filesCollection}
                    download={this.download.bind(this)}
                />
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, setColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Diretriz);