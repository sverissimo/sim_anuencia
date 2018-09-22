import React from 'react';

const SolicitaAnuenciaRow = (props) => {

    return (
        <div className="file-field input-field">
            <div className="row" style={{ marginBottom: '35px' }}>
                <label style={{ color: 'black', fontWeight: 400, fontSize: '1.02rem' }}>
                    {props.label}
                </label>
            </div>

            <div className="row file-path-wrapper">
                <div className="col s10">
                    <input className="file-path validate" type="text" placeholder="Selecionar arquivo" />
                </div>
                <div className="col s1">
                    <i className="material-icons grey-text text-lighten-6 small" >
                        attach_file
                        </i>
                </div>
            </div>
            <input type="file" />
        </div>

    );
};

export default SolicitaAnuenciaRow;