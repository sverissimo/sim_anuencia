import React from 'react';

const solicitaDiretrizRow = (props) => {
    return (
            <div className="row col s12" style={{padding: "10px", paddingLeft: "20px", paddingRight: "20px" }}>
                <label style={{ fontSize: "15px", color: "black" }}> {props.object.label} </label>
                <i style={{ marginLeft:"9px", color:"#42a5f5", fontSize:"1,1rem", float:'right' }}
                    className="material-icons tooltipped" data-position="bottom"
                    data-tooltip={props.object.tooltip}> help_outline </i>
                <div className="row file-field input-field">
                    <div>
                        <span className="btn-small">Procurar</span>
                        <input type="file" />
                    </div>

                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text"
                            placeholder="Carregar arquivo" />
                    </div>
                </div>
            </div >
    );
};

export default solicitaDiretrizRow;