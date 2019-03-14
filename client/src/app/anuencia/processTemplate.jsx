import React from 'react';
import { BackButton } from '../common/buttons'
import anuenciaMenu from '../config/anuenciaMenu'
import FileExplorer from './fileExplorer'
import Anuencia from './emiteAnuencia'
import AnuenciaForm from './anuenciaForm'
import ProcessInfo from '../common/processInfo'



const ProcessTemplate = (props) => {
    const { redux, clear, data, selectedOption, optionSelect, process, empreend, rt, divConfig, changeValue,
        showLog, clearLog, log, close, upload, submit } = props

    const returnComponent = (name) => {
        switch (name) {
            case 'FileExplorer':
                return <FileExplorer
                    selectedId={data.selectedId}
                    showFiles={data.showFiles}
                    close={close}
                    processCollection={redux.processCollection}
                    filesCollection={redux.filesCollection}                    
                    process={process}
                />

            case 'Pendencias':
                return <AnuenciaForm
                    process={process}
                    empreend={empreend}
                    rt={rt}
                    value={data.analiseProc.pendencias}
                    changeValue={changeValue}
                    close={close}
                />
            case 'Anuencia':
                return <Anuencia
                    upload={upload}
                    submitFiles={submit}
                />
            case 'ProcessInfo':

                return <ProcessInfo
                    process={process}
                    showLog={showLog}
                    logDetails={log.logDetails}
                    index={log.logIndex}
                    clearLog={clearLog}                    
                />

            default:
                console.log('invalid option, dude!')
        }
    }
    return (
        <div className='container' style={{ width: '90%' }}>
            <div>
                <div className="row" align='center' style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#efefef',
                    fontSize: '1.2rem',
                    fontFamily: 'calibri',
                    marginTop: '15px',

                }}>
                    <h4>{process.nomeEmpreendimento}</h4>
                    <div className="row col s12">
                        <div className="col s12 m6 l4">
                            <b>Município:</b>  {process.munEmpreendimento}
                        </div>
                        <div className="col s12 m6 l4">
                            <b>Modalidade:</b> {process.modalidade}
                        </div>
                        <div className="col s12 m6 l4">
                            <b>Área:</b> {process.area}
                        </div>
                        <div className="col s12 m6 l4">
                            <b> Empreendedor: </b> {empreend.nome}
                        </div >
                        <div className="col s12 m6 l4">
                            <b>RT: </b>{rt.nomeRt}
                        </div>
                        <div className="col s12 m6 l4">
                            {process.status}
                        </div>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: 0, cursor: 'pointer' }}>
                    {
                        anuenciaMenu.map((opt, index) => (
                            <div id={opt.name} key={index} align="center"
                                className={`col s12 m6 l3 ${divConfig(opt).class}`}
                                style={divConfig(opt).stylez}
                                onClick={optionSelect}
                            >
                                <img id={opt.name} className="center-align" src={opt.img}
                                    style={{ margin: '10px 10px 0px 10px', cursor: 'pointer' }} height="40" alt="" />
                                <h6 id={opt.name} style={{ cursor: 'pointer', fontWeight: 550 }}>{opt.label}</h6>
                            </div>

                        ))
                    }
                </div>
                <div style={{ minHeight: '50vh', border: '1px solid #ddd', borderRadius: '2%', marginBottom: '2%' }}>
                    {
                        selectedOption === '' ?
                            <div className='col push-s4' style={{paddingTop: '20%'}}>
                                <h5>
                                    Selecione uma das opçoes acima.
                                </h5>
                            </div> :
                            <div className='col s12' style={{ height: '100%' }}>

                                {returnComponent(selectedOption)}

                            </div>
                    }
                </div>

                {
                    !log.logDetails || selectedOption !== 'ProcessInfo' ?

                        <div className="row">
                            <div className="col s1 left">
                                <BackButton
                                    disabled={data.checked === null}
                                    icon='arrow_back'
                                    onClick={clear}
                                /> Voltar
                             </div>
                        </div>
                        :
                        null
                }

            </div>
        </div>
    )
}


export default ProcessTemplate;