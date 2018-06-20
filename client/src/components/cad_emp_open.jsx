import React from 'react';

const OpenProcess = (props) =>  
{
    const view = props.data.openProcess;
    if(view === true) {
        return (
    
            <div style={{marginBottom: '10px'}} >
                <fieldset className="input-field">
                    <legend className="input-field">
                        <strong> Dados do Empreendimento </strong>
                    </legend>
                    <div className="row">
                        <div className="input-field col s3">
                            <input type="text" className="validate" name="nomeEmpreendimento" /* onChange={props.handleChange} value={props.data.nomeRt} */ />
                            <label className="active" htmlFor="nomeEmpreendimento">Nome do Empreendimento</label>
                        </div>
                        <div className="input-field col s3">
                            <input type="number" className="validate" name="area" /* onChange={props.handleChange} value={props.data.phoneRt} */ />
                            <label className="active" htmlFor="area">Área Total da Gleba (m²):</label>
                        </div>
                        <div className="input-field col s3 ">
                            <input type="text" className="validate" name="modalidade" /* onChange={props.handleChange} value={props.data.emailRt} */ />
                            <label className="active" htmlFor="modalidade">Modalidade:</label>
                        </div>
                        <div className="input-field col s3 ">
                            <input type="text" className="validate" name="munEmpreendimento"/*  onChange={props.handleChange} value={props.data.emailRt} */ />
                            <label className="active" htmlFor="munEmpreendimento">Município:</label>
                        </div>
            
                    </div>
            
                </fieldset>
                </div>
            )
    } 
    else {
        return null
    }
}


export default OpenProcess;