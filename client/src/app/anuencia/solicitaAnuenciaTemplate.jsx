import React from 'react';
import SolicitaAnuenciaRow from './solicitaAnuenciaRow';

const fieldSet = (legend, array) => (
    <fieldset style={{paddingTop: '5px'}}>
        <legend style={{fontSize: '20px'}}>{legend}</legend>
        {array.map((item, i) => {
            return (
                <div className="col s12 m6" key={i}>
                    <SolicitaAnuenciaRow label={item.label} tooltip={item.tooltip} />
                </div>
            )
        })}
    </fieldset>
)

const SolicitaAnuenciaTemplate = (props) => {
    return (
        <div className="container" >
            <div className="row">
                <center><h4><b>Solicitar Anuência Prévia</b></h4></center>
                <div className="card-panel valign-wrapper teal lighten-4" 
                style={{ marginBottom: '20px', maxHeight: '20px' }} >
                    <h6> Para anuência prévia, faça o upload dos documentos necessários 
                        em pdf e clique em "Solicitar Anuência". </h6>
                </div>
                <form>
                    <div className="row col s12">
                        {fieldSet('Documentos', props.array)}
                        {fieldSet('Projetos', props.array2)}
                    </div>
                    <div className="row col s12">
                        <button className="btn blue darken-1 right">Solicitar Anuência</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SolicitaAnuenciaTemplate;