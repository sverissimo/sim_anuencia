import React from 'react'

const filterArray = [['nomeEmpreendimento', 'Empreendimento'], ['munEmpreendimento', 'Município'],
['tecnico', 'Técnico'], ['nProcess', 'Número do Processo']]

const filtros = filterArray.map((f, i) => <option key={i} value={f[0]}>{f[1]} </option>)

const Filtros = (props) => {
    const { search} = props
    return (
        <div className="col s3" style={{ paddingTop: '3px' }}>
            <div className='col s11'>
                <label htmlFor="select">Filtrar por</label>
                <select
                    className='browser-default'
                    name='select'
                    icon='filter_list'
                    label='Filtrar busca'
                    onChange={search}
                >
                    {filtros}
                </select>
            </div>
            <div className='col s1' style={{ paddingTop: '30px' }}>
                <i className="material-icons">search</i>
            </div>
        </div>
    )
}

export default Filtros