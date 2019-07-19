import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData, reduxToastr } from '../cadastro/cadActions';
import { handleEdit, disableEdit, changeHandler } from './buscaActions';
import { BackButton, UpdateButton } from './../common/buttons';

import ShowDetails from '../common/showDetails'
import EditData from './editData';
import BuscaTemplate from './buscaTemplate';
import BuscaRow from './buscaRow';
import ProcessInfo from '../common/processInfo';
import MapWrapper from '../functions/mapWrapper';

class ShowEmpContainer extends Component {

    constructor() {
        super()
        this.escFunction = (e) => {
            if (e.keyCode === 27) {
                if (this.state.logDetails) this.clearLog()
                if (this.state.map) this.showMap()
                else if (this.state.showInfo) this.hideLog()
                else if (this.state.showEmpDetails || this.state.showRtDetails) this.closeDetails()
            }
        }
    }
    state = {
        search: '',
        select: 'process',
        edit: false,
        selectId: '',
        itemId: '',
        item: {},
        nome: '',
        setColor: '',
        showEmpDetails: false,
        showRtDetails: false,
        empId: '',
        rtId: '',
        cgt: '',
        showInfo: '',
        process: '',
        logIndex: '',
        logDetails: false,
        archieved: false,
        map: false,
        filter: 'nomeEmpreendimento',
        processes: []
    }

