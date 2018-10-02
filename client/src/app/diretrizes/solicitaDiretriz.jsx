import React, { Component } from 'react';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadProcessData, setColor } from './../cadastro/cadActions'

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
        selectedId: '',
        checked: false,
        files: [],
    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.props.setColor(color)

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

    handleSubmit(e) {

        let data = new FormData();

        data.append('selectedId', this.state.selectedId);
        data.append('dirMunFile', this.state.files[0]);

        axios.post('/api/upload', data)
            .then(res => console.log(res))

    }
    render() {
        console.log()
        let dataMatch = []
        let input = this.state.searchValue.toLowerCase()
        if (input) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
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
    return bindActionCreators({ loadEmpData, loadProcessData, setColor }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(solicitaDiretriz);