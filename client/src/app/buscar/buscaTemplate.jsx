import React from 'react';
import Title from '../common/titleSubtitle'
import './../css/styles.css';

const ShowEmpTemplate = (props) => {

    let { edit } = props
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
                        <div>
                            {
                                userRole !== 'rt' && <div className="col s3">
                                    <label>Selecione o método de Busca</label>
                                    <br />
                                    <select className="browser-default" value={props.select} onChange={props.onSelect}>
                                        <option value="" key="1" label="Selecionar">Selecionar </option>
                                        <option value="emp" key="2" label="Empreendedor">Empreendedor </option>
                                        <option value="rt" key="3" label="Responsável Técnico">Responsável Técnico </option>
                                        <option value="process" key="4" label="Processo">Processo </option>
                                    </select>
                                </div>
                            }

                            <div className="col s9">
                                <form className="input-field" >
                                    <input className="form-control"
                                        value={props.search}
                                        onChange={props.change}
                                        type="search"
                                        placeholder="digite pelo menos 3 dígitos para procurar"
                                        aria-label="Search" />
                                </form>
                            </div>
                        </div>
                        : <h5 style={{ marginBottom: '40px' }}>Editar dados</h5>
                }
            </div>
        )
}

export default ShowEmpTemplate;