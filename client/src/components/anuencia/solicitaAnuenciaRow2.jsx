import React from 'react';

const SolicitaAnuenciaRow2 = (props) => {
    return (
         <div className="col s12 m6" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <label style={{ fontSize: "15px", color: "black" }}> {props.object.label} </label>
                <i style={{ marginLeft: "9px", color: "#02b5a5", fontSize: "1,1rem", float: 'right' }}
                    className="material-icons tooltipped" data-position="bottom"
                    data-tooltip={props.object.tooltip}> help_outline </i>
                <div className="file-field input-field ">
                    <div className="btn-small">
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

export default SolicitaAnuenciaRow2;