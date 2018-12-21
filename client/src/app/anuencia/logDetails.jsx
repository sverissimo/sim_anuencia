import React from 'react';
import { BackButton } from '../common/buttons'
import { allFilesLabels } from '../common/configLabels';

const labels = (fieldName) => {

    let allFilesArray = []
    allFilesArray = allFilesLabels()
    let label = allFilesArray.filter(e => e.nameInput.match(fieldName))
    return label[0].label
}

const LogDetails = (props) => {
    const { emp, rt, process, index, clearLog } = props

    const log = process.processHistory[index]
    
    return (
        <div>
            <div className="row">
                <div className="col">{log.label}</div>
            </div>
            {
                log.files.map((file, i)=> (
                    <div className="row" key={i}>
                        <div className="col">{labels(file.fieldName)}</div>
                    </div>
                ))
            }

            <div className="row">
                <div className="col s1 left">
                    <BackButton
                        icon='arrow_back'
                        onClick={clearLog}
                    /> Voltar
                        </div>
            </div>
        </div>
    );
};

export default LogDetails;