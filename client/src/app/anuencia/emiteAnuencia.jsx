import React from 'react';

const EmiteAnuencia = props => {
    const { upload, submitFiles } = props
    const fields = [
        {
            label: 'Anexar Nota Técnica',
            inputName: 'notaTecnica'
        },
        {
            label: 'Anexar Certidão de Anuência Prévia',
            inputName: 'anuenciaFile'
        }
    ]
    return (
        <div style={{ paddingLeft: '10%', marginBottom: '10%' }}>
            <h5>Emitir Anuência Prévia</h5>

            {fields.map((field, i) => (
                <div style={{marginTop: '10%'}} key={i}>
                    <label
                        style={{
                            fontSize: "16px", 
                            paddingTop: "15px",                            
                            fontWeight: 450,
                            color: "black",

                        }}>
                        {field.label}
                    </label>
                    <div className="row file-field input-field" key={field.inputName}>
                        <div className="file-path-wrapper row">
                            <div className="col s11">
                                <input
                                    className="file-path validate"
                                    type="text"
                                    placeholder="Carregar arquivo" />
                            </div>
                            <div className="col s1 right">
                                <i className="material-icons grey-text text-darken-1 small">attach_file</i>
                                <input
                                    type="file"
                                    name={field.inputName}
                                    onChange={upload} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button
                className="btn teal darken-3 right"
                style={{ margin: '4% 3% 0 0' }}
                type="submit"
                onClick={submitFiles}
            >
                Emitir Anuência Prévia
            </button>
        </div>
    );
};

export default EmiteAnuencia;