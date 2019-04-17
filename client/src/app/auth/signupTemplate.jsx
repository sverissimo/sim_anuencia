import React from 'react';
import params from './signUpFields'

const signupTemplate = (props) => {
    let { handleChange, handleSubmit } = props

    return (
        <div>
            <h4 className="header2">{props.title}</h4>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    {params.map((el, i) => (
                        <div className="row" key={i}>
                            {
                                el.name === 'role' ?
                                    <label>
                                        {el.label}
                                        <br /><br />
                                        <span style={{ marginRight: '5%' }}>
                                            <input id='ip'
                                                type="radio"
                                                name={el.name}
                                                value='empreend'
                                                onChange={handleChange} 
                                            />
                                            <label htmlFor='ip'> Iniciativa Privada</label>
                                        </span>
                                        <span >
                                            <input id='pp'
                                                type="radio"
                                                name={el.name}
                                                value='prefeitura'
                                                onChange={handleChange}
                                            />
                                            <label htmlFor='pp'> Poder Público</label>
                                        </span>

                                    </label>

                                    :
                                    <div className="input-field col s12">
                                        <input name={el.name}
                                            type={el.name === "confirmPassword" ? "password" : el.name === 'email' || el.name === 'password' ? el.name : 'text'}
                                            className="validate"
                                            onChange={handleChange} />
                                        <label htmlFor={el.name}>{el.label}</label>
                                    </div>
                            }
                        </div>
                    ))}

                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn cyan waves-effect waves-light right" type="submit" name="action" style={{ backgroundColor: 'transparent' }} >
                                Cadastrar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div >
    );
};

export default signupTemplate;