import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor } from './../cadastro/cadActions'

import SolicitaAnuenciaTemplate from './solicitaAnuenciaTemplate';
import SolAnuenciaFilesRow from './solAnuenciaFilesRow';
import { solAnuenciaConfig1, solAnuenciaConfig2 } from '../common/configLabels'
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles'

class SolicitaAnuencia extends Component {


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

    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.filesCollection[0] ? this.props.loadFilesData() : void 0


        setTimeout(() => {
            let color = document.getElementById('setcolor').style.backgroundColor
            this.props.setColor(color)    
        }, 50);
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

        let k = []
        let allFields = solAnuenciaConfig1.concat(solAnuenciaConfig2)

        allFields.map(item => k.push(item.nameInput))
        console.log(k)
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

    async handleSubmit(e) {
        let filesArray = [];
        await axios.post('/api/solAnuenciaUpload', this.state.form)
            .then(res => {
                for (let key in res.data.file) {

                    filesArray.push({
                        fieldName: res.data.file[key][0].fieldname,
                        id: res.data.file[key][0].id,
                        originalName: res.data.file[key][0].originalname,
                        uploadDate: res.data.file[key][0].uploadDate,
                        fileSize: res.data.file[key][0].size
                    })
                }
                axios.put(('/api/fileObject'), {
                    itemId: this.state.selectedId,
                    filesArray: filesArray,
                    status: 'Aguardando Análise'
                })
                axios.put(('/api/processLog'), {
                    id: this.state.selectedId,
                    processLog: {
                        label: 'Anuência prévia solicitada',
                        createdAt: new Date(),
                        files: filesArray
                    }
                })
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

    render() {

        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        const filteredList = this.props.cadastro.processCollection.filter(el => el.status === 'Diretrizes Metropolitanas emitidas')
        if (input && !this.state.checked) {
            dataMatch = filteredList.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        } else if (this.state.checked || (this.state.checked && input)) {
            dataMatch = filteredList.filter(el => el._id.toLowerCase().match(this.state.selectedId))
        } else {
            dataMatch = filteredList
        }

        return (
            <div>
                {
                    this.state.showFiles ?
                        <ShowFiles
                            selectedId={this.state.selectedId}
                            showFiles={this.state.showFiles}
                            close={this.closeDetails.bind(this)}
                            processCollection={this.props.cadastro.processCollection}
                            filesCollection={this.props.cadastro.filesCollection}
                            download={this.download.bind(this)}
                        />
                        :
                        <div>
                            <SolicitaAnuenciaTemplate
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
                                array={solAnuenciaConfig1}
                                array2={solAnuenciaConfig2}
                                showFiles={this.showFiles.bind(this)}
                            >
                                {
                                    solAnuenciaConfig1.map((item, i) => {
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
                                        solAnuenciaConfig2.map((item, i) => {
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
                            <ShowDetails
                                empId={this.state.empId}
                                rtId={this.state.rtId}
                                showEmp={this.state.showEmpDetails}
                                showRt={this.state.showRtDetails}
                                close={this.closeDetails.bind(this)}
                                empCollection={this.props.cadastro.empCollection}
                                rtCollection={this.props.cadastro.rtCollection}
                            >
                            </ShowDetails>
                        </div>
                }
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        cadastro: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SolicitaAnuencia);