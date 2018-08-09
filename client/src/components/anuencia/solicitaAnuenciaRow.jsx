import React from 'react';

const SolicitaAnuenciaRow = (props) => {
    return (
            <div className="row" >
                <label style={{ fontSize: "18px", color: "black" }}> {props.object.label} </label>
                <i style={{ marginLeft:"9px", color:"#42a5f5", fontSize:"1,1rem", float:'right' }}
                    className="material-icons tooltipped" data-position="bottom"
                    data-tooltip={props.object.tooltip}> help_outline </i>
                <div className="file-field input-field ">
                    <div className="btn">
                        <span>Procurar</span>
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

export default SolicitaAnuenciaRow;