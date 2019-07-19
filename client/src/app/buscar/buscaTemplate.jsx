import React from 'react';
import Title from '../common/titleSubtitle'
import './../css/styles.css'
import Filtros from '../common/filtros'

const ShowEmpTemplate = (props) => {

    let { edit, archieved, showArchieved, select } = props
    const userRole = localStorage.getItem('role')
    let subtitle = 'Visualize e busque por dados dos processos, interesados e RTs utilizando a barra de busca abaixo'
    if (userRole === 'rt') subtitle = 'Visualize e busque por dados dos processos utilizando a barra de busca abaixo'

    return (
        <div>
            <Title
                title='Acompanhar Processos'
                subtitle={subtitle}
                color={props.color}
            />
            {
                edit === false ?
                    <div className='row'>
                        {
                            userRole !== 'rt' && <div className="col s12">
                                <label>Selecione o método de Busca</label>
                                <br />
                                <select className="browser-default" value={select} onChange={props.onSelect}>
                                    <option value="" key="1" label="Selecionar">Selecionar </option>
                                    <option value="emp" key="2" label="Empreendedor">Empreendedor </option>
                                    <option value="rt" key="3" label="Responsável Técnico">Responsável Técnico </option>
                                    <option value="process" key="4" label="Processo">Processo </option>
                                </select>
                            </div>
                        }

                        <div className="col s12" style={{ marginTop: '1%' }}>
                            <div className={select === 'process' ? 'col s9' : 'col s12'}>
                                <form>
                                    <label htmlFor="search">Pesquisar</label>
                                    <input
                                        id='search'
                                        value={props.search}
                                        onChange={props.change}
                                        type="search"
                                        placeholder="digite pelo menos 2 dígitos para procurar"
                                    />                                    
                                </form>
                            </div>
                            {select === 'process' && <Filtros search={props.change} lupa={true} />}
                            {select === 'process' && <div className='col s3'
                                style={{
                                    position: 'relative',
                                    left: '5%',
                                    marginTop: '3%'
                                }}>
                                <input
                                    id='showArchieved'
                                    type="checkbox"
                                    checked={archieved === true}
                                    onChange={showArchieved}
                                />
                                <label style={{ fontSize: '0.9rem' }} htmlFor="showArchieved">Processos anuídos/arquivados</label>
                            </div>
                            }
                        </div>
                    </div>
                    : <h5 style={{ marginBottom: '40px' }}>Editar dados</h5>
            }
        </div>
    )
}

export default ShowEmpTemplate;