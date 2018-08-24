import React from 'react';

const uploadButton = (props) => {
    return (
        <div className="file-field input-field">
            <div className="btn-small">
                <span>Procurar</span>
                <input type="file" />
            </div>

            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"
                    placeholder={props.label} />
            </div>
        </div>
    );
};

export default uploadButton;