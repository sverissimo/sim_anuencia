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
                            <div className="input-field col s12">
                                <i className={el.className}></i>
                                <input name={el.name}
                                    type={el.name === "confirmPassword" ? "password" : el.name === ('email' || 'password') ? el.name : 'text'}
                                    className="validate"
                                    onChange={handleChange} />
                                <label htmlFor={el.name}>{el.label}</label>
                            </div>
                        </div>
                    ))}


                    {/* <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-account-circle prefix"></i>
                            <input name="name" type="text" className="validate" onChange={handleChange} />
                            <label htmlFor="name">Nome</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-account-circle prefix"></i>
                            <input name="surName" type="text" className="validate" onChange={handleChange} />
                            <label htmlFor="surName">Sobrenome</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-communication-email prefix"></i>
                            <input name="email" type="email" className="validate" onChange={handleChange} />
                            <label htmlFor="email">E-mail</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-lock-outline prefix"></i>
                            <input name="password" type="password" className="validate" onChange={handleChange} />
                            <label htmlFor="password">Senha</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-lock-outline prefix"></i>
                            <input name="confirmPassword" type="password" className="validate" onChange={handleChange} />
                            <label htmlFor="confirmPassword">Confirme sua senha</label>
                        </div>
                    </div>
 */}
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn cyan waves-effect waves-light right" type="submit" name="action" style={{ backgroundColor: 'transparent' }} >
                                Entrar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default signupTemplate;