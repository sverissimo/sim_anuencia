import React from 'react';
import Title from '../common/titleSubtitle'
import './../css/styles.css';

const ShowEmpTemplate = (props) => {

    let { edit } = props

    return (
        <div>

            <Title
                title='Gerenciar Dados'
                subtitle=' Edite e gerencie os dados dos processos, interesados e RTs utilizando os filtros disponíveis '
                color={props.color}
            />
            {
                edit === false ?
                    <div>
                        <label>Selecione o método de Busca</label>
                        <br />
                        <div className="col s3">
                            <select className="browser-default" value={props.select} onChange={props.onSelect}>
                                <option value="" key="1" label="Selecionar">Selecionar </option>
                                <option value="emp" key="2" label="Empreendedor">Empreendedor </option>
                                <option value="rt" key="3" label="Responsável Técnico">Responsável Técnico </option>
                                <option value="process" key="4" label="Processo">Processo </option>
                            </select>
                        </div>

                        <div className="col s9">
                            <form className="input-field" >
                                <input className="form-control"
                                    value={props.search}
                                    onChange={props.change}
                                    type="search"
                                    placeholder="procurar... (mostrando 30 primeiros resultados)"
                                    aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    : <h5 style={{marginBottom: '40px'}}>Editar dados</h5>
            }
        </div>
    )
}

export default ShowEmpTemplate;