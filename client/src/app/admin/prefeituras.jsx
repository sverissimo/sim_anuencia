import React, { Component } from 'react'
import axios from 'axios'
import Title from '../common/titleSubtitle'
import { municipios } from '../config/formConfig'
import { UpdateButton } from './../common/buttons';
import { reduxToastr } from '../cadastro/cadActions';

class Prefeituras extends Component {

    state = {
        municipio: '',
        prefeituras: []
    }

    componentDidMount() {

        axios.get('/api/prefeituras')
            .then(res => this.setState({ prefeituras: res.data }))
            .catch(err => console.log(err))
    }

    async handleChange(e) {

        const { name, value, nodeName } = e.target
        if (nodeName === 'SELECT') {
            await this.setState({ municipio: value })
            let { prefeituras, municipio } = this.state
            let cityData = prefeituras.filter(p => p.municipio === municipio)[0]
            if (cityData) {
                cityData = { nome: cityData.nome, ...cityData }
                this.setState({ ...this.state, ...cityData })
            }
        }
        else { this.setState({ [name]: value }) }
        
    }

    handleSubmit(e) {

        const { prefeituras, ...pref } = this.state
        axios.put('/api/prefeituras', pref)
            .then(res => reduxToastr('sucess', res.data, 'Cadastro alterado'))
            .then(axios.get('/api/prefeituras')
                .then(res => this.setState({ prefeituras: res.data }))
                .catch(err => console.log(err)))
            .catch(err => reduxToastr('err', err, 'Erro!'))
        e.preventDefault()

    }

    render() {

        let { prefeituras, municipio } = this.state
        let cityData = prefeituras.filter(p => p.municipio === municipio)[0]
        if (cityData) cityData = { nome: cityData.nome, ...cityData }

        let selector = municipios.munEmpreendimento.options.map((opt, i) =>
            <option key={i} value={opt}>{opt}</option>
        )

        return (
            <div className='container'>
                <Title
                    title='Editar dados das prefeituras'
                />

                <div className='row'>
                    <div className="col s12">
                        <label>Selecione o município</label>
                        <br />
                        <select className="browser-default" value={this.state.municipio} onChange={this.handleChange.bind(this)} >
                            {selector}
                        </select>
                    </div>
                </div>
                <div className="row">
                    {
                        cityData ?
                            <form id='prefForm' onSubmit={this.handleSubmit.bind(this)}>
                                {
                                    Object.entries(this.state).map(([k, v], i) =>
                                        k !== 'updatedAt' && k !== '_id' && k !== 'prefeituras' && < div className="col s12 m6" key={i} >
                                            <label htmlFor={k}>{k.replace(/\w/, c => c.toUpperCase())}</label>
                                            <input
                                                type='text'
                                                value={v}
                                                name={k}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    )
                                }
                                <div className="col s12 right">
                                    < UpdateButton
                                        form='prefForm'
                                        display={true}
                                    />
                                </div>
                            </form>
                            :
                            <div className='col push-s4' style={{ paddingTop: '20%' }}>
                                <h5>
                                    Selecione o município.
                            </h5>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default Prefeituras;