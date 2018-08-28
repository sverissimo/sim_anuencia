import React from 'react';

const CadEmpTemplate = (props) => {

    const renderFields = () => {
        let configArray = [];
        const configForm = props.config;
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

    const view = props.data.openProcess;
    let enableInput;
    if (view === true) {
        enableInput = {
            enable: "disabled",
            alt: "Preencher os dados do processo ou clique em voltar"
        }
    } else {
        enableInput = {
            enable: "",
            alt: ""
        }
    };
    const dataLogic = () => {
        if (props.data.nome.length > 2) {
            return (
                <datalist id='empreendList'>
                    {props.children}
                </datalist>
            )
        } else {
            return
        }
    }
    console.log(props.config)
    return (
        <div style={{ marginLeft: 50, marginRight: 50 }} >
            <div className="tab-pane fade show active" id="empreend" role="tabpanel" aria-labelledby="empreend-tab">
                <p>Preencha os dados do interessado e RT do processo. Caso o interessado e RT não estejam cadastrados, um novo cadastro será gerado automaticamente.</p>
                <form onSubmit={props.handleSubmit}>
                    <fieldset className="input-field">
                        <legend className="input-field"><strong> Interessado </strong></legend>

                        <div className="row">
                            <div className="input-field col s4">
                                <input
                                    type="text"
                                    list="empreendList"
                                    className="validate"
                                    name="nome"
                                    onChange={props.handleChange}
                                    value={props.data.nome}
                                    onBlur={props.handleBlurName}
                                    disabled={enableInput.enable}
                                />
                                <label className="active" htmlFor="nome">Nome</label>
                                {dataLogic()}
                            </div>
                            <div>
                                {renderFields()}
                            </div>

                            <input type="text" className="validate" name="ibge" id="ibge" style={{ display: 'none' }} />
                        </div>
                    </fieldset>

                    <fieldset className="input-field">
                        <legend className="input-field">
                            <strong> Responsável Técnico </strong>
                        </legend>
                        <div className="row">
                            <div className="input-field col s4">
                                <input type="text" className="validate" name="nomeRt" onChange={props.handleChange} value={props.data.nomeRt} disabled={enableInput.enable} />
                                <label className="active" htmlFor="nomeRt">Nome</label>
                            </div>
                            <div className="input-field col s2">
                                <input type="number" className="validate" name="phoneRt" onChange={props.handleChange} value={props.data.phoneRt} disabled={enableInput.enable} />
                                <label className="active" htmlFor="phoneRt">Telefone:</label>
                            </div>
                            <div className="input-field col s4 ">
                                <input type="text" className="validate" name="emailRt" onChange={props.handleChange} value={props.data.emailRt} disabled={enableInput.enable} />
                                <label className="active" htmlFor="emailRt">E-mail:</label>
                            </div>
                        </div>

                    </fieldset>
                    <div>
                        <input className="btn left" type="submit" value="Confirma" style={{ marginTop: '10px' }} disabled={enableInput.enable} />
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
};

export default CadEmpTemplate;