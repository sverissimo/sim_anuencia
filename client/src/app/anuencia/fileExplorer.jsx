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
                    <div style={{ border: '1px solid #ddd', padding: '1% 0 0 1%' }} key={i + 1000}>
                        <div className='row' align="center">
                            <span style={{ fontSize:'1rem', fontWeight:500}} >{el.label} em {showDate(el.createdAt)}</span>
                        </div>
                        <div className='row' style={{ fontSize:'0.9rem', padding: '0.8% 0', backgroundColor:'#f7f7f7', fontWeight:500, borderBottom: '1px solid #ddd', borderTop: '1px solid #ddd'}}>
                            <div className="col s5 left">Documento</div>
                            <div className="col s4 left">Nome do arquivo</div>
                            <div className="col s3 center">Tamanho</div>
                        </div>
                        <div className='row'>
                            {el.files.map((file, index) =>
                                <div className='row' key={(index + 100)} style={{ paddingLeft: '1%' }} >
                                    <div className='col s5'>{fileLabel(file.fieldName)}</div>
                                    <div className='col s4'>
                                        <span
                                            id={file.id}
                                            key={index}
                                            style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                            onClick={(e)=>download(e, file.originalName)}>
                                            {file.originalName}
                                        </span>
                                    </div>
                                    <div className='col s3 center'>{formatFileSize(file.fileSize)}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
};

export default FileExplorer