import React from 'react';
import { allFilesLabels } from './configLabels';
import { CloseWindow } from '../common/buttons'
import showDate from './showDate'
import formatFileSize from '../config/formatFileSize'

const labels = (fieldName) => {

    let allFilesArray = []
    allFilesArray = allFilesLabels()
    let label = allFilesArray.filter(e => e.nameInput.match(fieldName))
    return label[0].label
}

const ShowFiles = (props) => {
    let { showFiles, close, processCollection, selectedId, filesCollection, download } = props

    let process = processCollection.filter(el => el._id.match(selectedId))
    let files
    if (filesCollection && filesCollection[0]) {
        files = filesCollection.filter(el => el.metadata.processId.match(selectedId))
    }

    if (showFiles && (process && (process[0] && (files && files[0])))) {
        return (
            <div className='container z-depth-3'
                style={{
                    position: 'fixed',
                    top: '30%',
                    right: '15%',
                    left: '15%',
                    height: '50%',
                    borderRadius: '15px',                    
                    backgroundColor: 'white',
                    padding: '15px 0px 0px 30px',
                    border: '1px solid #ddd',
                    marginBottom: '25px',
                    marginTop: '25px',
                    overflowY: 'auto',
                    overflowX: 'hidden'

                }}>
                <div className="row">
                    <div className="row">
                       <hr style={{marginTop: '1.3%'}} /> <h5> <img alt="" src="/images/folderIcon2.jpg" style={{ paddingLeft: '20px', marginRight: '20px' }} /> Arquivos > {process[0].nomeEmpreendimento}</h5>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <div className="col s1">
                                <img alt="" src="/images/multipleFiles2.png" />
                            </div>
                            <div className="col s11">
                                
                                <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Arquivo</h6>
                            </div>
                        </div>

                        <div className="col s3">
                            <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Data de Upload</h6>
                        </div>
                        <div className="col s3">
                            <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Tamanho</h6>
                        </div>
                    </div>
                    {files.map((file, index) =>
                        <div key={index}>
                            <div className="row">
                                <div className="col s6">
                                    <div className="col s1">
                                        <img alt="" src="/images/genericFile.png" />
                                    </div>
                                    <div id={file._id}
                                        style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                        className="col s11"
                                        onClick={download}>

                                        {labels(file.metadata.fieldName)}
                                    </div>
                                </div>
                                <div className="col s3">
                                    {showDate(file.uploadDate)}
                                </div>
                                <div className="col s3">
                                    {formatFileSize(file.length)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{
                    position: 'absolute',
                    top: '0.5%',
                    right: '0.5%'
                }}>
                    <CloseWindow close={close} />
                </div>
            </div>
        )
    } else if (showFiles && (process && (process[0] && (files && !files[0])))) {

        return (
            <div className='card'
                style={{
                    position: 'fixed',
                    top: '30%',
                    right: '33%',
                    left: '33%',
                    border: '3px solid #000000',
                    backgroundColor: 'white',
                    paddingLeft: '20px',
                    borderRadius: '15px',
                    backgroundColor: 'white',
                    padding: '15px 0px 0px 30px',
                    border: '1px solid #ddd',
                    marginBottom: '25px',
                    marginTop: '25px'
                }}>
                <div className="row">
                    <div className="row">
                        <h5>Arquivos > {process[0].nomeEmpreendimento}</h5>
                    </div>
                    <div className='col s6'>Nenhum arquivo encontrado</div>
                </div>
                <div style={{
                    position: 'absolute',
                    top: '0%',
                    right: '0%',
                }}>
                    <CloseWindow close={close} />
                </div>
            </div>
        )
    } else {
        return null
    }
};

export default ShowFiles;