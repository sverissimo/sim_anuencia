import React from 'react';
import { BackButton } from '../common/buttons'
import ShowFiles from '../common/showFiles'
import anuenciaMenu from '../config/anuenciaMenu'

const ProcessTemplate = (props) => {
    const { clear, data, redux, close, download } = props

    let process
    let empreend
    let rt
    if (data.selectedId) {
        process = redux.processCollection.filter(el => el._id.match(data.selectedId))[0]
        if (process) {
            empreend = redux.empCollection.filter(el => el._id.match(process.empId))[0]
            rt = redux.rtCollection.filter(el => el._id.match(process.rtId))[0]
        }
    }    

    if (data.selectedId) {
        data.showFiles = true

        return (
            <div className='container'>
                <div>
                    <div className="row" align='center' style={{
                        border: '1px solid #ddd',
                        backgroundColor: '#ffe',
                        fontSize: '1.3rem',
                        fontFamily: 'calibri',
                        marginTop: '15px'
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
                    <div className="row" style={{ marginBottom: 0 }}>
                        {
                            anuenciaMenu.map((opt, index) => (
                                <div key={index} align="center" className={`col s12 m6 l3  ${opt.className}`} style={opt.divStyle}>
                                    <div>
                                        <img className="center-align" src={opt.img}
                                            style={{ margin: '10px 10px 0px 10px' }} height="40" alt="" />
                                        <div>
                                        </div>
                                        <h6>{opt.label}</h6>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row valign-wrapper" style={{ height: '50vh', border: '1px solid #ddd', borderRadius: '2%' }}>
                        <div className='col push-s4'>
                             <h5>
                                 Selecione uma das opçoes acima.
                             </h5>
                      </div>
                        {/*  <ShowFiles
                            selectedId={data.selectedId}
                            showFiles={data.showFiles}
                            close={close}
                            processCollection={redux.processCollection}
                            filesCollection={redux.filesCollection}
                            download={download}
                            ocultarArquivos= {true}
                        /> */}
                    </div>
                    <div className="row">
                        <div className="col s1 left">
                            <BackButton
                                disabled={data.checked === null}
                                icon='arrow_back'
                                onClick={clear}
                            /> Voltar
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default ProcessTemplate;