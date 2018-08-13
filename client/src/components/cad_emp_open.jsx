import React from 'react';

let enableInput;
const voltarEmpRT = (event) => {
    event.preventDefault();
    enableInput.enable = "disabled"
}

const OpenProcess = (props) => {

    const view = props.data.openProcess;
    if (view === false) {
        enableInput = {
            enable: "disabled",
            alt: "Favor preencher os dados do empreendedor e do RT",
            autoFocus: false
        }
    } else {
        enableInput = {
            enable: "",
            alt: "",
            autoFocus: true
        }

    }
    return (

        <div style={{ marginLeft: 40, marginRight: 40, marginBottom: '10px' }} >
            <form action="">
                <fieldset className="input-field">
                    <legend className="input-field">
                        <strong> Dados do Empreendimento </strong>
                    </legend>
                    <div className="row">
                        <div className="input-field col s3 tooltipped" data-position="bottom" data-tooltip={enableInput.alt}>
                            <input type="text" className="validate" name="nomeEmpreendimento" disabled={enableInput.enable} autoFocus={enableInput.autoFocus}/* onChange={props.handleChange} value={props.data.nomeRt} */ />
                            <label className="active" htmlFor="nomeEmpreendimento">Nome do Empreendimento</label>
                        </div>
                        <div className="input-field col s3 tooltipped" data-position="bottom" data-tooltip={enableInput.alt}>
                            <input type="number" className="validate" name="area" disabled={enableInput.enable} alt={enableInput.alt}/* onChange={props.handleChange} value={props.data.phoneRt} */ />
                            <label className="active" htmlFor="area">Área Total da Gleba (m²):</label>
                        </div>
                        <div className="input-field col s3 tooltipped" data-position="bottom" data-tooltip={enableInput.alt}>
                            <input type="text" className="validate" name="modalidade" disabled={enableInput.enable} alt={enableInput.alt}/* onChange={props.handleChange} value={props.data.emailRt} */ />
                            <label className="active" htmlFor="modalidade">Modalidade:</label>
                        </div>
                        <div className="input-field col s3 tooltipped" data-position="bottom" data-tooltip={enableInput.alt}>
                            <input type="text" className="validate" name="munEmpreendimento" disabled={enableInput.enable} /*  onChange={props.handleChange} value={props.data.emailRt} */ />
                            <label className="active" htmlFor="munEmpreendimento">Município:</label>
                        </div>

                    </div>

                </fieldset>
                <div>
                    <input className="btn red darken-3 left" type="submit" disabled={enableInput.enable} value="Editar dados interessado e RT" style={{ marginTop: '10px' }} onSubmit={voltarEmpRT} />
                    <input className="btn right" type="submit" disabled={enableInput.enable} value="Cadastrar processo" style={{ marginTop: '10px' }} />
                </div>

            </form>
        </div>

    )
}




export default OpenProcess;