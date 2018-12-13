import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import { BackButton } from '../common/buttons'


const AnuenciaTemplate = (props) => {

    let { setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        empDetails, rtDetails, download, showFiles } = props

    let selectedProcess
    data.selectedId ? selectedProcess = redux.processCollection.filter(el => el._id.match(data.selectedId))[0] : void 0



    let info = {
        title: 'Analisar Processo',
        subtitle: 'Selecione o processo para analisar, registrar pendências ou emitir anuência prévia.',
        showSearchBar: true
    }
    if (data.selectedId) {
        info.title = selectedProcess.nomeEmpreendimento
        info.subtitle = null
        info.showSearchBar = false
    }

    return (
        <div className="container" style={{ width: '90%' }} >
            <Title
                title={info.title}
                subtitle={info.subtitle}
                color={setColor}
            />
            {
                info.showSearchBar ?
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
                    </div> : void 0
            }
            <div className='z-depth-3' style={{ width: '100%', padding: '0px 10px 1px', borderRadius: '10px' }}>

                <RenderSearch
                    search={searchArray}
                    collection={redux.empCollection}
                    rtCollection={redux.rtCollection}
                    processCollection={redux.processCollection}
                    onSelect={selectProcess}
                    checked={data.checked}
                    color={setColor}
                    fields={[2, 3, 4, 9, 8, 7]}
                    renderEmp={true}
                    renderRt={true}
                    empDetails={empDetails}
                    rtDetails={rtDetails}
                    download={download}
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