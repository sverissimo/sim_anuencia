import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import { BackButton } from '../common/buttons'

const Diretriz = (props) => {

    let {setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        children, empDetails, rtDetails, download, showFiles} = props
   
    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0
    
    return (
        <div className="container" style={{width: '90%'}} >
            <Title
                title='Diretrizes Metropolitanas'
                subtitle='Para a emissão de diretrizes metropoilotanas, agendamento a CGT e a vistoria, 
                faça o upload da diretriz em pdf e clique em "Emitir Diretrizes".'
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
            <div className='z-depth-3' style={{width: '100%', padding: '0px 10px 1px', borderRadius: '10px'}}>
                
                <RenderSearch
                search={searchArray}
                collection={redux.empCollection}
                rtCollection={redux.rtCollection}
                processCollection={redux.processCollection}
                onSelect={selectProcess}
                checked={data.checked}
                color={setColor}
                fields={[1,2,3,6,8,9,10]}
                renderEmp={true}
                renderRt={true}
                empDetails={empDetails}
                rtDetails={rtDetails}
                download={download}
                showFiles={showFiles}
                />
                
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
                <div className="col s1 right">
                    <BackButton
                    disabled={data.checked === null}
                    icon='clear'
                    onClick={props.clear}
                    showFiles={showFiles}
                    />
                </div>
            </div>

            <div>
                {
                    data.selectedId && data.checked  ?
                        (<div>
                            <fieldset 
                            style={{ paddingBottom: '0px', marginBottom: '20px'}}>
                                <legend style={{ fontSize: '1.3rem' }}>
                                    {nameParc[0].nomeEmpreendimento} - Diretrizes Metropolitanas
                                </legend>
                                {children}
                            </fieldset>

                            
                        </div>)
                        : null
                }
                {
                    data.anexaDiretriz ?
                        <button
                            className="btn teal darken-3 right"
                            style={{ marginBottom: '30px' }}
                            type="submit"
                            onClick={submitFiles}
                        >Emitir Diretrizes Metropolitanas
                    </button> : null
                }
            </div>
        </div>
    );
};

export default Diretriz;