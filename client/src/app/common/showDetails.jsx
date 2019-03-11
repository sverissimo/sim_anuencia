import React from 'react';
import { CloseWindow } from '../common/buttons'
import fieldConfig from '../config/fieldConfig'

const ShowDetails = (props) => {
    let { empId, rtId, showEmp, showRt, close, empCollection, rtCollection } = props

    let persona = ''
    let personaDetails
    if (showEmp && empCollection) {
        persona = empCollection.filter(emp => emp._id.match(empId))
        personaDetails = Object.entries(persona[0]).splice(2, 9)
    }
    if (showRt && rtCollection) {
        persona = rtCollection.filter(rt => rt._id.match(rtId))
        personaDetails = Object.entries(persona[0]).splice(2, 2)
    }

    if (persona !== '' && (showEmp || showRt)) {

        return (
            <div className='card z-depth-5'
                style={{
                    position: 'fixed',
                    top: '30%',
                    right: '33%',
                    left: '33%',
                    padding: '5px 0px 7px 20px',
                    borderRadius: '15px',
                    border: '1px solid #aaa',
                }}>
                <div className='row'>
                    <div className="center"><h5>{persona[0].nome}</h5></div>
                    <div className="center"><h5>{persona[0].nomeRt}</h5></div>
                </div>

                <div className="row">
                    {
                        personaDetails.map((d, i) =>
                            <div className='col s12 m6' key={i}>
                                <strong > {fieldConfig(d[0], 'label')}: </strong>{d[1]} </div>
                        )
                    }
                </div>
                <div style={{
                    position: 'absolute',
                    top: '0.4%',
                    right: '0.4%'
                }}>
                    <CloseWindow close={close} />
                </div>
            </div >
        )
    } else { return null }
};

export default ShowDetails;