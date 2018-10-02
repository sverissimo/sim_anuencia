import React from 'react';
import renderSearch from '../common/renderSearch';
import renderSearchHeader from '../common/renderSearchHeader';
import Title from '../common/titleSubtitle';

const configLabels = ["Nome do empreendimento", "Área (m²)", "Modalidade", "Município",
    "Nome do Empreendedor"]

const SolicitaDiretriz = (props) => {
   
    let nameParc
    props.data.selectedId ? nameParc = props.redux.processCollection.filter(el => el._id.match(props.data.selectedId)) : void 0
    
    return (
        <div className="container" >
            <Title
                title='Solicitar Diretrizes Metropolitanas'
                subtitle='Para solicitar diretrizes metropolitanas, faça o upload dos documentos 
                necessários em pdf e clique em "Solicitar Diretrizes".'
                color={ props.setColor}
            />
            <div className="row">
                <div className="col s11">
                    <label>Filtrar</label>
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
                {renderSearch(props.searchArray, 
                    props.redux.empCollection, 
                    props.selectProcess, 
                    props.data.checked, 
                    )}
            </div>

            <form action="/api/upload" method="post" encType="multipart/form-data"  onSubmit= {props.submitFiles}  >
                {
                    props.data.selectedId && props.data.checked  ?
                        (<div>
                            <fieldset>
                                <legend style={{ fontSize: '1.3rem' }}>
                                    {nameParc[0].nomeEmpreendimento}
                                     - Documentos para solicitação de diretrizes
                            </legend>
                                {props.children}
                            </fieldset>
                            <button
                                className="btn teal darken-3 right"
                               type="submit"
                            >Solicitar Diretrizes</button>
                        </div>)
                        : void 0
                }
            </form>
        </div>

    );
};

export default SolicitaDiretriz;