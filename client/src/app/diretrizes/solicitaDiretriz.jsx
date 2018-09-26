import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadProcessData } from './../cadastro/cadActions'

import SolicitaDiretrizTemplate from './solicitaDiretrizTemplate';
import SolicitaDiretrizRow from './solicitaDiretrizRow';

class solicitaDiretriz extends Component {
    state = {
        config: [
            {
                label: 'Diretrizes Municipais',
                tooltip: 'Diretrizes emitidas pela Prefeitura Municipal',
                nameInput: 'dirMunFile'
            },
            {
                label: 'Levantamento Planialtimétrico',
                tooltip: 'Planta baixa contendo o levantamento planialtimétrico. Ver requisitos abaixo',
                nameInput: 'levPlanFile'
            },
            {
                label: 'Comprovante de pagamento da DAE',
                tooltip: 'Comprovante de pagamento da DAE',
                nameInput: 'dirDaeFile'
            },

        ],
        searchValue: '',
        dataMatch: [],
        toggleUpload: false,
        selectedId: 'off',
        checked: false,
        dirMunFile: [],
        levPlanFile: [],
        dirDaeFile: [],
        files: []
    }
    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0
    }

    handleSearch(e) {
        this.setState({ ...this.state, searchValue: e.target.value })
    }

    handleSelect(e) {

        this.setState({
            ...this.state,
            selectedId: e.target.value.replace(/,/g, ''),
            checked: e.currentTarget.id
        })
    }

    fileUpload(e) {



        this.setState({

            files: this.state.files.concat({ [e.target.name]: e.target.files[0] })
        })


    }
    render() {

        let dataMatch = []
        let input = this.state.searchValue.toLowerCase()
        if (input && input.length > 2) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        }
        console.log(this.state)
        return (
            <div>
                <SolicitaDiretrizTemplate
                    data={this.state}
                    redux={this.props.cadastro}
                    search={e => this.handleSearch(e)}
                    searchArray={dataMatch}
                    selectProcess={this.handleSelect.bind(this)}
                >
                    {
                        this.state.config.map((item, i) => {
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
    return bindActionCreators({ loadEmpData, loadProcessData }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(solicitaDiretriz);