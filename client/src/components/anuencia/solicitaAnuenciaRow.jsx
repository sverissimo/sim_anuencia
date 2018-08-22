import React from 'react';

const SolicitaAnuenciaRow = (props) => {

    return (
        <div className="col s12 m6" style={{ paddingTop: "10px", paddingLeft: "20px", paddingRight: "20px" }}>

            <label style={{ fontSize: "15px", color: "black" }}> {props.object.label} </label>
            <div className="file-field input-field ">
                <i style={{ marginLeft: "9px", color: "#02b5a5", fontSize: "1,1rem", float: 'right' }}
                    className="material-icons tooltipped col s1" data-position="bottom"
                    data-tooltip={props.object.tooltip}> help_outline </i>

                <div>
                    <span className="btn-small">Procurar</span>
                    <input type="file" />
                </div>

                <div className="file-path-wrapper" >
                    <input className="file-path validate " type="text"
                        placeholder="Carregar arquivo" />
                </div>
            </div>


        </div>
    );
};

export default SolicitaAnuenciaRow;