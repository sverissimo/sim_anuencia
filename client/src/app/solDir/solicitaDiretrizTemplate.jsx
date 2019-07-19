import React from 'react';
import RenderSearch from '../common/renderSearch'
import Title from '../common/titleSubtitle';
import { BackButton } from '../common/buttons'
import Filtros from '../common/filtros'

const SolicitaDiretriz = (props) => {

    let {setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        children, empDetails, rtDetails, sort, reverse} = props
   
    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0
    
    return (
        <div className="container" style={{width: '90%'}} >
            <Title
                title='Solicitar Diretrizes Metropolitanas'
                subtitle='Para solicitar diretrizes metropolitanas, selecione o processo na lista abaixo, 
                faça o upload dos documentos necessários em pdf e clique em "Solicitar Diretrizes".'
                color={ setColor}
            />
            <div className="row">
                <div className="col s9">
                    <label>Pesquisar</label>
                    <input
                        className="input"
                        type="text"
                        name="search"
                        onChange={search}
                    />
                </div>
                <Filtros search={search}/>
            </div>
            <div className='z-depth-3' style={{padding: '0px 10px 1px', borderRadius: '10px'}}>
                
                <RenderSearch
                search={searchArray}
                collection={redux.empCollection}
                rtCollection={redux.rtCollection}
                onSelect={selectProcess}
                checked={data.checked}
                color={setColor}
                fields={['_id', 'nProcess', 'nomeEmpreendimento', 'modalidade', 'area', 'munEmpreendimento', 'status', 'tecnico' ]}
                renderEmp={true}
                renderRt={true}
                empDetails={empDetails}
                rtDetails={rtDetails}
                ocultarArquivos={true}
                sort={sort}
                reverse = {reverse}
                />
                
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
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
                                <legend>
                                    {nameParc[0].nomeEmpreendimento} - Documentos para solicitação de diretrizes
                                </legend>
                                {children}
                            </fieldset>
                            <button
                                className="btn teal darken-3 right"
                                style={{ marginBottom: '20px' }}
                                onClick = {submitFiles}
                            >
                                Solicitar Diretrizes
                            </button>
                        </div>)
                        : void 0
                }
            </div>
        </div>
    );
};

export default SolicitaDiretriz;