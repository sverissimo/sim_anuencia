import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import { BackButton } from '../common/buttons'


const AnuenciaTemplate = (props) => {

    let { setColor, search, searchArray, selectProcess, data, redux,
        empDetails, rtDetails, showFiles } = props

    let selectedProcess
    void selectedProcess
    if (data.selectedId) selectedProcess = redux.processCollection.filter(el => el._id.match(data.selectedId))[0]

    return (
        <div className="container" style={{ width: '95%' }} >
            <Title
                title='Analisar Processo'
                subtitle='Selecione o processo para analisar, registrar pendências ou emitir anuência prévia.'
                color={setColor}
            />
            <div className="row">
                <div className="col s11">
                    <label>Filtrar</label>
                    <input
                        className="input"
                        type="text"
                        name="search"
                        onChange={search}
                        value={data.searchValue}
                    />
                </div>
                <div className="col s1 right" style={{ paddingTop: '35px' }}>
                    <i className="material-icons">search</i>
                </div>
            </div>
            <div className='z-depth-3' style={{ width: '100%', padding: '0px 10px 1px', borderRadius: '10px' }}>

                <RenderSearch
                    search={searchArray}
                    collection={redux.empCollection}
                    rtCollection={redux.rtCollection}
                    processCollection={redux.processCollection}
                    onSelect={selectProcess}
                    checked={data.checked}
                    color={setColor}
                    fields={['_id', 'nProcess', 'nomeEmpreendimento', 'modalidade', 'munEmpreendimento', 'status', 'tecnico']}
                    renderEmp={true}
                    renderRt={true}
                    empDetails={empDetails}
                    rtDetails={rtDetails}                    
                    showFiles={showFiles}
                />

            </div>
            <div className="row" style={{ marginTop: '15px' }}>
                {
                    !data.selectedId ?
                        <div className="col s1 right">
                            <BackButton
                                disabled={data.checked === null}
                                icon='clear'
                                onClick={props.clear}
                            />
                        </div> : null
                }

            </div>
        </div>
    );
};

export default AnuenciaTemplate;