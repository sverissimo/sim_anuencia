import React from 'react';
import RenderSearch from '../common/renderSearch';
import renderSearchHeader from '../common/renderSearchHeader';
import Title from '../common/titleSubtitle';
import { configLabels } from '../common/configLabels'
import {BackButton} from '../common/buttons'

const SolicitaDiretriz = (props) => {

    let {setColor, search, searchArray, selectProcess, submitFiles, data, redux, children} = props
   
    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0
    
    return (
        <div className="container" >
            <Title
                title='Solicitar Diretrizes Metropolitanas'
                subtitle='Para solicitar diretrizes metropolitanas, faça o upload dos documentos 
                necessários em pdf e clique em "Solicitar Diretrizes".'
                color={ setColor}
            />
            <div className="row">
                <div className="col s11">
                    <label>Filtrar</label>
                    <input
                        className="input"
                        type="text"
                        name="search"
                        onChange={search}
                    />
                </div>
                <div className="col s1 right" style={{ paddingTop: '35px' }}>
                    <i className="material-icons">search</i>
                </div>
            </div>
            <div>
                {searchArray.length > 0 ? renderSearchHeader(configLabels) : void 0}
                <RenderSearch
                search={searchArray}
                collection={redux.empCollection}
                onSelect={selectProcess}
                checked={data.checked}
                />
                
            </div>
            <div className="row">
                <div className="col s1 right">
                    <BackButton
                    disabled={data.checked === null}
                    icon='clear'
                    onClick={props.clear}
                    />
                </div>

            </div>

            <div>
                {
                    data.selectedId && data.checked  ?
                        (<div>
                            <fieldset>
                                <legend style={{ fontSize: '1.3rem' }}>
                                    {nameParc[0].nomeEmpreendimento}
                                     - Documentos para solicitação de diretrizes
                            </legend>
                                {children}
                            </fieldset>
                            <button
                                className="btn teal darken-3 right"
                                onClick = {submitFiles}  
                            >Solicitar Diretrizes</button>
                        </div>)
                        : void 0
                }
            </div>
        </div>

    );
};

export default SolicitaDiretriz;