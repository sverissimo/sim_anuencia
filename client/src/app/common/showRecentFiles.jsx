import React from 'react';
import { allFilesLabels } from './configLabels';
import { BackButton } from './buttons'
import showDate from './showDate'

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
                <div className="row">
                    <div className="row">
                        <h5>Arquivos > {process[0].nomeEmpreendimento}</h5>
                    </div>
                    <div className="row">
                        <div className="col s1">
                            <img src="/images/genericFile.png" />
                        </div>
                        <div className="col s5 ">
                            <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Arquivo</h6>

                        </div>
                        <div className="col s6">
                            <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Data de Upload</h6>
                        </div>
                    </div>
                    {files.map(file =>
                        <div>
                            <div className="row">
                                <div className="col s1">
                                    <img src="/images/genericFile.png" />
                                </div>
                                <div id={file._id}
                                    style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                    className="col s5 left"
                                    onClick={download}>
                                    {labels(file.metadata.fieldName)}</div>
                                <div className="col s6">
                                    {showDate(file.uploadDate)}
                                </div>
                            </div>
                        </div>
                    )}
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
            </div>
        )
    } else if (showFiles && (process[0] && process[0].solDirFiles.length === 0)) {

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
                <div className="row">
                    <div className="row">
                        <h5>{process[0].nomeEmpreendimento}</h5>
                    </div>
                    <div className='col s6'>Nenhum arquivo encontrado</div>
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
            </div>
        )
    } else {
        return null
    }

};

export default ShowFiles;