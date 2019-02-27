import React from 'react';
import showDate from './showDate'
import LogDetails from './logDetails'
import { soloStyle } from '../config/soloStyle'
import { CloseWindow }from '../common/buttons'

const ProcessInfo = (props) => {
    const { logDetails, index, process, showLog, clearLog, soloComponent, hideLog } = props

    if (logDetails === false) {
        return (
            <div style={soloStyle(soloComponent, ['15%', '70%'])}>
                {
                    soloComponent === true ?
                        <div className="row" style={{ textAlign: 'center' }}>
                            <div style={{
                                position: 'absolute',
                                top: '0.5%',
                                right: '0.5%'
                            }}>
                                <CloseWindow close={hideLog} />
                            </div>
                            <h5>
                                Histórico do Processo - {process.nomeEmpreendimento}
                            </h5>
                        </div>
                        : null
                }
                <div className="row" style={{ padding: '2% 0% 0% 3%', fontSize: '18px'}}>
                    <div className="col s12 m9"> <strong>Status do processo</strong> </div>
                    <div className="col s12 m3 center" style={{ fontsize: '10px'}}> <strong>Data</strong> </div>
                </div>
                {process.processHistory.map((el, i) =>
                    <div className="row" key={i} style={{ paddingLeft: '3%' }}>
                        {
                            el.label === 'Processo cadastrado' ?
                                <div>
                                    <div className="col s12 m9">
                                        {el.label}
                                    </div>
                                    <div className="col s12 m3 center" > {showDate(el.createdAt)}</div>
                                </div>
                                :
                                <div>
                                    <div
                                        className="col s12 m9"
                                        style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                        id={i}
                                        onClick={showLog}
                                    >
                                        {el.label}
                                    </div>
                                    <div className="col s12 m3 center" > {showDate(el.createdAt)}</div>
                                </div>
                        }
                    </div>
                )}
            </div>
        )
    } else {
        return <LogDetails
            process={process}
            index={index}
            clearLog={clearLog}            
            soloComponent={soloComponent}
            hideLog={hideLog}
        />
    }
};

export default ProcessInfo;