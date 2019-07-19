import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import {BackButton} from '../common/buttons'
import Filtros from '../common/filtros'

const SolAnuenciaTemplate = (props) => {

    let { setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        children, empDetails, rtDetails, showFiles, sort } = props

    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0

    return (
        <div className="container" style={{width: '90%'}}>
            <Title
                title='Solicitar Anuência Prévia'
                subtitle='Para solicitar anuência prévia, selecione o processo, faça o upload dos documentos 
                e projetos e clique em "Solicitar Anuência".'
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
                fields={['_id', 'nProcess', 'nomeEmpreendimento', 'modalidade', 'munEmpreendimento', 'status', 'tecnico' ]}
                renderEmp={true}
                renderRt={true}
                empDetails={empDetails}
                rtDetails={rtDetails}
                showFiles={showFiles}
                sort={sort}
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
                        (
                        <div>
                            <fieldset>
                                <legend style={{ fontSize: '1.3rem' }}>
                                    {nameParc[0].nomeEmpreendimento} - Documentos para solicitação de anuência prévia
                            </legend>
                            <div className="row">
                                {children[0]}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend style={{ fontSize: '1.3rem' }}>
                                    {nameParc[0].nomeEmpreendimento} - Projetos para solicitação de anuência prévia
                            </legend>
                            <div className="row">
                                {children[1]}
                                </div>
                            </fieldset>
                            <button
                                className="btn teal darken-3 right"
                                style={{ marginBottom: '20px' }}
                                onClick = {submitFiles}  
                            >Solicitar Anuência</button>
                        </div>
                        )
                        : null
                }
            </div>           
        </div>
    );
};

export default SolAnuenciaTemplate;