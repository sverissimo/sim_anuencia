import React from 'react';

const SolAnuenciaFilesRow = (props) => {

    return (
        <div
            style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", margin: 0 }}
        >
            <label
                style={{ fontSize: "16px", paddingTop: "15px", fontWeight: 450, color: "black" }}>
                {props.object.label}
            </label>

            <div className="file-field input-field" key={props.object.nameInput}>
                <div className="file-path-wrapper">
                    <div className="col s11" >
                        <input
                            className="file-path validate"
                            type="text"
                            placeholder="Carregar arquivo" />
                    </div>
                    <div className="col s1 right"  >
                        <i className="material-icons grey-text text-darken-1 small">attach_file</i>
                        <input
                            type="file"
                            name={props.object.nameInput}
                            onChange={props.upload} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SolAnuenciaFilesRow;