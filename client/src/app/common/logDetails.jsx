import React, { Component } from 'react';
import { allFilesLabels } from '../config/configLabels'
import showDate from './showDate'
import formatFileSize from '../config/formatFileSize'
import { soloStyle } from '../config/soloStyle'
import { CloseWindow } from '../common/buttons'
import download from './downloadFile'

const labels = (fieldName) => {

    let allFilesArray = []
    allFilesArray = allFilesLabels()
    let label = allFilesArray.filter(e => e.nameInput.match(fieldName))
    return label[0].label
}

class LogDetails extends Component {

    componentWillUnmount() {
        this.props.clearLog()
    }

    render() {
        const { process, index, clearLog, soloComponent, hideLog } = this.props
        const log = process.processHistory[index]

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

                        </div>
                        : null
                }
                {
                    (log.label === 'Pendências para emissão de diretrizes' || log.label.match('Análise')) ?
                        <div>
                            <h5>{log.label}</h5> <hr /> <br />
                        </div>
                        :
                        <div>
                            <div className="row">
                                <h5> <img alt="" src="/images/folderIcon2.jpg" style={{ paddingLeft: '20px', marginRight: '20px' }} /> Arquivos > {process.nomeEmpreendimento} > {log.label}</h5>
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
                        </div>

                }

                {
                    log.label === 'Pendências para emissão de diretrizes' ?

                        <div>{log.pendencias}</div>
                        :
                        log.label.match('Análise') ?
                            <div dangerouslySetInnerHTML={{ __html: log.pendencias }}></div>
                            :
                            log.files.map((file, i) => (

                                <div key={i}>
                                    <div className="row">
                                        <div className="col s6">
                                            <div className="col s1">
                                                <img alt="" src="/images/genericFile.png" />
                                            </div>
                                            <div className="col s11">
                                                <span id={file.id}
                                                    style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                                    onClick={download}>
                                                    {labels(file.fieldName)}
                                                </span>
                                            </div>

                                        </div>
                                        <div className="col s3">
                                            {showDate(file.uploadDate)}
                                        </div>
                                        <div className="col s3">
                                            {formatFileSize(file.fileSize)}
                                        </div>
                                    </div>
                                </div>

                            ))
                }

                <div className="row">
                    <div className="col s1 left" style={{ marginTop: '1%' }}>
                        <strong>
                            <i className='material-icons'
                                style={{ marginTop: '10%', color: 'teal', cursor: 'pointer', border: '1px solid #bbb', borderRadius: '55%' }}
                                onClick={clearLog}
                            > arrow_back
                            </i>
                        </strong>


                    </div>
                </div>

            </div>
        )
    }
};

export default LogDetails;