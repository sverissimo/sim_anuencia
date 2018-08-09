import React from 'react';

const SolicitaDiretriz = (props) => {

    return (
        <div className="container" >
            <div className="row">
                <center>
                    <h4><b>Solicitar Diretrizes Metropolitanas</b></h4>
                </center>
                <div className="card-panel teal lighten-5" style={{ marginBottom: '30px' }} >
                    <b>Para solicitar diretrizes metropolitanas,  Faça o upload dos documentos necessários em pdf e clique em "Solicitar Diretrizes".</b>
                </div>
                <form className="col s12">
                    {props.children}
                    <button className="btn blue right">Solicitar Diretrizes</button>
                </form>
            </div>
        </div>
    );
};

export default SolicitaDiretriz;



