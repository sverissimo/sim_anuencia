import React from 'react';
import { BackButton } from '../common/buttons'
import fieldConfig from './fieldConfig'

const ShowDetails = (props) => {
    let { empId, rtId, showEmp, showRt, close, empCollection, rtCollection } = props

    let persona = ''
    let personaDetails
    showEmp && empCollection ? (persona = empCollection.filter(emp => emp._id.match(empId)), personaDetails = Object.entries(persona[0]).splice(2, 9)) : void 0
    showRt && rtCollection ? (persona = rtCollection.filter(rt => rt._id.match(rtId)), personaDetails = Object.entries(persona[0]).splice(2, 2)) : void 0

    if (persona !== '' && (showEmp || showRt)) {

        return (
            <div className='card'
                style={{
                    position: 'fixed',
                    top: '30%',
                    right: '33%',
                    width: '35%',
                    height: '20%',
                    border: '3px solid #000000',
                    backgroundColor: 'white'

                }}>
                <div className='row'>
                    <div className="center"><h4>{persona[0].nome}</h4></div>
                    <div className="center"><h4>{persona[0].nomeRt}</h4></div>
                </div>

                <div className="row">
                    {
                        personaDetails.map((d, i) =>
                            <div className='col s4' key={i}>
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