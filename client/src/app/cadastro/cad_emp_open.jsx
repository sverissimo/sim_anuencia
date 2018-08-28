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

    const renderFields = () => {
        let configArray = [];
        let configForm = props.config
        for (let keys in configForm) {
            configArray.push({
                id: keys,
                settings: configForm[keys]
            })
        }
        return configArray.map((item, i) => {
            let config = item.settings
            return (
                <div key={i} className={config.divClassName}>
                    <input type={config.type}
                        className="active"
                        name={config.name}
                        onChange={props.handleChange}
                        value={config.value}
                        placeholder=" "
                        disabled={enableInput.enable}
                        onBlur={config.onBlur}
                    />
                    <label className="active"
                        htmlFor={config.name}>
                        {config.label}
                    </label>
                </div>

            )
        })

    }



    
    return (

        <div style={{ marginLeft: 40, marginRight: 40, marginBottom: '10px' }} >
            <form action="">
                <fieldset className="input-field">
                    <legend className="input-field">
                        <strong> Dados do Empreendimento </strong>
                    </legend>
                    <div className="row" >
                        {renderFields()}
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

