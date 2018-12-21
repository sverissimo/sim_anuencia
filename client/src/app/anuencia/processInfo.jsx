import React from 'react';
import showDate from '../common/showDate'
//import ShowDetails from '../common/showDetails';



const ProcessInfo = (props) => {
    const { emp, rt, process, showLog } = props
    

    return (
        <div style={{ paddingLeft: '1rem', paddingTop: '1rem' }}>
            <div className="row">
                <div className="col s12 m9"> <strong>Status do processo</strong> </div>
                <div className="col s12 m3 center" style={{ fontsize: '10px' }}> <strong>Data</strong> </div>
            </div>
            {process.processHistory.map((el, i) =>
                <div className="row" key={i}  >
                    <div
                        className="col s12 m9"
                        style={{ cursor: 'pointer', color: 'blue' }}
                        id={i} 
                        onClick={showLog}
                    >
                        {el.label}
                    </div>
                    <div className="col s12 m3 center" > {showDate(el.createdAt)}</div>
                </div>
            )}
        </div>
    )
};

export default ProcessInfo;