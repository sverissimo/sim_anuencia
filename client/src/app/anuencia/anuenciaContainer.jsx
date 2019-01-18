import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor } from '../cadastro/cadActions'

import AnuenciaTemplate from './anuenciaTemplate';
import ProcessContainer from './processContainer'
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles';

class AnuenciaContainer extends Component {

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

        analiseProc: {
            createdAt: '',
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

        this.setState({ ...this.state, searchValue: e.target.value, checked: false });

    }

    clearSearch(e) {

        this.setState({
            ...this.state, checked: null,
            selectedId: null, searchValue: '', showFiles: null
        });      
    }

    handleSelect(e) {

        this.setState({
            ...this.state,
            selectedId: e.target.value.replace(/,/g, ''),
            checked: e.currentTarget.id
        })
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

    handleSubmit(e) {
        axios.post('/api/diretrizUpload', this.state.form)
            .then(res => {

                for (let key in res.data.file) {
                    let filesArray = [];
                    filesArray.push(
                        res.data.file[key][0].fieldname,
                        res.data.file[key][0].id,
                        res.data.file[key][0].originalname,
                        res.data.file[key][0].uploadDate
                    )
                    axios.put(('/api/fileObject'), {
                        itemId: this.state.selectedId,
                        filesArray: {
                            fieldName: filesArray[0],
                            id: filesArray[1],
                            originalName: filesArray[2],
                            uploadDate: filesArray[3]
                        },
                        status: 'Diretrizes Metropolitanas emitidas'
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
        this.setState({ selectedId: null, showEmpDetails: false, showRtDetails: false, showFiles: false, empId: '', rtId: '' })
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

    handleChange(e) {
        let input = e
        let analiseProc = this.state.analiseProc
        analiseProc.pendencias = input
        analiseProc.createdAt = new Date()
        this.setState({
            analiseProc: analiseProc
        })
        console.log(this.state.analiseProc)
    }

    enviaPendencias(e) {

        let analiseProc = this.state.analiseProc
        analiseProc.createdAt = new Date()

        axios.put('api/pendencias', {
            id: this.state.selectedId,
            pendencias: analiseProc
        })
            .then(res => console.log(res))
    }

    render() {

        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        const filteredList = this.props.cadastro.processCollection.filter(el => el.status === 'Aguardando Análise')

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
                    !this.state.showFiles ?
                        <div>
                            {
                                !this.state.selectedId ?
                                    <AnuenciaTemplate
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
                                    /> :
                                    <div>
                                        <ProcessContainer
                                            data={this.state}
                                            redux={this.props.cadastro}
                                            clear={this.clearSearch.bind(this)}
                                            download={this.download.bind(this)}
                                            close={this.closeDetails.bind(this)}
                                            match={this.props.match}
                                            changeValue={this.handleChange.bind(this)}
                                        />
                                    </div>
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
                        :
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadFilesData, setColor }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnuenciaContainer);