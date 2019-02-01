import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import {BackButton} from '../common/buttons'


const SolAnuenciaTemplate = (props) => {

    let {setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        children, empDetails, rtDetails, showFiles} = props
   
    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0

    return (
        <div className="container" style={{width: '90%'}}>
            <Title
                title='Solicitar Anuência Prévia'
                subtitle='Para solicitar anuência prévia, selecione o processo e faça o upload dos documentos 
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
            <div className='z-depth-3' style={{padding: '0px 10px 1px', borderRadius: '10px'}}>
                
                <RenderSearch
                search={searchArray}
                collection={redux.empCollection}
                rtCollection={redux.rtCollection}
                onSelect={selectProcess}
                checked={data.checked}
                color={setColor}
                fields={[2,3,4,5,6,8]}
                renderEmp={true}
                renderRt={true}
                empDetails={empDetails}
                rtDetails={rtDetails}
                showFiles={showFiles}
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