import React, { Component } from 'react'
import axios from 'axios'
import { soloStyle } from '../config/soloStyle'
import { CloseWindow, UpdateButton } from '../common/buttons'
import { municipios } from '../config/formConfig'

class Tecnicos extends Component {

    state = {
        municipios: [],
        name: '',
        surName: '',
        email: '',
        cau: '',
        cities: []
    }

    componentDidMount() {

        let { users, tecnicos, userId } = this.props

        const user = users.filter(u => u._id.match(userId.replace('t_', '')))[0]
        const tecnico = tecnicos.filter(t => t.email.match(user.email))[0]
        let cities = []
        let citiesArray = []
        municipios.munEmpreendimento.options.forEach(m => cities.push({ [m]: false }))

        if (tecnico) {
            const { municipios, _id, createdAt, updatedAt, __v, ...tec } = tecnico

            municipios.forEach(m => cities.find(c => Object.keys(c)[0] === m)[m] = true)
            let selected = cities.filter(el => Object.values(el)[0] === true)

            selected.forEach(city => citiesArray.push(Object.keys(city)[0]))

            tec.cities = cities
            tec.municipios = citiesArray

            this.setState({ ...tec })
        }
        else {
            const { _id, verified, password, role, ...rest } = user
            rest.cities = cities
            this.setState({ ...rest })
        }
    }

    handleChange(e) {
        let { name, value, type } = e.target
        let cities = [...this.state.cities]
        let stateMirror = {}
        let citiesArray = []

        if (type === 'checkbox') cities.find(c => Object.keys(c)[0] === name)[name] = !cities.find(c => Object.keys(c)[0] === name)[name]
        if (type === 'text') Object.assign(stateMirror, { [name]: value })

        let selected = this.state.cities.filter(el => Object.values(el)[0] === true)
        selected.forEach(city => citiesArray.push(Object.keys(city)[0]))

        this.setState({ ...stateMirror, cities, municipios: citiesArray })
    }

    handleSubmit(e) {
        e.preventDefault()
        let { cities, ...editTec } = this.state

        axios.put('/api/tecnicos', editTec)
            .then(res => {
                console.log(res.data)
                this.props.refresh()
            })
            .catch(err => console.log(err))
    }

    render() {
        let { users, editTec, userId } = this.props
        const user = users.filter(u => u._id.match(userId.replace('t_', '')))[0]
        const cities = municipios.munEmpreendimento.options

        const check = (mun) => {

            let selected = []
            selected = this.state.cities.filter(el => Object.values(el)[0] === true)
            let check = selected.filter(s => Object.keys(s)[0] === mun)[0]
            if (check) return 'checked'
            else return
        }

        return (
            <div style={soloStyle(true, ['15%', '70%'])
            }>
                <div className="row" style={{ textAlign: 'center' }}>
                    <div style={{
                        position: 'absolute',
                        top: '0.5%',
                        right: '0.5%'
                    }}>
                        <CloseWindow close={editTec} />
                    </div>
                    <h5>
                        Editar dados - {user.name} {user.surName}
                    </h5>
                </div>
                <form action="submit" id='form' onSubmit={this.handleSubmit.bind(this)}>

                    {
                        Object.entries(this.state).map(([k, v], i) => (
                            k !== 'municipios' && k !== 'cities' && <div className='row' key={i}>
                                <label htmlFor={i}>{k}</label>
                                <input type="text"
                                    value={v}
                                    id={i}
                                    name={k}
                                    onChange={this.handleChange.bind(this)}
                                />
                            </div>
                        ))
                    }
                    {
                        <div className="row">
                            <h5 style={{ fontSize: '1rem', padding: '1%' }}>Municípios para análise</h5>
                            {
                                cities.map((mun, i) =>
                                    mun !== '' && <div className='col s6 m3 l2' key={i + 100} >
                                        <input id={mun}
                                            name={mun}
                                            type="checkbox"
                                            checked={check(mun) || ''}
                                            onChange={this.handleChange.bind(this)}
                                            title='Selecionar municipios'
                                        />
                                        <label htmlFor={mun}>{mun}</label>
                                    </div>
                                )
                            }
                        </div>
                    }
                </form>
                <UpdateButton display={true} form='form' />
            </div >
        )
    }
}

export default Tecnicos