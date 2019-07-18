import React from 'react';
import RenderSearch from '../common/renderSearch';
import Title from '../common/titleSubtitle';
import { BackButton } from '../common/buttons'
import Filtros from '../common/filtros'

const Diretriz = (props) => {

    let {setColor, search, searchArray, selectProcess, submitFiles, data, redux,
        children, empDetails, rtDetails, showFiles, reverse, sort} = props
   
    let nameParc
    data.selectedId ? nameParc = redux.processCollection.filter(el => el._id.match(data.selectedId)) : void 0
   
    return (
        <div className="container" style={{width: '90%'}} >
            <Title
                title='Diretrizes Metropolitanas'
                subtitle='Para a emissão de diretrizes metropolitanas, selecione o processo, 
                verifique os requisitos, faça o upload da diretriz em pdf e clique em "Emitir Diretrizes".'
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
            <div className='z-depth-3' style={{width: '100%', padding: '0px 10px 1px', borderRadius: '10px'}}>
                
                <RenderSearch
                search={searchArray}
                collection={redux.empCollection}
                rtCollection={redux.rtCollection}
                processCollection={redux.processCollection}
                onSelect={selectProcess}
                checked={data.checked}
                color={setColor}
                fields={['_id', 'nProcess', 'nomeEmpreendimento', 'munEmpreendimento', 'tecnico', 'cgt', 'vistoria' ]}
                renderEmp={true}
                renderRt={true}
                empDetails={empDetails}
                rtDetails={rtDetails}                
                showFiles={showFiles}
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
                    showFiles={showFiles}
                    />
                </div>
            </div>

            <div>
                {
                    data.selectedId && data.checked  ?
                        (<div>
                            <fieldset>
                                <legend>
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
                            type="submit"
                            onClick={submitFiles}
                        >Emitir Diretrizes Metropolitanas
                    </button> : null
                }
            </div>
        </div>
    )
}

export default Diretriz;