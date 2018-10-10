import React from 'react';
import Title from '../common/titleSubtitle'
import './../css/styles.css';

const ShowEmpTemplate = (props) => {
    
    return (
        <div>

            <Title
                title='Gerenciar Processos'
                subtitle=' Acompanhe a situação dos processos utilizando os filtros de busca disponíveis '
                color={props.color}
            />
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
                            placeholder="procurar..."
                            aria-label="Search" />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ShowEmpTemplate;