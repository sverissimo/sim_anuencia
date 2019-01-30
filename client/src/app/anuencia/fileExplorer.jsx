import React from 'react';
import showDate from '../common/showDate'

const FileExplorer = (props) => {
    let { showFiles, close, processCollection, selectedId, process, filesCollection, download } = props
    const log = process.processHistory.filter(proc => proc.files)
    console.log(log)
    return (
        <div style={{ height: '200px' }}>
            <h5>{process.nomeEmpreendimento}</h5>
            {
                log.map((el, i) =>
                    <div key={i} align="center">
                        <h6>{el.label}</h6>
                        <div>{showDate(el.createdAt)}</div>
                        {el.files.map((file, index) =>
                            <div key={index}>{file.originalName}</div>
                        )}
                    </div>
                )}
        </div>
    );
};

export default FileExplorer