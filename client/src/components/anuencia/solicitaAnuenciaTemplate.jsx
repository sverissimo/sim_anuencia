import React from 'react';

const SolicitaAnuencia = (props) => {
console.log(props)
    return (
        <div className="container" >
            <div className="row">
                <center>
                    <h4><b>Solicitar Anuência Prévia</b></h4>
                </center>
                <div className="card-panel teal lighten-5" style={{ marginBottom: '30px' }} >
                    <b>Para anuência prévia, faça o upload dos documentos necessários em pdf e clique em "Solicitar Anuência".</b>
                </div>
                <form className="col s12">
                    <fieldset style={{ padding: '40px' }} >
                        <legend>Documentos</legend>
                        {props.children}
                    </fieldset>

                    <button style={{marginTop: '22px'}} className="btn blue right">Solicitar Anuência</button>
                </form>
            </div>
        </div>
    );
};

export default SolicitaAnuencia;



