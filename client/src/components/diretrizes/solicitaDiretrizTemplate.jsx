import React from 'react';

const SolicitaDiretriz = (props) => {

    return (
        <div className="container" >
            <div className="row col s12">
                <center>
                    <h4><b>Solicitar Diretrizes Metropolitanas</b></h4>
                </center>
                <div className="card-panel teal lighten-5" style={{ marginBottom: '10px' }} >
                    <b>Para solicitar diretrizes metropolitanas,  Faça o upload dos documentos necessários em pdf e clique em "Solicitar Diretrizes".</b>
                </div>
            </div>
            <div>
                <form>
                    <fieldset>
                        <legend>Documentos para solicitação de diretrizes</legend>
                        {props.children}
                    </fieldset>

                    <button className="btn blue right">Solicitar Diretrizes</button>
                </form>
            </div>
        </div>
    );
};

export default SolicitaDiretriz;



