import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from '../cadastro/cadActions';
import { deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler } from './buscaActions';
import { BackButton, UpdateButton } from './../common/buttons';

import EditData from './editData';
import ShowEmpTemplate from './buscaTemplate';
import ShowEmpRow from './buscaRow';

class ShowEmpContainer extends Component {

    state = {
        search: '',
        select: 'process',
        edit: false,
        selectId: '',
        itemId: '',
        item: {},
        nome: '',
        setColor: ''
    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })
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

    saveEdit = (e) => {

        if (this.state.item && this.state.select === 'emp') {
            axios.put(('/api/editEmp'), {
                item: this.state.item
            })
        }
        if (this.state.item && this.state.select === 'rt') {
            axios.put(('/api/editRt'), {
                item: this.state.item
            }).catch(err => alert(err))
        }
        if (this.state.item && this.state.select === 'process') {
            axios.put(('/api/editProcess'), {
                item: this.state.item
            }).catch(err => alert(err))
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
                    color={this.state.setColor}
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
                    {this.state.edit ? <BackButton
                        onClick={this.disableEdit} icon='arrow_back'
                    /> : null}

                    <UpdateButton
                        form={`${this.state.select}`}
                        display={this.state.edit}
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmpContainer);