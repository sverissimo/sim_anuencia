import React from 'react';
import SolicitaAnuenciaRow from './solicitaAnuenciaRow';
import Title from '../common/titleSubtitle';

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
//let color = document.getElementById('setcolor').style.backgroundColor
const SolicitaAnuenciaTemplate = (props) => {
    
    return (
        <div className="container" >
           <Title
                title='Solicitar Anuência Prévia'
                subtitle=' Para anuência prévia, faça o upload dos documentos necessários 
                em pdf e clique em "Solicitar Anuência". '
                color = {props.data.setColor}
            />
            <div className="row">
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