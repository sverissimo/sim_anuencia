import React from 'react';

const SolicitaAnuencia = (props) => {

    return (
        <div className="container" >
            <div className="row">
                <center>
                    <h4><b>Solicitar Anuência Prévia</b></h4>
                </center>
                <div className="card-panel teal lighten-5" style={{ marginBottom: '20px', maxHeight: '20px' }} >
                    <b>Para anuência prévia, faça o upload dos documentos necessários em pdf e clique em "Solicitar Anuência".</b>
                </div>

                <form>
                    <div className="row col s12">
                        {props.children}
                    </div>
                    <div className="row col s12">
                        <button className="btn blue darken-1 right">Solicitar Anuência</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SolicitaAnuencia;



