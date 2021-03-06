import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, loadTecnicos, loadFilesData, reduxToastr } from '../cadastro/cadActions'
import { sortList } from '../functions/sort'

import AnuenciaTemplate from './anuenciaTemplate';
import ProcessContainer from './processContainer'
import ShowDetails from '../common/showDetails'
import ShowFiles from '../common/showFiles';

class AnuenciaContainer extends Component {

    constructor() {
        super()
        this.escFunction = (event) => {
            if (!this.state.checked && event.keyCode === 27) this.closeDetails()
        }
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
        analiseProc: {
            createdAt: '',
            pendencias: ''
        },
        filter: 'nomeEmpreendimento',
        tecFilter: true
    }

    async componentDidMount() {
        let { empCollection, rtCollection, processCollection, filesCollection, tecCollection } = this.props.redux
        !empCollection[0] ? this.props.loadEmpData() : void 0
        !processCollection[0] ? await this.props.loadProcessData() : void 0
        !rtCollection[0] ? this.props.loadRtData() : void 0
        !filesCollection[0] ? this.props.loadFilesData() : void 0
        !tecCollection[0] ? this.props.loadTecnicos() : void 0

        let processes = this.props.redux.processCollection.filter(el => el.status === 'Aguardando Análise')
        if (localStorage.role === 'tecnico') processes = processes.filter(p => p.tecnico === localStorage.name + ' ' + localStorage.surName)
        this.setState({ processes })

        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    handleSearch(e) {
        const { name, value } = e.target

        if (name === 'select') {
            this.setState({ filter: value })
        } else {
            this.setState({ ...this.state, searchValue: e.target.value, checked: false });
        }
    }

    clearSearch(e) {
        this.setState({
            ...this.state, checked: null,
            selectedId: null, searchValue: '', showFiles: null
        })
    }

    handleSelect(e) {
        const { name, value } = e.target

        if (name === 'select') {
            this.setState({ filter: value })
        } else {
            this.setState({
                ...this.state,
                selectedId: e.target.value.replace(/,/g, ''),
                checked: e.currentTarget.id
            })
        }
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
    }

    sort = criteria => {
        let { reverse, processes } = this.state
        let orderedList

        orderedList = sortList(processes, criteria)
        if (reverse === true) orderedList.reverse()
        this.setState({ processes: orderedList, reverse: !reverse })
    }

    filterTecs = async () => {
        let { processes } = this.state
        const user = { ...localStorage }
        await this.setState({ tecFilter: !this.state.tecFilter })

        if (this.state.tecFilter) {
            processes = processes.filter(p => p.tecnico === user.name + ' ' + user.surName)
            this.setState({ processes })
        } else {
            processes = this.props.redux.processCollection.filter(el => el.status === 'Aguardando Análise')
            this.setState({ processes })
        }
    }

    render() {

        let { dataMatch, processes, filter, tecFilter } = this.state
        let input = this.state.searchValue.toLowerCase()
        let filteredList = []
        if (processes) filteredList = processes



        if (input && !this.state.checked) {
            dataMatch = filteredList.filter(el => el[filter].toLowerCase().match(input))
        } else if (this.state.checked || (this.state.checked && input)) {
            dataMatch = filteredList.filter(el => el._id.toLowerCase().match(this.state.selectedId))
        } else {
            dataMatch = filteredList
        }

        return (
            <div>
                <div>
                    {
                        !this.state.selectedId ?
                            <AnuenciaTemplate
                                data={this.state}
                                redux={this.props.redux}
                                search={e => this.handleSearch(e)}
                                searchArray={dataMatch}
                                selectProcess={this.handleSelect.bind(this)}
                                setColor={this.props.redux.setColor}
                                clear={this.clearSearch.bind(this)}
                                empDetails={this.empDetails.bind(this)}
                                rtDetails={this.rtDetails.bind(this)}
                                showFiles={this.showFiles.bind(this)}
                                sort={this.sort}
                                tecFilter={tecFilter}
                                filterTecs={this.filterTecs}
                            /> : !this.state.showFiles ?
                                <div>
                                    <ProcessContainer
                                        data={this.state}
                                        redux={this.props.redux}
                                        clear={this.clearSearch.bind(this)}
                                        close={this.closeDetails.bind(this)}
                                        match={this.props.match}
                                        changeValue={this.handleChange.bind(this)}
                                        showFiles={this.state.showFiles}
                                    />
                                </div> :
                                <AnuenciaTemplate
                                    data={this.state}
                                    redux={this.props.redux}
                                    search={e => this.handleSearch(e)}
                                    searchArray={dataMatch}
                                    selectProcess={this.handleSelect.bind(this)}
                                    setColor={this.props.redux.setColor}
                                    clear={this.clearSearch.bind(this)}
                                    empDetails={this.empDetails.bind(this)}
                                    rtDetails={this.rtDetails.bind(this)}
                                    showFiles={this.showFiles.bind(this)}
                                />
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, loadTecnicos, loadFilesData, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnuenciaContainer);