import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from '../cadastro/cadActions';
import { deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler } from './buscaActions';

import EditData from './editData';
import ShowEmpTemplate from './buscaTemplate';
import ShowEmpRow from './buscaRow';

class ShowEmpContainer extends Component {

    state = {
        empCollection: [],
        rtCollection: [],
        processCollection: [],
        search: '',
        select: 'emp',
        edit: false,
        selectId: '',
        itemId: '',
        item: {},
        nome: ''
    }

    componentDidMount() {
        this.props.loadEmpData();
        this.props.loadRtData();
        this.props.loadProcessData();
       /*  this.setState({
            ...this.state,
            empCollection: this.props.cadastro.empCollection,
            rtCollection: this.props.cadastro.rtCollection,
            processCollection: this.props.cadastro.processCollection
        }); */
    }


    deleteHandler = (item) => {
        if (this.state.select === 'emp') {
            this.props.deleteEmp(item)
        }
        if (this.state.select === 'rt') {
            this.props.deleteRt(item)
        }
        if (this.state.select === 'process') {
            this.props.deleteProcess(item);
        }
    }

    handleSearchBar = (e) => {

        this.setState({
            ...this.state, search: e.target.value,
        })

        setTimeout(() => {
            this.props.changeHandler(this.state.search)
        }, 30);


    }

    handleSelect = (e) => {
        this.setState({
            ...this.state, select: e.target.value,
        })
    }

    enableEdit = (itemId) => {

        let item = []
        item = this.props.cadastro.empCollection.filter(el => el._id.match(itemId))
        let itemObj = Object.assign({}, item)
        console.log(itemObj)
        //if (itemObj && itemObj[0])

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

    saveEdit = (e) => {

        e.preventDefault()
        if (this.state.item) {
            console.log(this.state.item)
            axios.put(('/api/editEmp'), {
                item: this.state.item
            })
        }

    }

    renderButtons = () => {
        if (this.state.edit === true) {
            return (
                <div>
                    <button className="btn-flat waves-effect btn-floating left red darken-3"
                        title="Voltar"
                        onClick={this.disableEdit}>
                        <i className="material-icons">arrow_back</i>
                    </button>
                    <button className="btn-flat waves-effect btn-floating right teal darken-2"
                        title="Salvar"
                        form="empFormId" >
                        <i className="material-icons">save</i>
                    </button>
                </div>
            )
        } else {
            return null
        }

    }

    render() {

        let i = 0
        let emps = []
        let rts = []
        let process = []
        let searchString = this.state.search.trim().toLowerCase();

        if (this.state.search && this.state.select === 'emp') {
            emps = this.props.cadastro.empCollection.filter((el) => el.nome.toLowerCase().match(searchString))
        }
        if (this.state.search && this.state.select === 'rt') {
            rts = this.props.cadastro.rtCollection.filter((el) => el.nomeRt.toLowerCase().match(searchString))
        }

        searchString = this.state.search.trim().toLowerCase();
        if (this.state.search && this.state.select === 'process') {
            process = this.props.cadastro.processCollection.filter((el) => el.nomeEmpreendimento.toLowerCase().match(searchString))
        }

        return (
            <div className="container" >
                <ShowEmpTemplate
                    search={this.state.search}
                    select={this.state.select}
                    data={this.props.cadastro}
                    onSelect={this.handleSelect}
                    change={e => this.handleSearchBar(e)}
                />

                <table className="highlight" >
                    <tbody>
                        <ShowEmpRow
                            data={this.state}
                            redux={this.props.cadastro}
                            emps={emps}
                            rts={rts}
                            process={process}
                            edit={this.enableEdit.bind(this)}
                            delete={this.deleteHandler.bind(this)}
                            i={i = i + 1}
                        />
                    </tbody>
                </table>

                <div className="row">
                    <EditData
                        redux={this.props.cadastro}
                        data={this.state}
                        disableEdit={this.disableEdit.bind(this)}
                        change={e => this.editValue(e)}
                        submit={e => this.saveEdit(e)} />
                </div>
                <div>
                    {this.renderButtons()}
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmpContainer);