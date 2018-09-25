import React from 'react';
import renderSearch from '../common/renderSearch';
import renderSearchHeader from '../common/renderSearchHeader';


const configLabels = [ "Nome do empreendimento", "Área (m²)", "Modalidade", "Município",
     "Nome do Empreendedor" ]

     const SolicitaDiretriz = (props) => {

    return (
        <div className="container" >
            <div className="row col s12">
                <center><h4><b>Solicitar Diretrizes Metropolitanas</b></h4></center>
                <div className="card-panel teal lighten-4" style={{ marginBottom: '10px' }} >
                    <b>Para solicitar diretrizes metropolitanas,
                        Faça o upload dos documentos necessários
                        em pdf e clique em "Solicitar Diretrizes".</b>
                </div>
            </div>
            <div className="row">
                <div className="col s11">
                    <label>Selecione o processo</label>
                    <input
                        className="input"
                        type="text"
                        name="search"
                        onChange={props.search}
                    />
                </div>
                <div className="col s1 right" style={{ paddingTop: '35px' }}>
                    <i className="material-icons">search</i>
                </div>

            </div>
            <div>
                {props.searchArray.length > 0 ? renderSearchHeader(configLabels) : void 0}
                {renderSearch(props.searchArray, props.redux.empCollection, props.selectProcess, props.data.checked)}
            </div>

            <form>
                <fieldset>
                    <legend style={{ fontSize: '1.3rem' }}>
                        Documentos para solicitação de diretrizes
                        </legend>
                    {props.children}
                </fieldset>
                <button className="btn teal darken-3 right ">Solicitar Diretrizes</button>
            </form>
        </div>

    );
};

export default SolicitaDiretriz;