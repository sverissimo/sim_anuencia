import React from 'react';
import { BackButton } from '../common/buttons'
import anuenciaMenu from '../config/anuenciaMenu'
import FileExplorer from './fileExplorer'
import Anuencia from './emiteAnuencia'
import AnuenciaForm from './anuenciaForm'
import ProcessInfo from './processInfo'
import LogDetails from './logDetails'


const ProcessTemplate = (props) => {
    const { clear, data, selectedOption, optionSelect, process, empreend, rt, divConfig, changeValue,
        showLog, clearLog, log, download } = props

    const returnComponent = (name) => {
        switch (name) {
            case 'FileExplorer':
                return <FileExplorer />
            case 'Pendencias':
                return <AnuenciaForm
                    process={process}
                    empreend={empreend}
                    rt={rt}
                    value={data.analiseProc.pendencias}
                    changeValue={changeValue}
                />
            case 'Anuencia':
                return <Anuencia />
            case 'ProcessInfo':

                if (log.logDetails === false) {
                    return <ProcessInfo
                        process={process}
                        showLog={showLog}
                    />
                } else {
                    return <LogDetails
                        process={process}
                        empreend={empreend}
                        rt={rt}
                        index={log.logIndex}
                        clearLog={clearLog}
                        download={download}
                    />
                }
        }
    }
    return (
        <div className='container' style={{ width: '90%' }}>
            <div>
                <div className="row" align='center' style={{
                    border: '1px solid #ddd',

                    backgroundColor: '#ffe',
                    fontSize: '1.3rem',
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
                <div style={{ minHeight: '50vh', border: '1px solid #ddd', borderRadius: '2%', marginBottom: '2%'}}>
                    {
                        selectedOption === '' ?
                            <div className='col push-s4'>
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