import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, setColor } from './../cadastro/cadActions'

import SolicitaDiretrizTemplate from './solicitaDiretrizTemplate';
import SolicitaDiretrizRow from './solicitaDiretrizRow';
import { solDirConfig } from '../common/configLabels'
import ShowDetails from '../common/showDetails'

class solicitaDiretriz extends Component {

    state = {
        searchValue: '',
        dataMatch: [],
        toggleUpload: false,
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
        rtId: ''
    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.props.setColor(color)
        axios.get('/api/files')
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
        solDirConfig.map(item => k.push(item.nameInput))


        setTimeout(() => {
            k.map(inputName => {
                for (let keys in this.state) {
                    keys.match(inputName) ?
                        (formData.append(inputName, this.state[keys]))
                        : void 0
                }
            })
        }, 100);

        setTimeout(() => {
            this.setState({ form: formData })
        }, 200);
    }

    handleSubmit(e) {
        let filesArray = []
        const submit = async () => {
            await axios.post('/api/solDirUpload', this.state.form)
                .then(res => {
                    for (let key in res.data.file) {
                        filesArray.push({
                            fieldName: res.data.file[key][0].fieldname,
                            id: res.data.file[key][0].id,
                            originalName: res.data.file[key][0].originalname,
                            uploadDate: res.data.file[key][0].uploadDate,
                            filename: res.data.file[key][0].filename
                        })
                        axios.put(('/api/fileObject'), {
                            itemId: this.state.selectedId,
                            filesArray: filesArray,
                            status: 'Aguardando Diretrizes Metropolitanas'
                        })
                    }

                })
            axios.put(('/api/processLog'), {
                id: this.state.selectedId,
                processLog: {
                    label: 'Diretrizes metropolitanas solicitadas',
                    createdAt: new Date(),
                    files: filesArray
                }
            })

        }
        submit()
    }

    empDetails(e) {
        this.setState({ showEmpDetails: true, showRtDetails: false, empId: e.target.id })
    }
    rtDetails(e) {
        this.setState({ showEmpDetails: false, showRtDetails: true, rtId: e.target.id })
    }

    closeDetails() {
        this.setState({ showEmpDetails: false, showRtDetails: false, empId: '', rtId: '' })
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
                <SolicitaDiretrizTemplate
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
                >
                    {
                        solDirConfig.map((item, i) => {
                            return (
                                <SolicitaDiretrizRow
                                    object={item}
                                    key={i}
                                    upload={this.fileUpload.bind(this)}
                                />
                            )
                        })
                    }
                </SolicitaDiretrizTemplate>

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

export default connect(mapStateToProps, mapDispatchToProps)(solicitaDiretriz);