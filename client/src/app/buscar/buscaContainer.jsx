import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from '../cadastro/cadActions';
import { deleteEmp, deleteRt, deleteProcess } from './buscaActions';

import ShowEmpTemplate from './buscaTemplate';
import ShowEmpRow from './buscaRow';

class ShowEmpContainer extends Component {

    state = {
        items: [],
        search: '',
        select: 'emp'
    }

    componentWillMount() {

        this.props.loadEmpData();
        this.props.loadRtData();
        this.props.loadProcessData();
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

    handleChange = (e) => {
        this.setState({
            ...this.state, search: e.target.value,
        })
    }

    handleSelect = (e) => {
        this.setState({
            ...this.state, select: e.target.value,
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
                    change={e => this.handleChange(e)}
                />

                <table className="highlight" >
                    <tbody>
                        <ShowEmpRow
                            data={this.state}
                            emps={emps}
                            rts={rts}
                            process={process}
                            delete={this.deleteHandler.bind(this)}
                            i={i = i + 1}
                        />
                    </tbody>
                </table>
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
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, deleteEmp, deleteRt, deleteProcess }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmpContainer);