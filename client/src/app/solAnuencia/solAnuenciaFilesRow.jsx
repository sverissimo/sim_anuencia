import React from 'react';
import ReactTooltip from 'react-tooltip'

const SolAnuenciaFilesRow = (props) => {
    const { label, nameInput, tooltip, tt } = props.object

    return (
        <div
            style={{ padding: "10px", paddingLeft: "20px", paddingRight: "20px", margin: 0 }}
        >
            <label
                style={{ fontSize: "16px", paddingTop: "15px", fontWeight: 450, color: "black" }}>
                {label}
            </label>
           { tt && <i style={{ marginLeft: "9px", color: "#42a5f5", fontSize: "1.2rem", cursor: "default" }}
                className="material-icons"
                data-tip={tooltip}> help_outline </i>}
            <ReactTooltip />
            <div className="file-field input-field" key={nameInput}>
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
                            name={nameInput}
                            onChange={props.upload} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SolAnuenciaFilesRow;