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
        checked: null,
        files: [],
        form: null,

    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.props.setColor(color)
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

        this.setState({
            files: this.state.files.concat({ [e.target.name]: e.target.files[0] })
        })


        setTimeout(() => {
            this.state.files.length > 0 ?
                formData.append('dirMunFile', this.state.files[0].dirMunFile) : void 0
            this.state.files.length > 1 ?
                formData.append('levPlanFile', this.state.files[1].levPlanFile) : void 0
            this.state.files.length > 2 ?
                formData.append('dirDaeFile', this.state.files[2].dirDaeFile) : void 0
        }, 100);

        setTimeout(() => {
            this.setState({ form: formData })
        }, 200);
    }

    handleSubmit(e) {
        axios.post('/api/upload', this.state.form)
            .then(res => {
                console.log(res.data.file)
                for (let key in res.data.file) {
                    console.log(res.data.file[key][0].id)
                    console.log(res.data.file[key][0].originalname)
                }
            })
    }

    render() {


        let { dataMatch } = this.state
        let input = this.state.searchValue.toLowerCase()
        if (input) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el.nomeEmpreendimento.toLowerCase().match(input))
        } else if (this.state.checked || this.state.checked && input) {
            dataMatch = this.props.cadastro.processCollection.filter(el => el._id.toLowerCase().match(this.state.checked))
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



        /*  setTimeout(() => {
  
              let select = []
              let element = document.getElementsByName('group1')
              let elArray = Array.from(element)
  
              if (elArray && elArray.length > 1) {
                  select = elArray.filter(el => el.checked === false)
  
                  for (let p in select) {
  
                      select[p].parentElement.style.display = 'none'
                  }
              }
  
               document.getElementsByName('group1').checked !== 'checked' ?
               document.getElementsByName('group1').parentElement.style.display='none' :
               document.getElementsByName('group1').parentElement.style.display='' 
               this.state.checked ? 
              document.querySelectorAll(`*:not(#${CSS.escape(this.state.checked)})`).parentElement.style.display = 'none' : 
              void 0 
          }, 50);
  */



        /*     setTimeout(() => {
    
                document.querySelectorAll(`div.id:not(#${CSS.escape(this.state.checked)})`).style.display = 'none'
            }, 60); */