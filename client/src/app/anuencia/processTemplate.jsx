import React from 'react';
import { BackButton } from '../common/buttons'

const ProcessTemplate = (props) => {
    const { clear, data, redux } = props

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
    console.log(empreend, rt)
    if (data.selectedId) {

        return (
            <div className='container'>
                <div>
                    <div className="row" align='center'>
                        <h4>Analisar Processo - {process.nomeEmpreendimento}</h4>
                        <h5>Empreendedor: {empreend.nome}, RT: {rt.nomeRt} </h5>
                    </div>
                    <div className="row" style={{padding: 0, margin: 0}}>
                        <div align="center" className="col s12 m6 l3" style={{ minHeight: '20vh', border: '1px solid #ddd', borderRadius: '2%' }}>
                            <div>
                                <img className="center-align" src="/images/search_documents3.png"
                                    style={{ margin: '10px 10px 0px 10px' }} height="110" alt="" />
                                <div>
                                </div>
                                <h5>Ver arquivos</h5>
                            </div>
                        </div>

                        <div align="center" className="col s12 m6 l3" style={{ minHeight: '20vh', border: '1px solid #ddd', borderRadius: '2%' }}>
                            <div>
                                <img className="center-align" src="/images/pendencias.png"
                                    style={{ margin: '10px 10px 0px 10px' }} height="110" alt="" />
                                <div>
                                </div>
                                <h5>Registrar Pendências</h5>
                            </div>
                        </div>

                        <div align="center" className="col s12 m6 l3" style={{ minHeight: '20vh', border: '1px solid #ddd', borderRadius: '2%', borderBottom: '3px solid red' }}>
                            <div>
                                <img className="center-align" src="/images/emitir_anuencia3.png"
                                    style={{ margin: '10px 10px 0px 10px' }} height="110" alt="" />
                            </div>
                            <div>
                                <h5>Emitir Anuência</h5>
                            </div>
                        </div>

                        <div align="center" className="col s12 m6 l3" style={{ minHeight: '20vh', border: '1px solid #ddd', borderRadius: '2%'}}>
                            <div>
                                <img className="center-align" src="/images/process_info3.png"
                                    style={{ margin: '10px 10px 0px 10px' }} height="110" alt="" />
                            </div>
                            <div>
                                <h5>Informações do Processo</h5>
                            </div>
                        </div>

                    </div>
                    <div className="row valign-wrapper" style={{ height: '50vh', border: '1px solid #ddd', borderRadius: '2%', textAlign:'center' }}>
                        <h4>Choose an option above</h4>
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
    } else return null
};

export default ProcessTemplate;