    async componentDidMount() {
        let { empCollection, rtCollection, processCollection } = this.props.cadastro
        const userRole = localStorage.getItem('role')

        if (userRole !== 'rt') {
            !rtCollection[0] ? this.props.loadRtData() : void 0
        }
        !empCollection[0] ? this.props.loadEmpData() : void 0
        !processCollection[0] ? await this.props.loadProcessData() : void 0

        let processes = this.props.cadastro.processCollection
        this.setState({ processes })

        document.addEventListener("keydown", this.escFunction, false)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    async deleteHandler(id) {

        const { select } = this.state
        if (window.confirm('Excluir registro?')) {
            await axios.delete(`/api/delete/item?id=${id}&el=${select}`)
                .catch(err => console.log(err))
            if (select === 'emp') this.props.loadEmpData()
            if (select === 'rt') this.props.loadRtData()
            if (select === 'process') this.props.loadProcessData()
        }
    }

    handleSearchBar = e => {
        const { name, value } = e.target

        if (name === 'select') {
            this.setState({ filter: value })

        } else {
            this.setState({ search: e.target.value })
        }
    }

    handleSelect = (e) => {
        this.setState({
            ...this.state, select: e.target.value,
        })
    }

    enableEdit = (itemId) => {

        let item = []
        let itemObj = {}
        if (this.state.select === 'emp') {
            item = this.props.cadastro.empCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }

        if (this.state.select === 'rt') {
            item = this.props.cadastro.rtCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }

        if (this.state.select === 'process') {
            item = this.props.cadastro.processCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }
        this.setState({
            ...this.state,
            item: itemObj[0],
            edit: true
        })

    }

    disableEdit = () => {
        this.props.disableEdit()
        this.setState({ ...this.state, edit: false })
    }

    editValue = (event) => {
        if (this.state.item) {
            let update = Object.assign({}, this.state.item, { [event.target.name]: event.target.value })
            this.setState({ ...this.state, item: update })
        }
    }

    async saveEdit(e) {

        if (this.state.item && this.state.select !== 'process') {
            const { select } = this.state
            await axios.put(('/api/edit'), {
                el: select,
                item: this.state.item
            })
                .then(this.setState({ edit: false }))
                .catch(err => alert(err))
            if (select === 'emp') this.props.loadEmpData()
            if (select === 'rt') this.props.loadRtData()

        } else if (this.state.item) {
            let item = Object.assign({}, this.state.item)
            delete item.processHistory

            await axios.put(('/api/editProcess'), { item: item })
                .then(this.setState({ edit: false }))
                .catch(err => alert(err))
            this.props.loadProcessData()
        }
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

    showInfo(e) {
        let proc = this.props.cadastro.processCollection.filter(el => el._id.match(e.target.id))
        this.setState({ showInfo: true, process: proc[0] })
    }

    showLog(e) {
        this.setState({ logIndex: e.target.id, logDetails: true })
    }

    hideLog() {
        this.setState({ logIndex: '', showInfo: false })
    }

    clearLog() {
        this.setState({ logDetails: false, logIndex: '' })
    }

    showArchieved() {
        this.setState({ archieved: !this.state.archieved })
    }

    async archieve(id, archieved) {
        let { processCollection } = this.props.cadastro

        const user = { ...localStorage }
        const userObj = { nome: user.name + ' ' + user.surName, email: user.email }
        let updatedObj = {
            item: {
                _id: id,
            },
            processHistory: {
                createdAt: new Date(),
                user: userObj
            }
        }

        if (archieved) {
            const selectedProc = processCollection.filter(el => el._id.match(id))[0]
            const historyArray = selectedProc.processHistory

            let lastLog = historyArray.filter(log => log.label !== 'Processo Arquivado')
                .filter(log => log.label !== 'Processo Desarquivado')

            lastLog = lastLog[lastLog.length - 1]

            let stats = lastLog.label
            if ((stats.match('Processo cadastrado') || stats.match('Análise ')) && selectedProc.modalidade.match('Desmembramento')) stats = 'Aguardando documentação'
            if (stats.match('Entrada') || stats.match('Anuência prévia solicitada')) stats = 'Aguardando Análise'
            if (stats.match('Análise ')) stats = 'Diretrizes Metropolitanas emitidas'
            if (stats.match('Diretrizes metropolitanas solicitadas')) stats = 'Aguardando Diretrizes Metropolitanas'
            if (stats.match('Pendências para')) stats = 'Processo cadastrado'

            updatedObj.item.status = stats
            updatedObj.processHistory.label = 'Processo Desarquivado'

        } else {
            updatedObj.item.status = 'Processo Arquivado'
            updatedObj.processHistory.label = 'Processo Arquivado'
        }

        await axios.put('/api/editProcess/', updatedObj)
            .catch(err => console.log(err))
        this.props.loadProcessData()

    }

    showMap = async id => {
        const { processCollection } = this.props.cadastro
        const selectedProcess = processCollection.filter(e => e._id === id)[0]
        await this.setState({ selectedProcess })
        this.setState({ map: !this.state.map })
    }

    render() {

        let emps = []
        let rts = []
        let process = []
        let archievedProcess = []
        let { search, select, archieved, selectedProcess, kml, map, processes, filter } = this.state
        let searchString = search.trim().toLowerCase();
        const { empCollection, rtCollection } = this.props.cadastro

        if (search && (search.length > 1 && (select === 'emp' && empCollection))) {
            emps = empCollection.filter((el) => el.nome.toLowerCase().match(searchString)).slice(0, 20)
        } else if ((!search || search.length <= 2) && select === 'emp') {
            emps = empCollection.slice(0, 30)
        }

        if (search && (search.length > 1 && (select === 'rt' && rtCollection))) {
            rts = rtCollection.filter((el) => el.nomeRt.toLowerCase().match(searchString)).slice(0, 20)
        } else if ((!search || search.length <= 2) && select === 'rt') {
            rts = rtCollection.slice(0, 30)
        }

        if (search && (search.length > 1 && (select === 'process' && processes))) {
            archievedProcess = processes.filter(proc => proc.status === 'Processo Anuído' || proc.status === 'Processo Arquivado')
            if (archieved === true) process = archievedProcess.filter((el) => el[filter].toLowerCase().match(searchString)).slice(0, 20)
            else process = processes
                .filter(p => p.status !== 'Processo Arquivado')
                .filter(p => p.status !== 'Processo Anuído')
                .filter((el) => el[filter].toLowerCase().match(searchString))
                .slice(0, 20)

        } else if ((!search || search.length <= 1) && select === 'process') {
            archievedProcess = processes.filter(proc => proc.status === 'Processo Anuído' || proc.status === 'Processo Arquivado')
            if (archieved === true) process = archievedProcess
            else process = processes.filter(p => p.status !== 'Processo Arquivado').filter(p => p.status !== 'Processo Anuído').slice(0, 50)

            process.sort(function (a, b) {
                let ca = new Date(a.updatedAt)
                let cb = new Date(b.updatedAt)
                if (ca && cb) {

                    if (cb.getTime() > ca.getTime()) {
                        return 1
                    } else if (ca.getTime() > cb.getTime()) {
                        return -1
                    } else return 0
                } else {
                    return null
                }
            })
        }

        return (
            <div className="container" style={{ width: '90%' }} >
                <BuscaTemplate
                    search={search}
                    select={select}
                    edit={this.state.edit}
                    redux={this.props.cadastro}
                    onSelect={this.handleSelect}
                    change={this.handleSearchBar}
                    color={this.props.cadastro.setColor}
                    archieved={this.state.archieved}
                    showArchieved={this.showArchieved.bind(this)}
                />
                {
                    this.state.showInfo ?
                        <div>
                            <ProcessInfo
                                process={this.state.process}
                                logDetails={this.state.logDetails}
                                index={this.state.logIndex}
                                showLog={this.showLog.bind(this)}
                                hideLog={this.hideLog.bind(this)}
                                clearLog={this.clearLog.bind(this)}
                                soloComponent={true}
                            />
                        </div>
                        : null}
                <div>
                    <BuscaRow
                        data={this.state}
                        redux={this.props.cadastro}
                        emps={emps}
                        rts={rts}
                        process={process}
                        empFields={['nome', 'cpf', 'rua', 'cidade', 'phone', 'email']}
                        rtFields={['nomeRt', 'emailRt', 'phoneRt']}
                        showRt={false}
                        fields={['nProcess', 'nomeEmpreendimento', 'modalidade', 'area', 'munEmpreendimento', 'status', 'tecnico', 'updatedAt']}
                        divConfig={['col s1', 'col s2', 'col s1', 'col s1', 'col s1', 'col s1', 'col s1', 'col s1']}
                        edit={this.enableEdit.bind(this)}
                        deleteOne={this.deleteHandler.bind(this)}
                        color={this.props.cadastro.setColor}
                        empDetails={this.empDetails.bind(this)}
                        rtDetails={this.rtDetails.bind(this)}
                        showInfo={this.showInfo.bind(this)}
                        clearLog={this.clearLog.bind(this)}
                        archieve={this.archieve.bind(this)}
                        kml={kml}
                        showMap={this.showMap}
                        map={this.state.map}
                    />
                    {map && <MapWrapper
                        close={this.showMap}
                        selectedProcess={selectedProcess}
                    />}

                    <EditData
                        redux={this.props.cadastro}
                        data={this.state}
                        disableEdit={this.disableEdit.bind(this)}
                        change={e => this.editValue(e)}
                        submit={e => this.saveEdit(e)} />
                </div>
                <div>
                    {this.state.edit ? <BackButton
                        onClick={this.disableEdit} icon='arrow_back'
                    /> : null}

                    <UpdateButton
                        form={`${select}`}
                        display={this.state.edit}
                    />
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, handleEdit, disableEdit, changeHandler, reduxToastr }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmpContainer);