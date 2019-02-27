import React from 'react';
import showDate from '../common/showDate'
import formatFileSize from '../config/formatFileSize'
import { fileLabel } from '../config/configLabels'
import download from '../common/downloadFile'

const FileExplorer = (props) => {
    let { process } = props
    const log = process.processHistory.filter(proc => proc.files)

    return (
        <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>

            {
                log.map((el, i) =>
                    <div style={{ border: '1px solid #ddd', paddingLeft: '2%' }} key={i + 1000}>
                        <div className='row' align="center">
                            <h5>{el.label} em {showDate(el.createdAt)}</h5>
                        </div>
                        <div className='row'>
                            {el.files.map((file, index) =>
                                <div className='row' key={(index + 100)}>
                                    <div className='col s5'>{fileLabel(file.fieldName)}</div>
                                    <div className='col s4'>
                                        <span
                                            id={file.id}
                                            key={index}
                                            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                            onClick={download}>
                                            {file.originalName}
                                        </span>
                                    </div>
                                    <div className='col s3'>{formatFileSize(file.fileSize)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default FileExplorer