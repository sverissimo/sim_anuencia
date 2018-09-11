import React from 'react';
import { ConfirmButton, BackButton } from '../common/buttons'

const CadTemplate = (props) => {

    const renderFields = (data, enableInput) => {
        let configArray = [];
        for (let keys in data) {
            configArray.push({
                id: keys,
                settings: data[keys],
                enableInput: enableInput
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
                        value={props.data[item.id]}
                        placeholder=" "
                        disabled={item.enableInput}
                        onBlur={()=>props.handleBlur(config.name)}
                    />
                    <label className="active"
                        htmlFor={config.name}>
                        {config.label}
                    </label>
                </div>
            )
        })
    }

    const autoComplete = (collection, datalist, name) => {
        if (name.length > 2) {
            return (
                <datalist id={datalist}>
                    {
                        collection.map((item, index) => {
                            return (
                                <option key={index}>{item.nome}</option>
                            )
                        })}
                </datalist>
            )
        } else {
            return
        }
    }
    const autoCompleteRt = (collection, datalist, name) => {
        if (name.length > 2) {
            return (
                <datalist id={datalist}>
                    {
                        collection.map((item, index) => {
                            return (
                                <option key={index}>{item.nomeRt}</option>
                            )
                        })}
                </datalist>
            )
        } else {
            return
        }
    }
    
    return (
        <div style={{ marginLeft: 75, marginRight: 75 }} >
            <div className="tab-pane fade show active" id="empreend">
                <div className="valign-wrapper" >
                   
                        <i className="material-icons small teal-text">error_outline</i>
                        <strong style={{ marginLeft: 5, fontFamily: 'tahoma' }}>Preencha os dados do interessado e RT do processo. Caso o interessado e RT não estejam cadastrados, um novo cadastro será gerado automaticamente.</strong>
                   
                </div>
                <form onSubmit={props.handleSubmit}>
                    <fieldset className="input-field"><legend className="input-field"><strong> Interessado </strong></legend>
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
                                    disabled={props.data.enableEmp}
                                    autoFocus="true"
                                />
                                <label className="active" htmlFor="nome">Nome</label>
                                {autoComplete(props.data.empCollection, 'empreendList', props.data.nome)}
                            </div>
                            {renderFields(props.config.empreendForm, props.data.enableEmp)}
                        </div>
                    </fieldset>
                    <ConfirmButton enableInput={props.enableRtInput} enable={props.data.enableEmp} />
                    <fieldset className="input-field"><legend className="input-field"><strong> Responsável Técnico </strong></legend>
                        <div className="row">
                            <div className="input-field col s4">
                                <input
                                    type="text"
                                    list="rtList"
                                    className="validate"
                                    name="nomeRt"
                                    onChange={props.handleChange}
                                    value={props.data.nomeRt}
                                    onBlur={props.handleBlurRtName}
                                    disabled={props.data.enableRt}
                                    autoFocus={props.data.autoFocusRt}
                                />
                                <label className="active" htmlFor="nome">Nome</label>
                                {autoCompleteRt(props.config.rtCollection, 'rtList', props.data.nomeRt)}
                            </div>
                            {renderFields(props.config.rtForm, props.data.enableRt)}
                        </div>
                    </fieldset>
                    <BackButton enableInput={props.enableEmpInput} enable={props.data.enableRt} />
                    <ConfirmButton enableInput={props.enableProcessInput} enable={props.data.enableRt} />
                    <fieldset className="input-field"><legend className="input-field"><strong> Dados do Empreendimento </strong></legend>
                        <div className="row" >
                            {renderFields(props.config.processForm, props.data.enableProcess)}
                        </div>
                    </fieldset>
                    <div>
                        <BackButton enableInput={props.enableRtInput} enable={props.data.enableProcess} />
                        <input className="btn right" type="submit" disabled={props.data.enableProcess} value="Cadastrar processo" style={{ marginTop: '10px' }} />
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    );
};

export default CadTemplate;