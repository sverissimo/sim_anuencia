import React from 'react';
import { BackButton } from '../common/buttons'
import fieldConfig from './fieldConfig'

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
            <div className='card'
                style={{
                    position: 'fixed',
                    top: '30%',
                    right: '33%',
                    left: '33%',
                    border: '3px solid #000000',
                    backgroundColor: 'white',
                    paddingLeft: '20px'
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
                    bottom: '0%',
                    right: '0%'
                }}>
                    <BackButton
                        onClick={close}
                        icon='close'
                        size='btn-tiny'
                    />
                </div>
            </div >
        )
    } else { return null }
};

export default ShowDetails;