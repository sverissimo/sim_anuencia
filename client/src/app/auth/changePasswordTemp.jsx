import React from 'react';

let fields = [{ name: 'password', label: 'Nova senha' }, { name: 'confirmPassword', label: 'Confirme a nova senha' }]

const ChangePasswordTemp = (props) => {
    let { handleChange, handleSubmit, values } = props

    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    {fields.map((el, i) => (
                        <div className="col s12" key={i}>
                            <label htmlFor={el.name}>{el.label}</label>
                            <input name={el.name}
                                type="password"
                                value={values[el.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn cyan waves-effect waves-light right" type="submit" name="action" style={{ backgroundColor: 'transparent' }} >
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordTemp;