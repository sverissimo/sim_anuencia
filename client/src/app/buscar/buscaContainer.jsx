import React, { Component } from 'react';
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
        item:{}
    }

    componentWillMount() {

        this.setState({
            ...this.state,
            empCollection: this.props.cadastro.empCollection,
            rtCollection: this.props.cadastro.rtCollection,
            processCollection: this.props.cadastro.processCollection
        });
        setTimeout(() => {
            console.log(this.state)    
        }, 30);
        
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

    editHandler = (itemId) => {
       this.props.handleEdit(itemId)
        let item = {}
        item = this.state.empCollection.filter(el => el._id.match(itemId))
        
        console.log(item)
        this.setState({
           ...this.state, 
           nome: item[0].nome, 
           edit:true
       })

    }

    disableEdit = () => {
        this.props.disableEdit()
    }

    editValue = (event) => {
        
        this.setState({
            ...this.state,  [event.target.name]: event.target.value
        })
       
        
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
                            edit={this.editHandler.bind(this)}
                            delete={this.deleteHandler.bind(this)}
                            i={i = i + 1}
                        />
                    </tbody>
                </table>
                <EditData
                    redux={this.props.cadastro}
                    data={this.state}
                    disableEdit={this.disableEdit.bind(this)}
                    change={e=> this.editValue(e)} />
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